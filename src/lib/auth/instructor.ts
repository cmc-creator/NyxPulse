import type { SessionUser } from "@/lib/auth/server";
import { isAdminSession } from "@/lib/auth/admin";
import { isInstructorUser } from "@/lib/skills/auth";

/**
 * Whether the signed-in user is a recognized instructor (Firebase custom
 * claims, learner-profile flag, or the NYXPULSE_INSTRUCTOR_EMAILS allow-list).
 * Platform admins count as instructors, matching the existing claims
 * behavior. Instructors get read-only access to all paid course content.
 */
export function isInstructorSession(session: SessionUser): boolean {
  return (
    isAdminSession(session) ||
    isInstructorUser({
      emailAddresses: session.email ? [session.email] : [],
      publicMetadata: { instructor: session.profile.instructor },
      claims: session.claims,
    })
  );
}
