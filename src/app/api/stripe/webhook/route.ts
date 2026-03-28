import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import type Stripe from "stripe";

// Disable body parsing — we need the raw body to verify Stripe signature
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
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { courseSlug, userId } = (session.metadata ?? {}) as {
      courseSlug?: string;
      userId?: string;
    };

    if (!courseSlug || !userId) {
      console.error("Missing metadata in checkout session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(userId);
      const existingCourses =
        (user.publicMetadata?.courses as string[] | undefined) ?? [];

      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          courses: Array.from(new Set([...existingCourses, courseSlug])),
        },
      });
    } catch (err) {
      console.error("Failed to update Clerk metadata:", err);
      return NextResponse.json({ error: "Metadata update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
