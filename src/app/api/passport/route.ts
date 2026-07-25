import { auth, clerkClient } from "@clerk/nextjs/server";
import { buildPassportRows, readinessScore } from "@/lib/passport";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  listChallengeResults,
  listLearnerCertificates,
} from "@/lib/firebase/learner-data";
import { buildRefresherQueue } from "@/lib/refreshers";
import { listSkillSignoffsForLearner } from "@/lib/skills/store";
import {
  asStringArray,
  type PrivateUserMetadata,
  type PublicUserMetadata,
} from "@/lib/user-metadata";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
    const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
    const enrolledSlugs = asStringArray(publicMetadata.courses);
    const completedSlugs = asStringArray(publicMetadata.completedCourses);
    const recipientName =
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      user.username ||
      "NyxPulse Learner";

    const certificates = isFirebaseAdminConfigured()
      ? await listLearnerCertificates(userId)
      : (privateMetadata.certificates ?? {});
    const challengeResults = isFirebaseAdminConfigured()
      ? await listChallengeResults(userId)
      : (privateMetadata.challengeResults ?? {});
    const skillSignoffs = await listSkillSignoffsForLearner(userId);

    const rows = buildPassportRows({
      enrolledSlugs,
      completedSlugs,
      certificates,
      challengeResults,
    });
    const refreshers = buildRefresherQueue({ certificates, challengeResults });

    return Response.json({
      recipientName,
      readiness: readinessScore(rows),
      rows,
      refreshers,
      skillSignoffs: skillSignoffs.map((s) => ({
        courseSlug: s.courseSlug,
        signedAt: s.signedAt,
        instructorName: s.instructorName,
        skillCount: s.skillIds.length,
      })),
    });
  } catch (err) {
    console.error("Failed to load passport:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
