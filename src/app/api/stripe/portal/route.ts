import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const customerId = user?.privateMetadata?.stripeCustomerId as string | undefined;

  if (!customerId) {
    return NextResponse.json(
      { error: "No billing account found. Purchase a course first." },
      { status: 404 }
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}/dashboard`,
  });

  return NextResponse.json({ url: portalSession.url });
}
