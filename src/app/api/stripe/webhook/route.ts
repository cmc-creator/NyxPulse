import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  enrollUserInCourses,
  parseCourseSlugsFromMetadata,
  revokeUserCourses,
} from "@/lib/enrollment";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

/**
 * Resolve the userId + courseSlugs for a charge-level event. Checkout puts
 * metadata on both the session and (via payment_intent_data) the
 * PaymentIntent, so prefer metadata already on the event object and fall
 * back to retrieving the PaymentIntent.
 */
async function resolvePurchaseMetadata(
  metadata: Stripe.Metadata | null | undefined,
  paymentIntentId: string | null | undefined
): Promise<{ userId?: string; courseSlugs: string[] }> {
  let userId = metadata?.userId;
  let courseSlugs = parseCourseSlugsFromMetadata(metadata);

  if ((!userId || courseSlugs.length === 0) && paymentIntentId) {
    const intent = await getStripe().paymentIntents.retrieve(paymentIntentId);
    userId = userId || intent.metadata?.userId;
    if (courseSlugs.length === 0) {
      courseSlugs = parseCourseSlugsFromMetadata(intent.metadata);
    }
  }

  return { userId, courseSlugs };
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId ?? session.client_reference_id ?? undefined;
    const courseSlugs = parseCourseSlugsFromMetadata(session.metadata);
    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id;

    if (!userId || courseSlugs.length === 0) {
      console.error("Missing metadata in checkout session:", session.id);
      // Acknowledge to avoid infinite Stripe retries for malformed sessions.
      return NextResponse.json({ received: true, skipped: true });
    }

    try {
      await enrollUserInCourses({
        userId,
        courseSlugs,
        stripeCustomerId: customerId,
      });
    } catch (err) {
      console.error("Failed to process checkout.session.completed:", err);
      return NextResponse.json({ error: "Enrollment update failed" }, { status: 500 });
    }
  }

  // Full refund → revoke course access. `charge.refunded` also fires for
  // partial refunds; only act when the charge is fully refunded.
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    if (charge.refunded) {
      try {
        const { userId, courseSlugs } = await resolvePurchaseMetadata(
          charge.metadata,
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : charge.payment_intent?.id
        );
        if (userId && courseSlugs.length > 0) {
          await revokeUserCourses({ userId, courseSlugs, reason: "refund" });
        } else {
          console.error("charge.refunded without purchase metadata:", charge.id);
        }
      } catch (err) {
        console.error("Failed to process charge.refunded:", err);
        return NextResponse.json({ error: "Refund revocation failed" }, { status: 500 });
      }
    }
  }

  // Chargeback opened → revoke access immediately while the dispute runs.
  if (event.type === "charge.dispute.created") {
    const dispute = event.data.object as Stripe.Dispute;
    try {
      const { userId, courseSlugs } = await resolvePurchaseMetadata(
        dispute.metadata,
        typeof dispute.payment_intent === "string"
          ? dispute.payment_intent
          : dispute.payment_intent?.id
      );
      if (userId && courseSlugs.length > 0) {
        await revokeUserCourses({ userId, courseSlugs, reason: "dispute" });
      } else {
        console.error("charge.dispute.created without purchase metadata:", dispute.id);
      }
    } catch (err) {
      console.error("Failed to process charge.dispute.created:", err);
      return NextResponse.json({ error: "Dispute revocation failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
