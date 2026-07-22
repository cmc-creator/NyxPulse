import type { Course, LearningPath } from "@/lib/course-types";
import { arcLifeSafetyCourses } from "@/lib/courses/arc-life-safety";
import { facilityPrograms } from "@/lib/courses/facility-programs";

export type {
  Course,
  CourseModule,
  LessonTopic,
  LearningPath,
  CertifyingBody,
} from "@/lib/course-types";

export const courses: Course[] = [...arcLifeSafetyCourses, ...facilityPrograms];

export const learningPaths: LearningPath[] = [
  {
    id: "resuscitation",
    title: "Resuscitation Track",
    description:
      "American Red Cross CPR/AED and BLS pathways taught by a Red Cross certified instructor. Each certification is earned separately after skills verification.",
    icon: "❤️",
    badge: "cyan",
    courseList: ["cpr-aed", "bls", "first-aid"],
    totalHours: 12,
    competency: "Life Safety / Red Cross Programs",
  },
  {
    id: "behavioral-crisis",
    title: "Behavioral Crisis Track",
    description:
      "Focused de-escalation and crisis intervention training for teams that manage agitated patients, visitors, or workplace conflict.",
    icon: "🧠",
    badge: "violet",
    courseList: ["de-escalation"],
    totalHours: 8,
    competency: "Behavioral Safety",
  },
  {
    id: "emergency-command",
    title: "Emergency Command Track",
    description:
      "Facility preparedness and incident command. Emergency Management and ICS/HICS are separate programs — take one or both based on your role.",
    icon: "🎯",
    badge: "amber",
    courseList: ["emergency-management-healthcare", "ics-hics"],
    totalHours: 24,
    competency: "Emergency Preparedness & Command",
  },
  {
    id: "workplace-safety",
    title: "Workplace Safety Track",
    description:
      "OSHA fundamentals for healthcare and general industry. A standalone compliance training — not bundled with clinical or ICS programs.",
    icon: "🦺",
    badge: "green",
    courseList: ["osha-safety"],
    totalHours: 6,
    competency: "Workplace Safety Compliance",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.featured);
}

export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}

export function getAllLearningPaths(): LearningPath[] {
  return learningPaths;
}

export function isAmericanRedCrossCourse(course: Course): boolean {
  return Boolean(course.americanRedCrossPathway);
}
