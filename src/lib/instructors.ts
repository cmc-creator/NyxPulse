import type { CourseInstructor } from "@/lib/course-types";

/** Lead instructor for American Red Cross programs on NyxPulse. */
export const jeremyInstructor: CourseInstructor = {
  name: "Jeremy",
  title: "Lead Emergency Training Instructor",
  credentials: [
    "American Red Cross certified instructor",
    "First Aid / CPR / AED program area",
    "Instructor-led and blended skills sessions",
  ],
};

export const instructorRoster: CourseInstructor[] = [jeremyInstructor];
