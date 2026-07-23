import type { CourseInstructor } from "@/lib/course-types";

export interface InstructorProfile extends CourseInstructor {
  slug: string;
  bio: string;
  specialties: string[];
  teachesThrough: string[];
}

/** Lead instructor for NyxPulse life-safety programs. */
export const jeremyInstructor: InstructorProfile = {
  slug: "jeremy",
  name: "Jeremy",
  title: "Lead Emergency Training Instructor",
  credentials: [
    "American Red Cross certified instructor",
    "First Aid / CPR / AED program area",
    "Basic Life Support (BLS) instruction",
    "Instructor-led and blended skills sessions",
  ],
  bio: "Jeremy leads NyxPulse life-safety training and also teaches through other authorized organizations when needed. Learners can earn a NyxPulse Certificate of Completion in this platform, and — when a class is taught under an American Red Cross Training Provider agreement — pursue an official Red Cross digital certificate after skills verification.",
  specialties: [
    "Adult & Pediatric CPR/AED",
    "First Aid",
    "Basic Life Support (BLS)",
    "Skills-session coaching",
  ],
  teachesThrough: [
    "NyxPulse / NyxCollective LLC",
    "Other authorized training partners as scheduled",
    "American Red Cross pathway classes (when affiliated/reporting through an approved Training Provider)",
  ],
};

export const instructorRoster: InstructorProfile[] = [jeremyInstructor];

export function getInstructorBySlug(slug: string) {
  return instructorRoster.find((instructor) => instructor.slug === slug);
}
