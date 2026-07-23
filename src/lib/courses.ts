import type { Course, LearningPath } from "@/lib/course-types";
import { additionalPrograms } from "@/lib/courses/additional-programs";
import { arcLifeSafetyCourses } from "@/lib/courses/arc-life-safety";
import { facilityPrograms } from "@/lib/courses/facility-programs";

export type {
  Course,
  CourseModule,
  LessonTopic,
  LearningPath,
  CertifyingBody,
} from "@/lib/course-types";

export const courses: Course[] = [
  ...arcLifeSafetyCourses,
  ...facilityPrograms,
  ...additionalPrograms,
];

export const learningPaths: LearningPath[] = [
  {
    id: "resuscitation",
    title: "Resuscitation Track",
    description:
      "American Red Cross CPR/AED, First Aid, and BLS pathways taught by a Red Cross certified instructor. Each certification is enrolled and earned separately.",
    icon: "❤️",
    badge: "cyan",
    courseList: ["cpr-aed", "bls", "first-aid"],
    totalHours: 12,
    competency: "Life Safety / Red Cross Programs",
  },
  {
    id: "rapid-response",
    title: "Rapid Response Track",
    description:
      "Companion life-safety skills for opioid overdose response and life-threatening bleeding control. Separate flat-fee trainings that pair well with CPR/First Aid.",
    icon: "🩹",
    badge: "cyan",
    courseList: ["opioid-overdose-response", "hemorrhage-control"],
    totalHours: 5,
    competency: "Emergency Response Skills",
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
      "OSHA fundamentals plus bloodborne pathogens awareness. Each course is a separate enrollment — not bundled with clinical or ICS programs.",
    icon: "🦺",
    badge: "green",
    courseList: ["osha-safety", "bloodborne-pathogens"],
    totalHours: 8,
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
