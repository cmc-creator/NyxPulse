import { getSessionUser } from "@/lib/auth/server";
import { buildPassportRows, readinessScore } from "@/lib/passport";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import {
  listChallengeResults,
  listLearnerCertificates,
} from "@/lib/firebase/learner-data";
import { buildRefresherQueue } from "@/lib/refreshers";
import { listSkillSignoffsForLearner } from "@/lib/skills/store";
import { asStringArray } from "@/lib/user-metadata";

export async function GET() {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, firstName, lastName, displayName, profile } = session;

  try {
    const enrolledSlugs = asStringArray(profile.courses);
    const completedSlugs = asStringArray(profile.completedCourses);
    const recipientName =
      [firstName, lastName].filter(Boolean).join(" ") || displayName || "NyxPulse Learner";

    const certificates = isFirebaseAdminConfigured()
      ? await listLearnerCertificates(userId)
      : (profile.certificates ?? {});
    const challengeResults = isFirebaseAdminConfigured()
      ? await listChallengeResults(userId)
      : (profile.challengeResults ?? {});
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
