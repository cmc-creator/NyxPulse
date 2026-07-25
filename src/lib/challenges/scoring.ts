import type {
  ChallengeAttemptResult,
  CourseChallenge,
  CourseChallengeResults,
} from "@/lib/challenges/types";
import { getChallengesForCourse } from "@/lib/challenges/catalog";

export function scoreMasteryQuiz(
  challenge: CourseChallenge,
  answers: Record<string, string>
): { score: number; passed: boolean; total: number; correct: number } {
  const questions = challenge.questions ?? [];
  let correct = 0;
  for (const q of questions) {
    const selected = answers[q.id];
    const choice = q.choices.find((c) => c.id === selected);
    if (choice?.correct) correct += 1;
  }
  const total = questions.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { score, passed: score >= challenge.passScore, total, correct };
}

export function scoreScenarioPath(
  challenge: CourseChallenge,
  choiceIds: string[]
): { score: number; passed: boolean; total: number; correct: number } {
  const nodes = challenge.scenario?.nodes ?? [];
  const byId = new Map(nodes.map((n) => [n.id, n]));
  let correct = 0;
  let total = 0;

  for (const choiceId of choiceIds) {
    for (const node of nodes) {
      const choice = node.choices.find((c) => c.id === choiceId);
      if (!choice) continue;
      total += 1;
      if (choice.correct) correct += 1;
      break;
    }
  }

  // Prefer walking from start for cleaner totals when path is well-formed.
  if (challenge.scenario && choiceIds.length > 0) {
    correct = 0;
    total = 0;
    let nodeId: string | null | undefined = challenge.scenario.startNodeId;
    let i = 0;
    while (nodeId && i < choiceIds.length) {
      const node = byId.get(nodeId);
      if (!node) break;
      const choice = node.choices.find((c) => c.id === choiceIds[i]);
      if (!choice) break;
      total += 1;
      if (choice.correct) correct += 1;
      nodeId = choice.nextNodeId ?? null;
      i += 1;
    }
  }

  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { score, passed: score >= challenge.passScore, total, correct };
}

export function hasPassedAllChallenges(
  courseSlug: string,
  results: CourseChallengeResults | null | undefined
): boolean {
  const challenges = getChallengesForCourse(courseSlug);
  if (challenges.length === 0) return true;
  if (!results) return false;
  return challenges.every((challenge) => results.results[challenge.id]?.passed);
}

export function mergeChallengeResult(
  existing: CourseChallengeResults | null | undefined,
  courseSlug: string,
  next: Omit<ChallengeAttemptResult, "attempts">
): CourseChallengeResults {
  const prev = existing?.results[next.challengeId];
  const attempts = (prev?.attempts ?? 0) + 1;
  return {
    courseSlug,
    updatedAt: new Date().toISOString(),
    results: {
      ...(existing?.results ?? {}),
      [next.challengeId]: {
        ...next,
        attempts,
      },
    },
  };
}
