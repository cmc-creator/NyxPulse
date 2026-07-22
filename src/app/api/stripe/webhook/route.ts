import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { enrollUserInCourses, parseCourseSlugsFromMetadata } from "@/lib/enrollment";
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

  return NextResponse.json({ received: true });
}
