import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { listChallengeResults, listLearnerCertificates } from "@/lib/firebase/learner-data";
import { listLearnerProfiles } from "@/lib/auth/profile";
import { sendRefresherChallengeEmail } from "@/lib/email-automation";
import { buildRefresherQueue } from "@/lib/refreshers";

/** Cron/manual endpoint. The caller must provide x-refreshers-token. */
export async function POST(request: Request) {
  const expected = process.env.REFRESHERS_CRON_TOKEN?.trim();
  if (!expected) return Response.json({ error: "REFRESHERS_CRON_TOKEN is not configured" }, { status: 503 });
  if (request.headers.get("x-refreshers-token") !== expected) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const limit = typeof body?.limit === "number" ? Math.min(100, Math.max(1, Math.floor(body.limit))) : 40;
  const users = await listLearnerProfiles(limit);
  const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";
  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const user of users) {
    if (!user.email) { skipped += 1; continue; }
    const certificates = isFirebaseAdminConfigured() ? await listLearnerCertificates(user.userId) : user.certificates ?? {};
    const challengeResults = isFirebaseAdminConfigured() ? await listChallengeResults(user.userId) : user.challengeResults ?? {};
    const actionable = buildRefresherQueue({ certificates, challengeResults }).filter((item) => item.status === "due-soon" || item.status === "overdue");
    if (!actionable.length) { skipped += 1; continue; }

    for (const item of actionable) {
      const result = await sendRefresherChallengeEmail(user.email, user.displayName, {
        courseTitle: item.title,
        daysRemaining: item.daysRemaining,
        status: item.status === "overdue" ? "overdue" : "due-soon",
        courseUrl: `${appUrl}/dashboard/courses/${item.courseSlug}`,
      });
      if (result.success) sent += 1;
      else errors.push(`${user.userId}:${item.courseSlug}:${result.error}`);
    }
  }

  return Response.json({ success: true, scanned: users.length, sent, skipped, errors });
}
