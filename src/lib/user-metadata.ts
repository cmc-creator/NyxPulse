import type { CourseProgressMap } from "@/lib/course-progress";

export interface PublicUserMetadata {
  courses?: string[];
  completedCourses?: string[];
  plan?: string;
  orgName?: string;
  orgRole?: "admin" | "member";
  orgMembers?: {
    email: string;
    name: string;
    courses: string[];
    completedCourses: string[];
  }[];
}

export interface PrivateUserMetadata {
  stripeCustomerId?: string;
  courseProgress?: CourseProgressMap;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}
