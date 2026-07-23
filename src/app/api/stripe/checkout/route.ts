import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { getCourseBySlug } from "@/lib/courses";
import type { PrivateUserMetadata } from "@/lib/user-metadata";

function slugToEnvKey(slug: string) {
  return slug.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
}

async function ensureStripeCustomer(userId: string) {
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
  const existingCustomerId = privateMetadata.stripeCustomerId;

  if (existingCustomerId) {
    return existingCustomerId;
  }

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email: primaryEmail,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined,
    metadata: { userId },
  });

  await clerk.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...privateMetadata,
      stripeCustomerId: customer.id,
    },
  });

  return customer.id;
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  if (courseSlug && pathId) {
    return NextResponse.json(
      { error: "Provide either courseSlug or pathId, not both" },
      { status: 400 }
    );
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
    const customerId = await ensureStripeCustomer(userId);

    const session = await stripe.checkout.sessions.create({
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

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Failed to create checkout session:", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
