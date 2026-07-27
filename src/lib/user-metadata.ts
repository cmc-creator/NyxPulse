import type { CourseProgressMap } from "@/lib/course-progress";
import type { IssuedCertificate } from "@/lib/certificates";
import type { CourseChallengeResults } from "@/lib/challenges/types";
import type { OrgMember } from "@/lib/auth/profile";

/** @deprecated Use UserProfile from @/lib/auth/profile — kept for transitional imports. */
export interface PublicUserMetadata {
  courses?: string[];
  completedCourses?: string[];
  plan?: string;
  orgName?: string;
  orgRole?: "admin" | "member";
  /** Selected workforce role for role-readiness matrices */
  workforceRoleId?: string;
  /** Instructor portal access when true */
  instructor?: boolean;
  orgMembers?: {
    email: string;
    name: string;
    courses: string[];
    completedCourses: string[];
    workforceRoleId?: string;
    invitedAt?: string;
    status?: "invited" | "active";
  }[];
}

/** @deprecated Use UserProfile from @/lib/auth/profile */
export interface PrivateUserMetadata {
  stripeCustomerId?: string;
  courseProgress?: CourseProgressMap;
  certificates?: Record<string, IssuedCertificate>;
  challengeResults?: Record<string, CourseChallengeResults>;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}
