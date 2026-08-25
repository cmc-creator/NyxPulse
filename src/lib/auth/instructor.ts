import type { SessionUser } from "@/lib/auth/server";
import { isInstructorUser } from "@/lib/skills/auth";

/**
 * Whether the signed-in user is a recognized instructor (Firebase custom
 * claims, learner-profile flag, or the NYXPULSE_INSTRUCTOR_EMAILS allow-list).
 * Instructors get read-only access to all paid course content.
 */
export function isInstructorSession(session: SessionUser): boolean {
  return isInstructorUser({
    emailAddresses: session.email ? [session.email] : [],
    publicMetadata: { instructor: session.profile.instructor },
    claims: session.claims,
  });
}
