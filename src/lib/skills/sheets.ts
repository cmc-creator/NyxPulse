export type SkillItem = {
  id: string;
  label: string;
  evidence: string;
};

export type SkillSheet = {
  courseSlug: string;
  title: string;
  instructorOnly: boolean;
  skills: SkillItem[];
};

export const skillSheets: SkillSheet[] = [
  {
    courseSlug: "cpr-aed",
    title: "CPR/AED Skills Sheet",
    instructorOnly: true,
    skills: [
      { id: "scene-assess", label: "Scene safety + responsiveness/breathing check", evidence: "Demonstrated on adult manikin scenario" },
      { id: "adult-compressions", label: "Adult compressions (depth/rate/recoil)", evidence: "Observed high-quality set ≥1 minute" },
      { id: "adult-breaths", label: "Adult breaths with visible chest rise", evidence: "Barrier device used correctly" },
      { id: "aed-pads", label: "AED pad placement + clear/shock workflow", evidence: "Voice prompts followed; minimal interruption" },
      { id: "infant-child", label: "Child/infant technique differences", evidence: "Age-appropriate demonstration completed" },
      { id: "choking", label: "Conscious choking sequence", evidence: "Abdominal thrusts / infant alternate method as scheduled" },
    ],
  },
  {
    courseSlug: "bls",
    title: "BLS Skills Sheet",
    instructorOnly: true,
    skills: [
      { id: "team-roles", label: "Team role assignment + closed-loop communication", evidence: "Ran a multi-rescuer scenario" },
      { id: "bag-mask", label: "Bag-mask ventilation effectiveness", evidence: "Seal + rise observed" },
      { id: "adult-bls", label: "Adult BLS sequence with AED/defib workflow", evidence: "Skill sheet completed" },
      { id: "peds-bls", label: "Pediatric/infant BLS adaptations", evidence: "Skill sheet completed" },
      { id: "obstruction", label: "Foreign-body airway obstruction relief", evidence: "Adult + infant pathways practiced" },
    ],
  },
  {
    courseSlug: "first-aid",
    title: "First Aid Skills Sheet",
    instructorOnly: true,
    skills: [
      { id: "bleeding", label: "Direct pressure / bleeding control", evidence: "Observed on training limb/sim" },
      { id: "shock", label: "Shock recognition + positioning/warming", evidence: "Verbal + demo" },
      { id: "illness", label: "Sudden illness assessment (stroke/allergy/diabetes cues)", evidence: "Scenario checkoff" },
      { id: "injury", label: "Injury precautions (head/neck/spine awareness)", evidence: "Scenario checkoff" },
    ],
  },
  {
    courseSlug: "hemorrhage-control",
    title: "Bleeding Control Skills Sheet",
    instructorOnly: true,
    skills: [
      { id: "pressure", label: "High-quality direct pressure", evidence: "Continuous pressure demo" },
      { id: "packing", label: "Wound packing awareness (training equipment)", evidence: "Instructor-guided practice" },
      { id: "tourniquet", label: "Commercial tourniquet application + time notation", evidence: "Bleeding stopped on trainer" },
      { id: "handoff", label: "EMS handoff script", evidence: "Observed" },
    ],
  },
];

export function getSkillSheet(courseSlug: string) {
  return skillSheets.find((sheet) => sheet.courseSlug === courseSlug);
}

export type SkillSignoff = {
  id: string;
  courseSlug: string;
  learnerUserId: string;
  learnerName: string;
  instructorName: string;
  instructorEmail: string;
  skillIds: string[];
  notes?: string;
  signedAt: string;
  method: "instructor-portal";
};
