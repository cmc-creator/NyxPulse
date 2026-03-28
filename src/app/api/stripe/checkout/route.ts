import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { getCourseBySlug } from "@/lib/courses";

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

  const appUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const userEmail = (sessionClaims?.email as string) ?? undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: userEmail,
    line_items: [
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
