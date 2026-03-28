export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  badge: "violet" | "cyan" | "amber" | "green";
  icon: string;
  tagline: string;
  description: string;
  duration: string;
  format: ("Live" | "Virtual" | "Hybrid")[];
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  certifies: string;
  price: number | null;
  featured: boolean;
  modules: { title: string; topics: string[] }[];
  outcomes: string[];
  whoFor: string[];
}

export const courses: Course[] = [
  {
    slug: "cpr-aed",
    title: "CPR & AED Certification",
    shortTitle: "CPR / AED",
    category: "Life Safety",
    badge: "cyan",
    icon: "❤️",
    tagline: "Be the first line of defense when it matters most.",
    description:
      "Master adult, pediatric, and infant CPR along with AED operation. This course blends evidence-based techniques with hands-on practice so you act with confidence during any cardiac emergency.",
    duration: "4 hours",
    format: ["Live", "Hybrid"],
    level: "All Levels",
    certifies: "American Heart Association (AHA) aligned",
    price: 75,
    featured: true,
    modules: [
      {
        title: "Cardiac Emergency Basics",
        topics: [
          "Recognizing cardiac arrest",
          "Chain of Survival",
          "When & how to call 911",
        ],
      },
      {
        title: "CPR Techniques",
        topics: [
          "Adult CPR",
          "Child CPR",
          "Infant CPR",
          "Two-rescuer CPR",
          "CPR with barrier device",
        ],
      },
      {
        title: "AED Operation",
        topics: [
          "AED anatomy & placement",
          "Real-world AED scenarios",
          "Special situations (water, pacemakers)",
        ],
      },
    ],
    outcomes: [
      "Perform high-quality CPR on adults, children, and infants",
      "Operate an AED safely and correctly",
      "Manage a cardiac emergency until EMS arrives",
    ],
    whoFor: [
      "Healthcare workers",
      "Security personnel",
      "School staff",
      "General public",
    ],
  },
  {
    slug: "bls",
    title: "Basic Life Support (BLS)",
    shortTitle: "BLS",
    category: "Life Safety",
    badge: "cyan",
    icon: "🫁",
    tagline: "Clinical-grade resuscitation for healthcare providers.",
    description:
      "A step above standard CPR, BLS is designed for healthcare professionals who need to provide quality resuscitation in clinical environments — alone or as part of a team.",
    duration: "6 hours",
    format: ["Live", "Hybrid"],
    level: "Intermediate",
    certifies: "AHA BLS Provider aligned",
    price: 95,
    featured: true,
    modules: [
      {
        title: "BLS for Healthcare Providers",
        topics: [
          "High-performance CPR",
          "Bag-mask ventilation",
          "Oropharyngeal & nasopharyngeal airways",
        ],
      },
      {
        title: "Team Dynamics",
        topics: [
          "Role assignments",
          "Closed-loop communication",
          "Leadership in resuscitation",
        ],
      },
      {
        title: "Special Scenarios",
        topics: [
          "Drowning & trauma",
          "Opioid overdose response",
          "Pregnancy considerations",
        ],
      },
    ],
    outcomes: [
      "Apply BLS skills in a clinical team environment",
      "Perform effective ventilation with adjuncts",
      "Lead or support a code team",
    ],
    whoFor: [
      "Nurses",
      "Physicians",
      "EMTs & paramedics",
      "Respiratory therapists",
      "Medical students",
    ],
  },
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
    certifies: "Certificate of Completion",
    price: 120,
    featured: true,
    modules: [
      {
        title: "Understanding Crisis Behavior",
        topics: [
          "Stress-crisis continuum",
          "Mental health & substance use factors",
          "Trauma-informed approach",
        ],
      },
      {
        title: "Communication Skills",
        topics: [
          "Active listening",
          "Verbal de-escalation techniques",
          "Body language & proxemics",
        ],
      },
      {
        title: "Workplace Violence Prevention",
        topics: [
          "Risk assessment",
          "Safe positioning",
          "When to call for backup",
          "Documentation",
        ],
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
    certifies: "Certificate of Completion",
    price: 250,
    featured: true,
    modules: [
      {
        title: "Emergency Management Fundamentals",
        topics: [
          "All-hazards approach",
          "NIMS integration",
          "CMS & TJC compliance overview",
        ],
      },
      {
        title: "The Emergency Operations Plan (EOP)",
        topics: [
          "Hazard vulnerability analysis (HVA)",
          "Writing & maintaining the EOP",
          "Annexes & ESF assignments",
        ],
      },
      {
        title: "Training & Exercise",
        topics: [
          "Designing tabletop exercises",
          "Full-scale drill coordination",
          "After-action reporting",
        ],
      },
      {
        title: "Recovery & Continuity",
        topics: ["Business continuity planning", "Surge capacity", "Resource management"],
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
    certifies: "FEMA ICS 100/200 aligned",
    price: 150,
    featured: false,
    modules: [
      {
        title: "ICS Fundamentals",
        topics: [
          "ICS history & structure",
          "Span of control",
          "Common terminology",
          "ICS forms",
        ],
      },
      {
        title: "HICS Overview",
        topics: [
          "HICS organizational chart",
          "Position checklists",
          "HICS vs. ICS differences",
        ],
      },
      {
        title: "Activation & Operations",
        topics: [
          "Incident Action Plans",
          "Resource tracking",
          "Mutual aid agreements",
          "Demobilization",
        ],
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
    certifies: "Certificate of Completion",
    price: 85,
    featured: false,
    modules: [
      {
        title: "OSHA Overview",
        topics: [
          "Worker rights & employer responsibilities",
          "Inspection process",
          "Recordkeeping (300 logs)",
        ],
      },
      {
        title: "Healthcare-Specific Hazards",
        topics: [
          "Bloodborne pathogens (BBP) standard",
          "Needlestick prevention",
          "Respiratory protection",
          "Ergonomics & safe patient handling",
        ],
      },
      {
        title: "Hazard Communication",
        topics: [
          "GHS/HazCom 2012",
          "Safety Data Sheets (SDS)",
          "Labeling requirements",
        ],
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

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.featured);
}
