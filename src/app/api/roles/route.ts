import { getSessionUser } from "@/lib/auth/server";
import { updateUserProfile } from "@/lib/auth/profile";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { listChallengeResults } from "@/lib/firebase/learner-data";
import { analyzeRoleGap } from "@/lib/roles/gap";
import { roleMatrices, type WorkforceRoleId } from "@/lib/roles/matrices";
import { listSkillSignoffsForLearner } from "@/lib/skills/store";
import { asStringArray } from "@/lib/user-metadata";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, profile } = session;
  const roleId = new URL(req.url).searchParams.get("roleId");

  try {
    const enrolledSlugs = asStringArray(profile.courses);
    const completedSlugs = asStringArray(profile.completedCourses);
    const selected =
      roleId || profile.workforceRoleId || roleMatrices[0]?.id || "ed-nurse";

    const challengeResults = isFirebaseAdminConfigured()
      ? await listChallengeResults(userId)
      : (profile.challengeResults ?? {});
    const skillSignoffs = await listSkillSignoffsForLearner(userId);

    const analysis = analyzeRoleGap({
      roleId: selected,
      enrolledSlugs,
      completedSlugs,
      challengeResults,
      skillSignoffs,
    });

    return Response.json({
      roles: roleMatrices,
      selectedRoleId: selected,
      analysis,
    });
  } catch (err) {
    console.error("Failed to load role matrix:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let roleId: string;
  try {
    const body = await req.json();
    roleId = body?.roleId;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!roleMatrices.some((r) => r.id === roleId)) {
    return Response.json({ error: "Unknown role" }, { status: 400 });
  }

  try {
    await updateUserProfile(session.userId, {
      workforceRoleId: roleId as WorkforceRoleId,
    });
    return Response.json({ success: true, roleId });
  } catch (err) {
    console.error("Failed to save role preference:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
