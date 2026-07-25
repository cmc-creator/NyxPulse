import type { CourseProgressMap } from "@/lib/course-progress";
import type { IssuedCertificate } from "@/lib/certificates";
import type { CourseChallengeResults } from "@/lib/challenges/types";

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

export interface PrivateUserMetadata {
  stripeCustomerId?: string;
  courseProgress?: CourseProgressMap;
  /** NyxPulse-issued certificates keyed by course slug */
  certificates?: Record<string, IssuedCertificate>;
  /** Mastery/scenario gate results keyed by course slug */
  challengeResults?: Record<string, CourseChallengeResults>;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}
