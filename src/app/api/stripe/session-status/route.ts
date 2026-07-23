import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { enrollUserInCourses, parseCourseSlugsFromMetadata } from "@/lib/enrollment";
import { clerkClient } from "@clerk/nextjs/server";
import { asStringArray, type PublicUserMetadata } from "@/lib/user-metadata";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const sessionUserId = session.metadata?.userId ?? session.client_reference_id;

    if (!sessionUserId || sessionUserId !== userId) {
      return NextResponse.json({ error: "Session does not belong to this user" }, { status: 403 });
    }

    const paid =
      session.payment_status === "paid" ||
      session.status === "complete";

    const courseSlugs = parseCourseSlugsFromMetadata(session.metadata);
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
    let enrolledCourses = asStringArray(publicMetadata.courses);
    let enrolled =
      courseSlugs.length > 0 &&
      courseSlugs.every((slug) => enrolledCourses.includes(slug));

    if (paid && !enrolled && courseSlugs.length > 0) {
      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;

      const result = await enrollUserInCourses({
        userId,
        courseSlugs,
        stripeCustomerId: customerId,
      });
      enrolledCourses = result.courseSlugs;
      enrolled = true;
    }

    return NextResponse.json({
      status: session.status,
      paymentStatus: session.payment_status,
      paid,
      enrolled,
      courseSlugs: enrolled ? courseSlugs : enrolledCourses.filter((slug) => courseSlugs.includes(slug)),
      pathId: session.metadata?.pathId ?? null,
    });
  } catch (err) {
    console.error("Failed to load checkout session status:", err);
    const message = err instanceof Error ? err.message : "Unable to verify session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
