import type { Course } from "@/lib/course-types";

function topics(titles: string[]) {
  return titles.map((title) => ({ title }));
}

export const facilityPrograms: Course[] = [
  {
    slug: "de-escalation",
    title: "De-escalation & Crisis Intervention",
    shortTitle: "De-escalation",
    category: "Behavioral Safety",
    badge: "violet",
    icon: "🧠",
    tagline: "Turn tension into resolution — without force.",
    description:
      "Equip your team with verbal and non-verbal techniques to safely de-escalate agitated individuals and prevent workplace violence before it starts.",
    duration: "8 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate of Completion",
    price: 195,
    featured: true,
    certifyingBody: "nyxpulse",
    officialCertificateIssuer: "nyxpulse",
    skillsSessionRequired: false,
    certificationValidity: "3 years (recommended renewal)",
    modules: [
      {
        title: "Understanding Crisis Behavior",
        topics: topics([
          "Stress-crisis continuum",
          "Mental health & substance use factors",
          "Trauma-informed approach",
        ]),
      },
      {
        title: "Communication Skills",
        topics: topics([
          "Active listening",
          "Verbal de-escalation techniques",
          "Body language & proxemics",
        ]),
      },
      {
        title: "Workplace Violence Prevention",
        topics: topics([
          "Risk assessment",
          "Safe positioning",
          "When to call for backup",
          "Documentation",
        ]),
      },
    ],
    outcomes: [
      "Recognize early warning signs of escalating behavior",
      "Apply evidence-based verbal de-escalation strategies",
      "Maintain personal safety while managing a crisis",
    ],
    whoFor: [
      "Emergency department staff",
      "Behavioral health teams",
      "Security personnel",
      "Outpatient clinic staff",
      "Any patient-facing role",
    ],
  },
  {
    slug: "emergency-management-healthcare",
    title: "Emergency Management for Healthcare Facilities",
    shortTitle: "Emergency Mgmt",
    category: "Emergency Preparedness",
    badge: "amber",
    icon: "🏥",
    tagline: "Prepare your facility before disaster strikes.",
    description:
      "A comprehensive look at all-hazards emergency management tailored for hospitals, clinics, and long-term care facilities. Covers the CMS Emergency Preparedness Rule and The Joint Commission standards.",
    duration: "16 hours (2 days)",
    format: ["Live", "Virtual", "Hybrid"],
    level: "Intermediate",
    certifies: "NyxPulse Certificate of Completion",
    price: 375,
    featured: true,
    certifyingBody: "nyxpulse",
    officialCertificateIssuer: "nyxpulse",
    skillsSessionRequired: false,
    certificationValidity: "3 years (recommended renewal)",
    modules: [
      {
        title: "Emergency Management Fundamentals",
        topics: topics([
          "All-hazards approach",
          "NIMS integration",
          "CMS & TJC compliance overview",
        ]),
      },
      {
        title: "The Emergency Operations Plan (EOP)",
        topics: topics([
          "Hazard vulnerability analysis (HVA)",
          "Writing & maintaining the EOP",
          "Annexes & ESF assignments",
        ]),
      },
      {
        title: "Training & Exercise",
        topics: topics([
          "Designing tabletop exercises",
          "Full-scale drill coordination",
          "After-action reporting",
        ]),
      },
      {
        title: "Recovery & Continuity",
        topics: topics(["Business continuity planning", "Surge capacity", "Resource management"]),
      },
    ],
    outcomes: [
      "Develop or update a compliant Emergency Operations Plan",
      "Conduct a Hazard Vulnerability Analysis",
      "Design and execute emergency exercises",
    ],
    whoFor: [
      "Emergency managers",
      "Hospital administrators",
      "Safety officers",
      "Compliance teams",
      "Clinic directors",
    ],
  },
  {
    slug: "ics-hics",
    title: "ICS & HICS for Healthcare",
    shortTitle: "ICS / HICS",
    category: "Emergency Preparedness",
    badge: "amber",
    icon: "🎯",
    tagline: "Command with clarity in any emergency.",
    description:
      "Master the Incident Command System (ICS) and Hospital Incident Command System (HICS) — the essential frameworks for managing any emergency incident efficiently and compliantly.",
    duration: "8 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "Intermediate",
    certifies: "NyxPulse Certificate of Completion (FEMA ICS concepts)",
    price: 225,
    featured: true,
    certifyingBody: "nyxpulse",
    officialCertificateIssuer: "nyxpulse",
    skillsSessionRequired: false,
    certificationValidity: "3 years (recommended renewal)",
    modules: [
      {
        title: "ICS Fundamentals",
        topics: topics([
          "ICS history & structure",
          "Span of control",
          "Common terminology",
          "ICS forms",
        ]),
      },
      {
        title: "HICS Overview",
        topics: topics([
          "HICS organizational chart",
          "Position checklists",
          "HICS vs. ICS differences",
        ]),
      },
      {
        title: "Activation & Operations",
        topics: topics([
          "Incident Action Plans",
          "Resource tracking",
          "Mutual aid agreements",
          "Demobilization",
        ]),
      },
    ],
    outcomes: [
      "Operate within an ICS or HICS structure during an incident",
      "Complete key ICS forms (201, 202, 204)",
      "Activate and stand down HICS branches",
    ],
    whoFor: [
      "Hospital leadership",
      "Charge nurses",
      "Department managers",
      "Emergency managers",
    ],
  },
  {
    slug: "osha-safety",
    title: "OSHA Safety Fundamentals",
    shortTitle: "OSHA Safety",
    category: "Workplace Safety",
    badge: "green",
    icon: "🦺",
    tagline: "Build a culture of safety from the ground up.",
    description:
      "A foundational OSHA overview for healthcare and general industry — covering bloodborne pathogens, hazard communication, ergonomics, PPE, and more to keep your workforce compliant and safe.",
    duration: "6 hours",
    format: ["Live", "Virtual"],
    level: "Beginner",
    certifies: "NyxPulse Certificate of Completion",
    price: 110,
    featured: true,
    certifyingBody: "nyxpulse",
    officialCertificateIssuer: "nyxpulse",
    skillsSessionRequired: false,
    certificationValidity: "Varies by employer policy",
    modules: [
      {
        title: "OSHA Overview",
        topics: topics([
          "Worker rights & employer responsibilities",
          "Inspection process",
          "Recordkeeping (300 logs)",
        ]),
      },
      {
        title: "Healthcare-Specific Hazards",
        topics: topics([
          "Bloodborne pathogens (BBP) standard",
          "Needlestick prevention",
          "Respiratory protection",
          "Ergonomics & safe patient handling",
        ]),
      },
      {
        title: "Hazard Communication",
        topics: topics([
          "GHS/HazCom 2012",
          "Safety Data Sheets (SDS)",
          "Labeling requirements",
        ]),
      },
    ],
    outcomes: [
      "Identify OSHA-covered hazards in your workplace",
      "Implement bloodborne pathogen exposure controls",
      "Navigate OSHA recordkeeping requirements",
    ],
    whoFor: ["All healthcare staff", "Supervisors & managers", "Safety committees"],
  },
];
