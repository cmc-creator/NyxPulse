import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/server";
import { updateUserProfile } from "@/lib/auth/profile";
import { getStripe } from "@/lib/stripe";
import { getCourseBySlug } from "@/lib/courses";

function slugToEnvKey(slug: string) {
  return slug.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
}

async function ensureStripeCustomer(session: {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  profile: { stripeCustomerId?: string };
}) {
  const existingCustomerId = session.profile.stripeCustomerId;

  if (existingCustomerId) {
    return existingCustomerId;
  }

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email: session.email || undefined,
    name:
      [session.firstName, session.lastName].filter(Boolean).join(" ") ||
      session.displayName ||
      undefined,
    metadata: { userId: session.userId },
  });

  await updateUserProfile(session.userId, {
    stripeCustomerId: customer.id,
  });

  return customer.id;
}

export async function POST(req: Request) {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = session;

  let courseSlug: string | undefined;
  try {
    const body = await req.json();
    courseSlug = typeof body?.courseSlug === "string" ? body.courseSlug : undefined;

    if (body?.pathId) {
      return NextResponse.json(
        {
          error:
            "Learning tracks are guidance only. Enroll in each training separately.",
        },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

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

  const priceEnvKey = `STRIPE_PRICE_ID_${slugToEnvKey(courseSlug)}`;
  const coursePriceId = process.env[priceEnvKey];
  const requirePriceIds = process.env.STRIPE_REQUIRE_PRICE_IDS === "true";

  if (requirePriceIds && !coursePriceId) {
    return NextResponse.json(
      { error: `Missing price configuration. Set ${priceEnvKey}.` },
      { status: 500 }
    );
  }

  try {
    const stripe = getStripe();
    const customerId = await ensureStripeCustomer(session);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      customer_update: { address: "auto", name: "auto" },
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
        userId,
        courseSlug,
        courseSlugs: courseSlug,
      },
      client_reference_id: userId,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/courses/${courseSlug}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Failed to create checkout session:", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
