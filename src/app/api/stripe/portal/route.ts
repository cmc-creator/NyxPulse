import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const customerId = session.profile.stripeCustomerId;

    if (!customerId) {
      return NextResponse.json(
        { error: "No billing account found. Purchase a course first." },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
    const portalSession = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/dashboard/billing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("Failed to create billing portal session:", err);
    const message = err instanceof Error ? err.message : "Portal unavailable";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
