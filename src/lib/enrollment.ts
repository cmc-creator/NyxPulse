import { getCourseBySlug } from "@/lib/courses";
import { sendEnrollmentConfirmationEmail } from "@/lib/email-automation";
import { getUserProfile, updateUserProfile } from "@/lib/auth/profile";
import { getAdminAuth } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";

export function parseCourseSlugsFromMetadata(
  metadata: Record<string, string> | null | undefined
): string[] {
  if (!metadata) return [];

  if (metadata.courseSlugs) {
    return metadata.courseSlugs
      .split(",")
      .map((slug) => slug.trim())
      .filter(Boolean);
  }

  if (metadata.courseSlug) {
    return [metadata.courseSlug];
  }

  return [];
}

export async function enrollUserInCourses(options: {
  userId: string;
  courseSlugs: string[];
  stripeCustomerId?: string | null;
  sendEmail?: boolean;
}) {
  const { userId, courseSlugs, stripeCustomerId, sendEmail = true } = options;

  if (!userId || courseSlugs.length === 0) {
    throw new Error("userId and courseSlugs are required for enrollment");
  }
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin is required for enrollment");
  }

  const profile = await getUserProfile(userId);
  const existingCourses = profile?.courses ?? [];
  const nextCourses = Array.from(new Set([...existingCourses, ...courseSlugs]));
  const newlyEnrolled = courseSlugs.filter((slug) => !existingCourses.includes(slug));

  await updateUserProfile(userId, {
    courses: nextCourses,
    ...(stripeCustomerId ? { stripeCustomerId } : {}),
  });

  if (sendEmail && newlyEnrolled.length > 0) {
    const authUser = await (await getAdminAuth()).getUser(userId);
    const email = authUser.email ?? profile?.email;
    if (email) {
      const firstName =
        profile?.firstName ||
        authUser.displayName?.split(" ")[0] ||
        email.split("@")[0] ||
        "NyxPulse Learner";
      const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";
      const titles = newlyEnrolled.map((slug) => getCourseBySlug(slug)?.title ?? slug);
      const emailResult = await sendEnrollmentConfirmationEmail(
        email,
        firstName,
        titles,
        `${appUrl}/dashboard`
      );
      if (!emailResult.success) {
        console.error("Failed to send enrollment confirmation email:", emailResult.error);
      }
    }
  }

  return {
    userId,
    courseSlugs: nextCourses,
    newlyEnrolled,
    alreadyEnrolled: newlyEnrolled.length === 0,
  };
}
