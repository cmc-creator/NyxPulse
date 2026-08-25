import type { SessionUser } from "@/lib/auth/server";

/** Comma-separated owner/admin emails (NYXPULSE_ADMIN_EMAILS). */
export function getAdminEmails(): string[] {
  const raw = process.env.NYXPULSE_ADMIN_EMAILS?.trim() ?? "";
  if (!raw) return [];
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Whether the signed-in user is a platform admin: either the Firebase
 * custom claim `admin: true`, or their email is on the
 * NYXPULSE_ADMIN_EMAILS allow-list (the simple, no-token setup path).
 */
export function isAdminSession(session: SessionUser | null): boolean {
  if (!session) return false;
  if (session.claims.admin === true) return true;
  const allow = getAdminEmails();
  if (allow.length === 0) return false;
  return Boolean(session.email && allow.includes(session.email.toLowerCase()));
}
