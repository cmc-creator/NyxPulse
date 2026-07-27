import { getSessionUser } from "@/lib/auth/server";
import { updateUserProfile } from "@/lib/auth/profile";
import { getCourseBySlug } from "@/lib/courses";
import { createCertificateId } from "@/lib/certificates";
import { hasPassedAllChallenges } from "@/lib/challenges/scoring";
import { isCourseProgressComplete } from "@/lib/course-progress";
import { sendCourseCompletionEmail } from "@/lib/email-automation";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  getChallengeResults,
  getLearnerCertificate,
  getLearnerProgressTopics,
  saveLearnerCertificate,
} from "@/lib/firebase/learner-data";
import { asStringArray } from "@/lib/user-metadata";

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, email, firstName, lastName, displayName, profile } = session;

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

  if (!course.issuesNyxpulseCertificate) {
    return Response.json(
      { error: "This course does not issue a NyxPulse certificate." },
      { status: 400 }
    );
  }

  try {
    const enrolledSlugs = asStringArray(profile.courses);

    if (!enrolledSlugs.includes(courseSlug)) {
      return Response.json({ error: "Not enrolled in this course" }, { status: 403 });
    }

    const useFirebase = isFirebaseAdminConfigured();
    const progressTopics = useFirebase
      ? ((await getLearnerProgressTopics(userId, courseSlug)) ?? [])
      : asStringArray(profile.courseProgress?.[courseSlug]);

    if (!isCourseProgressComplete(course, progressTopics)) {
      return Response.json(
        { error: "Complete all course topics before claiming a certificate." },
        { status: 400 }
      );
    }

    const challengeResults = useFirebase
      ? await getChallengeResults(userId, courseSlug)
      : (profile.challengeResults?.[courseSlug] ?? null);

    if (!hasPassedAllChallenges(courseSlug, challengeResults)) {
      return Response.json(
        {
          error:
            "Clear all NyxPulse Advantage Gates (scenarios + mastery quiz) before claiming your certificate.",
        },
        { status: 400 }
      );
    }

    const completedSlugs = asStringArray(profile.completedCourses);
    const existingCert = useFirebase
      ? await getLearnerCertificate(userId, courseSlug)
      : (profile.certificates?.[courseSlug] ?? null);

    const recipientName =
      [firstName, lastName].filter(Boolean).join(" ") || displayName || "NyxPulse Learner";

    const certificate =
      existingCert ??
      ({
        id: createCertificateId(courseSlug),
        courseSlug,
        issuedAt: new Date().toISOString(),
        recipientName,
      } as const);

    if (!completedSlugs.includes(courseSlug) || !existingCert) {
      const nextCompleted = Array.from(new Set([...completedSlugs, courseSlug]));

      if (useFirebase) {
        await saveLearnerCertificate(userId, certificate);
        await updateUserProfile(userId, { completedCourses: nextCompleted });
      } else {
        await updateUserProfile(userId, {
          completedCourses: nextCompleted,
          certificates: {
            ...(profile.certificates ?? {}),
            [courseSlug]: certificate,
          },
        });
      }

      if (!existingCert && email) {
        const name = firstName ?? displayName ?? "NyxPulse Learner";
        const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";
        const certificateUrl = `${appUrl}/dashboard/certificates?course=${encodeURIComponent(courseSlug)}`;

        const emailResult = await sendCourseCompletionEmail(
          email,
          name,
          course.title,
          certificateUrl
        );

        if (!emailResult.success) {
          console.error("Failed to send completion email:", emailResult.error);
        }
      }
    }

    return Response.json({
      success: true,
      certificate,
      americanRedCrossPathway: Boolean(course.americanRedCrossPathway),
    });
  } catch (err) {
    console.error("Failed to mark course complete:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
