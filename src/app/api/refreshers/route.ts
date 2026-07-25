import { auth, clerkClient } from "@clerk/nextjs/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  listChallengeResults,
  listLearnerCertificates,
} from "@/lib/firebase/learner-data";
import { buildRefresherQueue } from "@/lib/refreshers";
import type { PrivateUserMetadata } from "@/lib/user-metadata";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;

    const certificates = isFirebaseAdminConfigured()
      ? await listLearnerCertificates(userId)
      : (privateMetadata.certificates ?? {});
    const challengeResults = isFirebaseAdminConfigured()
      ? await listChallengeResults(userId)
      : (privateMetadata.challengeResults ?? {});

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
