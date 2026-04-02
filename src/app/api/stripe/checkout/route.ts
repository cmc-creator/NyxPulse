import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { getCourseBySlug } from "@/lib/courses";

function slugToEnvKey(slug: string) {
  return slug.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
}

export async function POST(req: Request) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { courseSlug } = body as { courseSlug: string };

  if (!courseSlug) {
    return NextResponse.json({ error: "courseSlug is required" }, { status: 400 });
  }

  const course = getCourseBySlug(courseSlug);

  if (!course || course.price === null) {
    return NextResponse.json({ error: "Course not found or free" }, { status: 400 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
  }

  const appUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  if (stripeKey.startsWith("sk_live_") && !appUrl.startsWith("https://")) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_URL must be an https URL when Stripe live mode is enabled" },
      { status: 500 }
    );
  }

  const userEmail = (sessionClaims?.email as string) ?? undefined;
  const envKey = slugToEnvKey(courseSlug);
  const coursePriceId = process.env[`STRIPE_PRICE_ID_${envKey}`];
  const requirePriceIds = process.env.STRIPE_REQUIRE_PRICE_IDS === "true";

  if (requirePriceIds && !coursePriceId) {
    return NextResponse.json(
      { error: `Missing price configuration for ${courseSlug}. Set STRIPE_PRICE_ID_${envKey}.` },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: userEmail,
    line_items: coursePriceId
      ? [
          {
            price: coursePriceId,
            quantity: 1,
          },
        ]
      : [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: course.title,
                description: course.tagline,
              },
              unit_amount: course.price * 100,
            },
            quantity: 1,
          },
        ],
    metadata: {
      courseSlug,
      userId,
    },
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/courses/${courseSlug}`,
  });

  return NextResponse.json({ url: session.url });
}
