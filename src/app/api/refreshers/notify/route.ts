import { clerkClient } from "@clerk/nextjs/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  listChallengeResults,
  listLearnerCertificates,
} from "@/lib/firebase/learner-data";
import { sendRefresherChallengeEmail } from "@/lib/email-automation";
import { buildRefresherQueue } from "@/lib/refreshers";
import type { PrivateUserMetadata } from "@/lib/user-metadata";

/**
 * Cron/manual endpoint to email learners with due/overdue refresher challenges.
 * Auth: header `x-refreshers-token` must match REFRESHERS_CRON_TOKEN.
 */
export async function POST(req: Request) {
  const expected = process.env.REFRESHERS_CRON_TOKEN?.trim();
  if (!expected) {
    return Response.json(
      { error: "REFRESHERS_CRON_TOKEN is not configured" },
      { status: 503 }
    );
  }

  const provided = req.headers.get("x-refreshers-token");
  if (!provided || provided !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let limit = 40;
  try {
    const body = await req.json().catch(() => ({}));
    if (typeof body?.limit === "number" && body.limit > 0) {
      limit = Math.min(100, Math.floor(body.limit));
    }
  } catch {
    // ignore
  }

  try {
    const clerk = await clerkClient();
    const users = await clerk.users.getUserList({ limit });
    const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";
    let sent = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const user of users.data) {
      const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
      const certificates = isFirebaseAdminConfigured()
        ? await listLearnerCertificates(user.id)
        : (privateMetadata.certificates ?? {});
      const challengeResults = isFirebaseAdminConfigured()
        ? await listChallengeResults(user.id)
        : (privateMetadata.challengeResults ?? {});

      const actionable = buildRefresherQueue({ certificates, challengeResults }).filter(
        (item) => item.status === "due-soon" || item.status === "overdue"
      );

      if (actionable.length === 0) {
        skipped += 1;
        continue;
      }

      const email = user.emailAddresses.find(
        (e) => e.id === user.primaryEmailAddressId
      )?.emailAddress;
      if (!email) {
        skipped += 1;
        continue;
      }

      const learnerName = user.firstName ?? user.username ?? "NyxPulse Learner";
      for (const item of actionable) {
        const result = await sendRefresherChallengeEmail(email, learnerName, {
          courseTitle: item.title,
          daysRemaining: item.daysRemaining,
          status: item.status === "overdue" ? "overdue" : "due-soon",
          courseUrl: `${appUrl}/dashboard/courses/${item.courseSlug}`,
        });
        if (result.success) sent += 1;
        else errors.push(`${email}:${item.courseSlug}:${result.error}`);
      }
    }

    return Response.json({ success: true, scanned: users.data.length, sent, skipped, errors });
  } catch (err) {
    console.error("Refresher notify failed:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
