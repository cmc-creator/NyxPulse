import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCourseBySlug } from "@/lib/courses";
import { isCourseProgressComplete } from "@/lib/course-progress";
import { sendCourseCompletionEmail } from "@/lib/email-automation";
import { asStringArray, type PrivateUserMetadata, type PublicUserMetadata } from "@/lib/user-metadata";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let courseSlug: string;
  try {
    const body = await req.json();
    courseSlug = body?.courseSlug;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!courseSlug || typeof courseSlug !== "string") {
    return Response.json({ error: "Missing courseSlug" }, { status: 400 });
  }

  const course = getCourseBySlug(courseSlug);
  if (!course) {
    return Response.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
    const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
    const enrolledSlugs = asStringArray(publicMetadata.courses);

    if (!enrolledSlugs.includes(courseSlug)) {
      return Response.json({ error: "Not enrolled in this course" }, { status: 403 });
    }

    const progressTopics = asStringArray(privateMetadata.courseProgress?.[courseSlug]);
    if (!isCourseProgressComplete(course, progressTopics)) {
      return Response.json(
        { error: "Complete all course topics before claiming a certificate." },
        { status: 400 }
      );
    }

    const completedSlugs = asStringArray(publicMetadata.completedCourses);

    if (!completedSlugs.includes(courseSlug)) {
      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: {
          ...publicMetadata,
          completedCourses: [...completedSlugs, courseSlug],
        },
      });

      const primaryEmail = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress;

      if (primaryEmail) {
        const firstName = user.firstName ?? user.username ?? "NyxPulse Learner";
        const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";
        const certificateUrl = `${appUrl}/dashboard/certificates?course=${encodeURIComponent(courseSlug)}`;

        const emailResult = await sendCourseCompletionEmail(
          primaryEmail,
          firstName,
          course.title,
          certificateUrl
        );

        if (!emailResult.success) {
          console.error("Failed to send completion email:", emailResult.error);
        }
      }
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Failed to mark course complete:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
