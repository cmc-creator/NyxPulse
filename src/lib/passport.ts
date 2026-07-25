import { getChallengesForCourse } from "@/lib/challenges/catalog";
import type { CourseChallengeResults } from "@/lib/challenges/types";
import { courses } from "@/lib/courses";
import type { IssuedCertificate } from "@/lib/certificates";

export type PassportCourseRow = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  completed: boolean;
  certificateId?: string;
  issuedAt?: string;
  gatesRequired: number;
  gatesPassed: number;
  averageGateScore: number | null;
  skillsSessionRecommended: boolean;
  americanRedCrossPathway: boolean;
};

export function buildPassportRows(options: {
  enrolledSlugs: string[];
  completedSlugs: string[];
  certificates: Record<string, IssuedCertificate>;
  challengeResults: Record<string, CourseChallengeResults>;
}): PassportCourseRow[] {
  const { enrolledSlugs, completedSlugs, certificates, challengeResults } = options;

  return courses
    .filter((course) => enrolledSlugs.includes(course.slug))
    .map((course) => {
      const challenges = getChallengesForCourse(course.slug);
      const results = challengeResults[course.slug]?.results ?? {};
      const passed = challenges.filter((c) => results[c.id]?.passed);
      const scores = passed.map((c) => results[c.id]?.score).filter((n): n is number => typeof n === "number");
      const certificate = certificates[course.slug];

      return {
        slug: course.slug,
        title: course.title,
        shortTitle: course.shortTitle,
        icon: course.icon,
        completed: completedSlugs.includes(course.slug),
        certificateId: certificate?.id,
        issuedAt: certificate?.issuedAt,
        gatesRequired: challenges.length,
        gatesPassed: passed.length,
        averageGateScore:
          scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : null,
        skillsSessionRecommended: course.skillsSessionRequired,
        americanRedCrossPathway: Boolean(course.americanRedCrossPathway),
      };
    });
}

export function readinessScore(rows: PassportCourseRow[]): number {
  if (rows.length === 0) return 0;
  const weights = rows.map((row) => {
    let score = 0;
    if (row.completed) score += 50;
    if (row.gatesRequired > 0) {
      score += Math.round((row.gatesPassed / row.gatesRequired) * 40);
    } else if (row.completed) {
      score += 40;
    }
    if (row.averageGateScore !== null) {
      score += Math.round((row.averageGateScore / 100) * 10);
    }
    return Math.min(100, score);
  });
  return Math.round(weights.reduce((a, b) => a + b, 0) / weights.length);
}
