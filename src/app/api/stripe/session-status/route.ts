import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/server";
import { getStripe } from "@/lib/stripe";
import { enrollUserInCourses, parseCourseSlugsFromMetadata } from "@/lib/enrollment";
import { asStringArray } from "@/lib/user-metadata";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, profile } = session;
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    const sessionUserId =
      checkoutSession.metadata?.userId ?? checkoutSession.client_reference_id;

    if (!sessionUserId || sessionUserId !== userId) {
      return NextResponse.json({ error: "Session does not belong to this user" }, { status: 403 });
    }

    const paid =
      checkoutSession.payment_status === "paid" ||
      checkoutSession.status === "complete";

    const courseSlugs = parseCourseSlugsFromMetadata(checkoutSession.metadata);
    let enrolledCourses = asStringArray(profile.courses);
    let enrolled =
      courseSlugs.length > 0 &&
      courseSlugs.every((slug) => enrolledCourses.includes(slug));

    if (paid && !enrolled && courseSlugs.length > 0) {
      const customerId =
        typeof checkoutSession.customer === "string"
          ? checkoutSession.customer
          : checkoutSession.customer?.id;

      const result = await enrollUserInCourses({
        userId,
        courseSlugs,
        stripeCustomerId: customerId,
      });
      enrolledCourses = result.courseSlugs;
      enrolled = true;
    }

    return NextResponse.json({
      status: checkoutSession.status,
      paymentStatus: checkoutSession.payment_status,
      paid,
      enrolled,
      courseSlugs: enrolled
        ? courseSlugs
        : enrolledCourses.filter((slug) => courseSlugs.includes(slug)),
      pathId: checkoutSession.metadata?.pathId ?? null,
    });
  } catch (err) {
    console.error("Failed to load checkout session status:", err);
    const message = err instanceof Error ? err.message : "Unable to verify session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
