export type WorkforceRoleId =
  | "ed-nurse"
  | "medsurg-nurse"
  | "security"
  | "front-desk"
  | "clinic-ma"
  | "facilities"
  | "house-supervisor"
  | "new-hire-clinical";

export type RoleMatrix = {
  id: WorkforceRoleId;
  title: string;
  summary: string;
  requiredCourseSlugs: string[];
  recommendedCourseSlugs: string[];
  mustPassGates: boolean;
  skillsSessionRecommended: boolean;
};

export const roleMatrices: RoleMatrix[] = [
  {
    id: "ed-nurse",
    title: "ED / Urgent Care Nurse",
    summary: "High-acuity clinical response + behavioral threat readiness.",
    requiredCourseSlugs: ["bls", "de-escalation", "workplace-violence-prevention", "opioid-overdose-response"],
    recommendedCourseSlugs: ["hemorrhage-control", "active-shooter-preparedness", "ics-hics"],
    mustPassGates: true,
    skillsSessionRecommended: true,
  },
  {
    id: "medsurg-nurse",
    title: "Med-Surg / Floor Nurse",
    summary: "Core resuscitation, first aid judgment, and unit violence prevention.",
    requiredCourseSlugs: ["cpr-aed", "first-aid", "de-escalation", "bloodborne-pathogens"],
    recommendedCourseSlugs: ["bls", "workplace-violence-prevention", "opioid-overdose-response"],
    mustPassGates: true,
    skillsSessionRecommended: true,
  },
  {
    id: "security",
    title: "Security / Public Safety",
    summary: "Threat, violence, bleeding control, and command coordination.",
    requiredCourseSlugs: [
      "workplace-violence-prevention",
      "active-shooter-preparedness",
      "de-escalation",
      "hemorrhage-control",
    ],
    recommendedCourseSlugs: ["cpr-aed", "opioid-overdose-response", "ics-hics"],
    mustPassGates: true,
    skillsSessionRecommended: false,
  },
  {
    id: "front-desk",
    title: "Front Desk / Greeter",
    summary: "First-contact de-escalation, CPR awareness, and active threat hide/escape.",
    requiredCourseSlugs: ["de-escalation", "cpr-aed", "active-shooter-preparedness"],
    recommendedCourseSlugs: ["workplace-violence-prevention", "first-aid"],
    mustPassGates: true,
    skillsSessionRecommended: true,
  },
  {
    id: "clinic-ma",
    title: "Clinic Medical Assistant",
    summary: "Rooming-area emergencies, BBP, and opioid response.",
    requiredCourseSlugs: ["cpr-aed", "first-aid", "bloodborne-pathogens", "opioid-overdose-response"],
    recommendedCourseSlugs: ["de-escalation", "hemorrhage-control"],
    mustPassGates: true,
    skillsSessionRecommended: true,
  },
  {
    id: "facilities",
    title: "Facilities / EVS",
    summary: "OSHA + BBP + threat awareness for staff who move everywhere.",
    requiredCourseSlugs: ["osha-safety", "bloodborne-pathogens", "active-shooter-preparedness"],
    recommendedCourseSlugs: ["cpr-aed", "workplace-violence-prevention"],
    mustPassGates: true,
    skillsSessionRecommended: false,
  },
  {
    id: "house-supervisor",
    title: "House Supervisor / Charge",
    summary: "Command, surge, and staff protection stack.",
    requiredCourseSlugs: [
      "emergency-management-healthcare",
      "ics-hics",
      "workplace-violence-prevention",
      "de-escalation",
    ],
    recommendedCourseSlugs: ["bls", "active-shooter-preparedness"],
    mustPassGates: true,
    skillsSessionRecommended: false,
  },
  {
    id: "new-hire-clinical",
    title: "New Hire — Clinical",
    summary: "Day-one clinical onboarding baseline.",
    requiredCourseSlugs: ["cpr-aed", "bloodborne-pathogens", "osha-safety", "de-escalation"],
    recommendedCourseSlugs: ["first-aid", "opioid-overdose-response"],
    mustPassGates: true,
    skillsSessionRecommended: true,
  },
];

export function getRoleMatrix(id: string) {
  return roleMatrices.find((role) => role.id === id);
}
