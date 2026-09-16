import { isInstructorUser } from "@/lib/skills/auth";
import type { getSessionUser } from "@/lib/auth/server";

export function canManageAccounting(
  session: Awaited<ReturnType<typeof getSessionUser>> | null
): boolean {
  if (!session) return false;

  if ((session.profile.orgRole ?? "member") === "admin") return true;

  return isInstructorUser({
    emailAddresses: session.email ? [session.email] : [],
    publicMetadata: { instructor: session.profile.instructor },
    claims: session.claims,
  });
}
