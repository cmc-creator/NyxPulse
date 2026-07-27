import { getSessionUser, getSessionUserId } from "@/lib/auth/server";
import { updateUserProfile } from "@/lib/auth/profile";
import { getChallenge } from "@/lib/challenges/catalog";
import {
  mergeChallengeResult,
  scoreMasteryQuiz,
  scoreScenarioPath,
} from "@/lib/challenges/scoring";
import type { CourseChallengeResults } from "@/lib/challenges/types";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import {
  getChallengeResults,
  saveChallengeResults,
} from "@/lib/firebase/learner-data";
import { asStringArray } from "@/lib/user-metadata";

export async function GET(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const courseSlug = new URL(req.url).searchParams.get("courseSlug");
  if (!courseSlug) {
    return Response.json({ error: "Missing courseSlug" }, { status: 400 });
  }

  try {
    if (isFirebaseAdminConfigured()) {
      const results = await getChallengeResults(userId, courseSlug);
      return Response.json({ results: results ?? null });
    }

    const session = await getSessionUser();
    return Response.json({
      results: session?.profile.challengeResults?.[courseSlug] ?? null,
    });
  } catch (err) {
    console.error("Failed to load challenge results:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, profile } = session;

  let courseSlug: string;
  let challengeId: string;
  let answers: Record<string, string> | undefined;
  let choicePath: string[] | undefined;

  try {
    const body = await req.json();
    courseSlug = body?.courseSlug;
    challengeId = body?.challengeId;
    answers = body?.answers;
    choicePath = body?.choicePath;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!courseSlug || !challengeId) {
    return Response.json({ error: "Missing courseSlug or challengeId" }, { status: 400 });
  }

  const challenge = getChallenge(courseSlug, challengeId);
  if (!challenge) {
    return Response.json({ error: "Challenge not found" }, { status: 404 });
  }

  try {
    const enrolled = asStringArray(profile.courses);

    if (!enrolled.includes(courseSlug)) {
      return Response.json({ error: "Not enrolled in this course" }, { status: 403 });
    }

    const scored =
      challenge.kind === "mastery-quiz"
        ? scoreMasteryQuiz(challenge, answers ?? {})
        : scoreScenarioPath(challenge, choicePath ?? []);

    const useFirebase = isFirebaseAdminConfigured();
    const existing = useFirebase
      ? await getChallengeResults(userId, courseSlug)
      : (profile.challengeResults?.[courseSlug] ?? null);

    const merged = mergeChallengeResult(existing, courseSlug, {
      challengeId,
      score: scored.score,
      passed: scored.passed,
      completedAt: new Date().toISOString(),
    });

    if (useFirebase) {
      await saveChallengeResults(userId, merged);
    } else {
      const nextMap: Record<string, CourseChallengeResults> = {
        ...(profile.challengeResults ?? {}),
        [courseSlug]: merged,
      };
      await updateUserProfile(userId, { challengeResults: nextMap });
    }

    return Response.json({
      success: true,
      score: scored.score,
      passed: scored.passed,
      correct: scored.correct,
      total: scored.total,
      results: merged,
    });
  } catch (err) {
    console.error("Failed to score challenge:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
