import { getChallengesForCourse } from "@/lib/challenges/catalog";
import type { CourseChallengeResults } from "@/lib/challenges/types";
import { getCourseBySlug } from "@/lib/courses";
import { getRoleMatrix, type RoleMatrix, type WorkforceRoleId } from "@/lib/roles/matrices";
import { getSkillSheet } from "@/lib/skills/sheets";
import type { SkillSignoff } from "@/lib/skills/sheets";

export type CourseGapStatus = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tier: "required" | "recommended";
  enrolled: boolean;
  completed: boolean;
  gatesRequired: number;
  gatesPassed: number;
  gatesMet: boolean;
  skillsSheet: boolean;
  skillsSigned: boolean;
  ready: boolean;
};

export type RoleGapAnalysis = {
  role: RoleMatrix;
  requiredReady: number;
  requiredTotal: number;
  recommendedReady: number;
  recommendedTotal: number;
  readinessPercent: number;
  courses: CourseGapStatus[];
  missingRequired: string[];
};

export function analyzeRoleGap(options: {
  roleId: WorkforceRoleId | string;
  enrolledSlugs: string[];
  completedSlugs: string[];
  challengeResults: Record<string, CourseChallengeResults>;
  skillSignoffs: SkillSignoff[];
}): RoleGapAnalysis | null {
  const role = getRoleMatrix(options.roleId);
  if (!role) return null;

  const signedSlugs = new Set(options.skillSignoffs.map((s) => s.courseSlug));

  const build = (slug: string, tier: "required" | "recommended"): CourseGapStatus | null => {
    const course = getCourseBySlug(slug);
    if (!course) return null;
    const gates = getChallengesForCourse(slug);
    const results = options.challengeResults[slug]?.results ?? {};
    const gatesPassed = gates.filter((g) => results[g.id]?.passed).length;
    const gatesMet = !role.mustPassGates || gates.length === 0 || gatesPassed >= gates.length;
    const sheet = getSkillSheet(slug);
    const skillsSigned = sheet ? signedSlugs.has(slug) : true;
    const enrolled = options.enrolledSlugs.includes(slug);
    const completed = options.completedSlugs.includes(slug);
    const ready = enrolled && completed && gatesMet && (!sheet || skillsSigned || !role.skillsSessionRecommended);

    return {
      slug,
      title: course.title,
      shortTitle: course.shortTitle,
      icon: course.icon,
      tier,
      enrolled,
      completed,
      gatesRequired: gates.length,
      gatesPassed,
      gatesMet,
      skillsSheet: Boolean(sheet),
      skillsSigned,
      ready,
    };
  };

  const required = role.requiredCourseSlugs
    .map((slug) => build(slug, "required"))
    .filter((c): c is CourseGapStatus => Boolean(c));
  const recommended = role.recommendedCourseSlugs
    .map((slug) => build(slug, "recommended"))
    .filter((c): c is CourseGapStatus => Boolean(c));

  const requiredReady = required.filter((c) => c.ready).length;
  const recommendedReady = recommended.filter((c) => c.ready).length;
  const readinessPercent =
    required.length === 0
      ? 100
      : Math.round((requiredReady / required.length) * 100);

  return {
    role,
    requiredReady,
    requiredTotal: required.length,
    recommendedReady,
    recommendedTotal: recommended.length,
    readinessPercent,
    courses: [...required, ...recommended],
    missingRequired: required.filter((c) => !c.ready).map((c) => c.shortTitle),
  };
}
