import type { PublicUserMetadata } from "@/lib/user-metadata";

/** Comma-separated instructor emails allowed to sign off skill sheets. */
export function getInstructorEmails(): string[] {
  const raw = process.env.NYXPULSE_INSTRUCTOR_EMAILS?.trim() ?? "";
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function getInstructorPin(): string | null {
  const pin = process.env.NYXPULSE_INSTRUCTOR_PIN?.trim();
  return pin || null;
}

export function isInstructorUser(options: {
  emailAddresses: string[];
  publicMetadata?: PublicUserMetadata & { instructor?: boolean };
}): boolean {
  if (options.publicMetadata?.instructor === true) return true;
  const allow = getInstructorEmails();
  if (allow.length === 0) return false;
  return options.emailAddresses.some((email) => allow.includes(email.toLowerCase()));
}

export function pinAllowsSignoff(pin: string | undefined | null): boolean {
  const expected = getInstructorPin();
  if (!expected) return false;
  return Boolean(pin && pin === expected);
}
