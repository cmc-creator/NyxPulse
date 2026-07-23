export type CourseBadge = "violet" | "cyan" | "amber" | "green";
export type CourseFormat = "Live" | "Virtual" | "Hybrid";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
export type CertifyingBody = "american-red-cross" | "nyxpulse";

export interface LessonTopic {
  title: string;
  /** Original NyxPulse study notes to prepare for instructor-led skills practice. */
  summary?: string;
}

export interface CourseModule {
  title: string;
  objective?: string;
  topics: LessonTopic[];
}

export interface CourseInstructor {
  name: string;
  title: string;
  credentials: string[];
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  badge: CourseBadge;
  icon: string;
  tagline: string;
  description: string;
  duration: string;
  format: CourseFormat[];
  level: CourseLevel;
  /** Short label shown in UI cards */
  certifies: string;
  price: number | null;
  featured: boolean;
  modules: CourseModule[];
  outcomes: string[];
  whoFor: string[];
  certifyingBody: CertifyingBody;
  /** NyxPulse always issues its own completion certificate when enabled. */
  issuesNyxpulseCertificate: boolean;
  /**
   * When true, learners can also pursue an official American Red Cross
   * digital certificate via instructor skills session + Learning Center reporting.
   * This is separate from the NyxPulse certificate.
   */
  americanRedCrossPathway?: boolean;
  skillsSessionRequired: boolean;
  certificationValidity?: string;
  instructor?: CourseInstructor;
  complianceNotes?: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: CourseBadge;
  courseList: string[];
  totalHours: number;
  competency: string;
}
