import { getSessionUser } from "@/lib/auth/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  listChallengeResults,
  listLearnerCertificates,
} from "@/lib/firebase/learner-data";
import { buildRefresherQueue } from "@/lib/refreshers";

export async function GET() {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, profile } = session;

  try {
    const certificates = isFirebaseAdminConfigured()
      ? await listLearnerCertificates(userId)
      : (profile.certificates ?? {});
    const challengeResults = isFirebaseAdminConfigured()
      ? await listChallengeResults(userId)
      : (profile.challengeResults ?? {});

    const items = buildRefresherQueue({ certificates, challengeResults });
    const actionable = items.filter(
      (item) => item.status === "due-soon" || item.status === "overdue"
    );

    return Response.json({
      items,
      actionableCount: actionable.length,
      overdueCount: items.filter((i) => i.status === "overdue").length,
    });
  } catch (err) {
    console.error("Failed to load refreshers:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
