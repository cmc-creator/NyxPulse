import { clerkClient } from "@clerk/nextjs/server";
import { getCourseBySlug } from "@/lib/courses";
import { sendEnrollmentConfirmationEmail } from "@/lib/email-automation";
import { asStringArray, type PrivateUserMetadata, type PublicUserMetadata } from "@/lib/user-metadata";

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

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
  const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
  const existingCourses = asStringArray(publicMetadata.courses);
  const nextCourses = Array.from(new Set([...existingCourses, ...courseSlugs]));
  const newlyEnrolled = courseSlugs.filter((slug) => !existingCourses.includes(slug));

  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...publicMetadata,
      courses: nextCourses,
    },
    privateMetadata: {
      ...privateMetadata,
      ...(stripeCustomerId ? { stripeCustomerId } : {}),
    },
  });

  if (sendEmail && newlyEnrolled.length > 0) {
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (primaryEmail) {
      const firstName = user.firstName ?? user.username ?? "NyxPulse Learner";
      const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";
      const titles = newlyEnrolled.map((slug) => getCourseBySlug(slug)?.title ?? slug);
      const emailResult = await sendEnrollmentConfirmationEmail(
        primaryEmail,
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
