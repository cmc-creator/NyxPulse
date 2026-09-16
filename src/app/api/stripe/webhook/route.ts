import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { enrollUserInCourses, parseCourseSlugsFromMetadata } from "@/lib/enrollment";
import { getCourseBySlug } from "@/lib/courses";
import { getUserProfile } from "@/lib/auth/profile";
import { recordStripeInvoice } from "@/lib/accounting/store";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

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
      const profile = await getUserProfile(userId);
      await enrollUserInCourses({
        userId,
        courseSlugs,
        stripeCustomerId: customerId,
      });

      const lineItems = courseSlugs.map((slug) => {
        const course = getCourseBySlug(slug);
        return {
          description: course?.title ?? slug,
          quantity: 1,
          unitAmount: course?.price ?? 0,
          ...(slug ? { courseSlug: slug } : {}),
        };
      });

      const customerName =
        session.customer_details?.name ||
        profile?.displayName ||
        [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
        "NyxPulse Learner";
      const customerEmail = session.customer_details?.email || profile?.email || "";
      if (customerEmail) {
        await recordStripeInvoice({
          customerUserId: userId,
          customerName,
          customerEmail,
          orgName: profile?.orgName,
          courseSlugs,
          lineItems,
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
          paymentMethod: session.payment_method_types?.join(", ") ?? "card",
        });
      }
    } catch (err) {
      console.error("Failed to process checkout.session.completed:", err);
      return NextResponse.json({ error: "Enrollment update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
