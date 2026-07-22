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
  /**
   * Official wallet/digital cards for ARC programs are issued only through
   * the American Red Cross Learning Center after skills verification.
   */
  officialCertificateIssuer: "american-red-cross" | "nyxpulse";
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
