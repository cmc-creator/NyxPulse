import type { IssuedCertificate } from "@/lib/certificates";
import { getChallengesForCourse } from "@/lib/challenges/catalog";
import type { CourseChallengeResults } from "@/lib/challenges/types";
import { getCourseBySlug } from "@/lib/courses";

/** Default spaced refresher window after certificate issuance. */
export const REFRESHER_DAYS = 90;
export const REFRESHER_WARN_DAYS = 14;

export type RefresherItem = {
  courseSlug: string;
  title: string;
  shortTitle: string;
  icon: string;
  certificateId: string;
  issuedAt: string;
  dueAt: string;
  daysRemaining: number;
  status: "ok" | "due-soon" | "overdue" | "completed-recently";
  gatesRequired: number;
  latestGatePassAt: string | null;
};

function addDays(iso: string, days: number) {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function buildRefresherQueue(options: {
  certificates: Record<string, IssuedCertificate>;
  challengeResults: Record<string, CourseChallengeResults>;
  now?: Date;
}): RefresherItem[] {
  const now = options.now ?? new Date();
  const items: RefresherItem[] = [];

  for (const [slug, cert] of Object.entries(options.certificates)) {
    const course = getCourseBySlug(slug);
    if (!course) continue;
    const due = addDays(cert.issuedAt, REFRESHER_DAYS);
    const ms = due.getTime() - now.getTime();
    const daysRemaining = Math.ceil(ms / (1000 * 60 * 60 * 24));
    const gates = getChallengesForCourse(slug);
    const results = options.challengeResults[slug]?.results ?? {};
    const latestPass = Object.values(results)
      .filter((r) => r.passed)
      .map((r) => r.completedAt)
      .sort()
      .at(-1) ?? null;

    let status: RefresherItem["status"] = "ok";
    if (daysRemaining < 0) status = "overdue";
    else if (daysRemaining <= REFRESHER_WARN_DAYS) status = "due-soon";

    // If learner re-cleared gates after issue date near/after due window, mark completed-recently.
    if (latestPass) {
      const passDate = new Date(latestPass);
      if (passDate.getTime() >= addDays(cert.issuedAt, REFRESHER_DAYS - REFRESHER_WARN_DAYS).getTime()) {
        status = "completed-recently";
      }
    }

    items.push({
      courseSlug: slug,
      title: course.title,
      shortTitle: course.shortTitle,
      icon: course.icon,
      certificateId: cert.id,
      issuedAt: cert.issuedAt,
      dueAt: due.toISOString(),
      daysRemaining,
      status,
      gatesRequired: gates.length,
      latestGatePassAt: latestPass,
    });
  }

  return items.sort((a, b) => a.daysRemaining - b.daysRemaining);
}
