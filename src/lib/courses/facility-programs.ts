import type { Course } from "@/lib/course-types";

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
      "Equip your team with verbal and non-verbal techniques to safely de-escalate agitated individuals and prevent workplace violence before it starts. Earn a NyxPulse Certificate of Completion.",
    duration: "8 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate of Completion",
    price: 195,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "3 years (recommended renewal)",
    modules: [
      {
        title: "Understanding Crisis Behavior",
        objective: "Recognize what drives escalation and how to respond early.",
        topics: [
          {
            title: "Stress-crisis continuum",
            summary:
              "People move from calm to anxiety to defensive behavior to crisis. Your goal is to intervene earlier with presence, space, and calm communication before behavior becomes dangerous.",
          },
          {
            title: "Mental health, trauma, and substance use factors",
            summary:
              "Agitation may come from pain, fear, psychosis, intoxication, dementia, or trauma triggers. Avoid arguing about delusions; focus on safety, dignity, and reducing stimulation.",
          },
          {
            title: "Trauma-informed approach",
            summary:
              "Assume people may have trauma histories. Offer choices when possible, explain what you are doing, keep your voice steady, and avoid surprising touch or sudden movement.",
          },
          {
            title: "Warning signs of impending violence",
            summary:
              "Watch for clenched fists, pacing, invading space, loud threats, fixed stare, or sudden silence. Trust your instincts and create distance before a physical confrontation starts.",
          },
        ],
      },
      {
        title: "Communication Skills That Lower Temperature",
        objective: "Use words and body language to reduce threat.",
        topics: [
          {
            title: "Active listening and validation",
            summary:
              "Let the person speak. Reflect feelings (“You sound frustrated”) without agreeing to unsafe demands. Validation lowers defensiveness even when you must set limits.",
          },
          {
            title: "Verbal de-escalation techniques",
            summary:
              "Use short sentences, one request at a time, respectful tone, and clear limits. Offer realistic options (“We can talk here or step to a quieter area”). Avoid sarcasm and power struggles.",
          },
          {
            title: "Body language and proxemics",
            summary:
              "Stand at an angle, keep hands visible, maintain a safe reactionary gap, and avoid blocking exits. Match a calm posture — not a confrontational stance.",
          },
          {
            title: "Setting limits without escalating",
            summary:
              "State the behavior, the reason, and the choice. Example: “I need you to lower your voice so I can help you. We can continue if we keep this respectful.”",
          },
        ],
      },
      {
        title: "Personal Safety & Team Response",
        objective: "Protect yourself and coordinate help.",
        topics: [
          {
            title: "Safe positioning and exit awareness",
            summary:
              "Never let an agitated person get between you and the exit. Keep furniture as a buffer when useful. If you feel unsafe, leave and call for help.",
          },
          {
            title: "When to call for backup",
            summary:
              "Call early for security/supervisor/rapid response when weapons are mentioned, violence is imminent, or de-escalation is failing. Waiting too long increases injury risk.",
          },
          {
            title: "Team roles during a behavioral emergency",
            summary:
              "One primary communicator, others stay quiet and support. Crowding the person usually worsens escalation. Assign someone to clear bystanders and call for resources.",
          },
          {
            title: "Documentation and post-incident review",
            summary:
              "Record objective facts: what was said/done, interventions tried, who was notified, and injuries. Debrief the team to improve the next response.",
          },
        ],
      },
      {
        title: "Workplace Violence Prevention Practice",
        objective: "Apply skills to common healthcare scenarios.",
        topics: [
          {
            title: "ED / triage agitation scenario",
            summary:
              "Long waits, pain, and fear drive conflict. Update patients, offer comfort measures, set expectations, and escalate early if threats begin.",
          },
          {
            title: "Family member confrontation scenario",
            summary:
              "Acknowledge concern, move to a quieter space if safe, avoid debating in public, and involve a charge nurse/supervisor when emotions stay high.",
          },
          {
            title: "Cognitive impairment / dementia escalation",
            summary:
              "Reduce noise, use simple cues, avoid arguing about reality, and watch for overstimulation. Redirect rather than correct when possible.",
          },
          {
            title: "Aftercare for staff",
            summary:
              "Workplace violence affects mental health. Know how to report, access employee support, and request schedule/coverage adjustments after a serious incident.",
          },
        ],
      },
    ],
    outcomes: [
      "Recognize early warning signs of escalating behavior",
      "Apply verbal and non-verbal de-escalation strategies",
      "Maintain personal safety and call for backup appropriately",
      "Document incidents and support team aftercare",
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
      "All-hazards emergency management for hospitals, clinics, and long-term care. Covers CMS Emergency Preparedness Rule expectations, Joint Commission themes, planning, exercises, and recovery.",
    duration: "16 hours (2 days)",
    format: ["Live", "Virtual", "Hybrid"],
    level: "Intermediate",
    certifies: "NyxPulse Certificate of Completion",
    price: 375,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "3 years (recommended renewal)",
    modules: [
      {
        title: "Emergency Management Fundamentals",
        objective: "Build a shared foundation for healthcare preparedness.",
        topics: [
          {
            title: "All-hazards approach",
            summary:
              "Plan for capabilities that work across many threats — communication, staff roles, resources, evacuation/shelter-in-place — instead of writing a separate plan for every scenario.",
          },
          {
            title: "NIMS and healthcare integration",
            summary:
              "Understand how hospital command structures connect with community emergency management through common terminology, scalable organization, and clear information flow.",
          },
          {
            title: "CMS & accreditation expectations overview",
            summary:
              "Healthcare facilities are expected to maintain an emergency program with risk assessment, policies/procedures, communication plans, training, testing, and continuous improvement.",
          },
          {
            title: "Roles of emergency managers and department leads",
            summary:
              "Emergency managers coordinate the program; department leaders own unit-level readiness, staffing contingencies, and downtime procedures.",
          },
        ],
      },
      {
        title: "Hazard Vulnerability Analysis & the EOP",
        objective: "Assess risk and maintain a usable Emergency Operations Plan.",
        topics: [
          {
            title: "Conducting an HVA",
            summary:
              "Score hazards by probability, impact, and current preparedness. Use results to prioritize training, supplies, and mitigation projects.",
          },
          {
            title: "Writing and maintaining the EOP",
            summary:
              "Keep the plan practical: activation criteria, command structure, communications, resource management, clinical continuity, and recovery. Update after exercises and real events.",
          },
          {
            title: "Annexes and critical functions",
            summary:
              "Common annexes include evacuation, shelter-in-place, utility failure, cyber downtime, infectious disease, and surge. Each should list triggers, owners, and immediate actions.",
          },
          {
            title: "Communications and downtime procedures",
            summary:
              "Define primary/backup communication methods, who notifies whom, and how clinical teams operate if EHR, phones, or badge systems fail.",
          },
        ],
      },
      {
        title: "Training, Exercises & Improvement",
        objective: "Test the plan and turn findings into action.",
        topics: [
          {
            title: "Designing tabletop exercises",
            summary:
              "Use a realistic scenario, injects, and clear objectives. Focus discussion on decisions, communications, and resource gaps — not perfect scripts.",
          },
          {
            title: "Drills and functional/full-scale exercises",
            summary:
              "Progress from discussion-based to operations-based exercises as readiness matures. Protect patient safety during any live drill.",
          },
          {
            title: "After-action reporting",
            summary:
              "Capture what worked, what failed, and corrective actions with owners and due dates. Feed results into the next training cycle.",
          },
          {
            title: "Staff education and just-in-time training",
            summary:
              "Everyone needs role-based awareness. During incidents, use quick job aids and briefing cards so unfamiliar staff can contribute safely.",
          },
        ],
      },
      {
        title: "Surge, Continuity & Recovery",
        objective: "Keep care going and restore normal operations.",
        topics: [
          {
            title: "Surge capacity strategies",
            summary:
              "Plan for space, staff, and supplies. Include alternate care areas, modified documentation, and criteria for diversion or load-balancing.",
          },
          {
            title: "Business continuity planning",
            summary:
              "Identify essential clinical and support functions, maximum tolerable downtime, and workarounds for IT, pharmacy, labs, and facilities.",
          },
          {
            title: "Resource and mutual-aid management",
            summary:
              "Track what you have, what you need, and how to request help. Document burn rates for critical supplies during prolonged events.",
          },
          {
            title: "Demobilization and recovery",
            summary:
              "Stand down command deliberately, restore normal workflows, support staff wellness, and capture lessons learned before memory fades.",
          },
        ],
      },
    ],
    outcomes: [
      "Develop or update a practical Emergency Operations Plan",
      "Conduct and use a Hazard Vulnerability Analysis",
      "Design exercises and after-action improvements",
      "Plan for surge, continuity, and recovery",
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
      "Master Incident Command System (ICS) and Hospital Incident Command System (HICS) concepts used to organize people, information, and resources during incidents.",
    duration: "8 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "Intermediate",
    certifies: "NyxPulse Certificate of Completion (FEMA ICS concepts)",
    price: 225,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "3 years (recommended renewal)",
    modules: [
      {
        title: "ICS Fundamentals",
        objective: "Understand the building blocks of incident command.",
        topics: [
          {
            title: "ICS history and purpose",
            summary:
              "ICS creates a modular command structure so different agencies and departments can work together with clear roles and common language.",
          },
          {
            title: "Command, operations, planning, logistics, finance/admin",
            summary:
              "Know what each section owns. Incident Command sets objectives; Operations does the work; Planning tracks status; Logistics gets resources; Finance/Admin tracks costs and claims.",
          },
          {
            title: "Span of control and modular organization",
            summary:
              "Leaders should supervise a manageable number of people (commonly about 3–7). Expand or contract the org chart as the incident grows or shrinks.",
          },
          {
            title: "Common terminology and transfer of command",
            summary:
              "Use plain ICS terms. Transfer command with a briefing covering objectives, priorities, resources, and safety issues.",
          },
        ],
      },
      {
        title: "HICS for Hospitals & Clinics",
        objective: "Apply ICS concepts inside healthcare facilities.",
        topics: [
          {
            title: "HICS organizational chart essentials",
            summary:
              "HICS adapts ICS to hospital functions such as medical care, infrastructure, security, and logistics. Positions activate only as needed.",
          },
          {
            title: "Job action sheets and position checklists",
            summary:
              "Job action sheets tell each role what to do in the first 5 minutes, next hour, and ongoing. Use them instead of improvising from memory.",
          },
          {
            title: "Hospital Command Center operations",
            summary:
              "Define activation triggers, who reports where, information boards, and briefing cadence. Keep the command center focused on decisions and coordination.",
          },
          {
            title: "HICS vs. field ICS differences",
            summary:
              "Hospitals still care for patients while managing the incident. Clinical continuity, family centers, and facility systems are healthcare-specific considerations.",
          },
        ],
      },
      {
        title: "Planning & Documentation Tools",
        objective: "Use forms and briefings that keep teams aligned.",
        topics: [
          {
            title: "Incident objectives and the planning cycle",
            summary:
              "Set SMART objectives, brief the team, operate, then reassess. Short operational periods keep plans current during fast-moving events.",
          },
          {
            title: "Key forms (201, 202, 204 and status boards)",
            summary:
              "Practice capturing situation status, objectives, and assignments. Even if you use digital tools, the same information discipline applies.",
          },
          {
            title: "Resource tracking and requests",
            summary:
              "Track what is assigned, available, and needed. Bad resource tracking creates duplicate requests and blind spots.",
          },
          {
            title: "Information management and rumor control",
            summary:
              "Designate a single source of truth for staff updates. Unverified hallway information creates confusion and unsafe actions.",
          },
        ],
      },
      {
        title: "Activation, Operations & Demobilization",
        objective: "Run an incident from start-up to stand-down.",
        topics: [
          {
            title: "Activation criteria and notifications",
            summary:
              "Define who can activate HICS, how notifications go out, and what the first briefing must cover.",
          },
          {
            title: "Incident Action Plans in healthcare",
            summary:
              "Translate objectives into department assignments: ED surge, OR hold, utility response, patient family updates, and safety rounds.",
          },
          {
            title: "Mutual aid and external coordination",
            summary:
              "Know when to request help from health systems, EMS, public health, or emergency management — and what information they need from you.",
          },
          {
            title: "Demobilization and after-action",
            summary:
              "Release positions intentionally, return equipment, restore normal operations, and capture lessons while details are fresh.",
          },
        ],
      },
    ],
    outcomes: [
      "Operate within an ICS or HICS structure during an incident",
      "Use objectives, briefings, and status documentation effectively",
      "Activate and demobilize command roles cleanly",
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
      "Foundational OSHA overview for healthcare and general industry — bloodborne pathogens awareness, hazard communication, ergonomics, PPE, and recordkeeping.",
    duration: "6 hours",
    format: ["Live", "Virtual"],
    level: "Beginner",
    certifies: "NyxPulse Certificate of Completion",
    price: 110,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "Varies by employer policy",
    modules: [
      {
        title: "OSHA Overview & Worker Rights",
        objective: "Know how OSHA expectations apply at work.",
        topics: [
          {
            title: "Employer responsibilities and worker rights",
            summary:
              "Employers must provide a workplace free from recognized hazards. Workers have rights to information, training, PPE, and to raise safety concerns without retaliation.",
          },
          {
            title: "Inspection process basics",
            summary:
              "Understand opening conference, walkaround, employee interviews, and closing conference concepts. Know who to notify if an inspector arrives.",
          },
          {
            title: "Recordkeeping awareness (300 logs)",
            summary:
              "Learn what kinds of work-related injuries/illnesses are typically recorded and why accurate reporting matters for prevention — not punishment.",
          },
          {
            title: "Reporting serious incidents",
            summary:
              "Know your organization’s internal reporting chain and that severe injuries, hospitalizations, amputations, and fatalities have urgent reporting timelines.",
          },
        ],
      },
      {
        title: "Healthcare Hazard Controls",
        objective: "Reduce common clinical workplace risks.",
        topics: [
          {
            title: "Bloodborne pathogens overview",
            summary:
              "Treat all blood and certain body fluids as potentially infectious. Use Standard Precautions, sharps safety, and immediate exposure reporting.",
          },
          {
            title: "Needlestick prevention",
            summary:
              "Use safety-engineered devices, never recap routinely, dispose sharps immediately, and report every exposure so medical evaluation can begin quickly.",
          },
          {
            title: "Respiratory protection awareness",
            summary:
              "Know when facemasks vs respirators are required, the importance of fit testing for tight-fitting respirators, and how to don/doff without self-contamination.",
          },
          {
            title: "Ergonomics and safe patient handling",
            summary:
              "Use lift equipment and team lifts. Avoid heroic single-person transfers that cause back injuries. Assess the patient and environment before moving.",
          },
        ],
      },
      {
        title: "Hazard Communication & PPE",
        objective: "Understand chemicals, labels, and protective equipment.",
        topics: [
          {
            title: "GHS / HazCom labels",
            summary:
              "Recognize pictograms, signal words, and hazard statements on chemical labels before you use a product.",
          },
          {
            title: "Safety Data Sheets (SDS)",
            summary:
              "Know where SDS are kept and how to find first-aid, PPE, spill, and storage information quickly.",
          },
          {
            title: "Selecting and using PPE",
            summary:
              "Match PPE to the hazard. Inspect before use, don/doff correctly, and replace damaged gear. PPE is the last line of defense after engineering/admin controls.",
          },
          {
            title: "Spill response and eyewash awareness",
            summary:
              "Know your spill kit locations, who responds to chemical spills, and how to activate eyewash/shower stations immediately after exposure.",
          },
        ],
      },
      {
        title: "Safety Culture in Practice",
        objective: "Turn rules into everyday habits.",
        topics: [
          {
            title: "Near-miss reporting",
            summary:
              "Report close calls. Near misses are free lessons that prevent the next injury.",
          },
          {
            title: "Stop-the-line authority",
            summary:
              "Anyone should be able to pause an unsafe process. Leaders must support that behavior publicly.",
          },
          {
            title: "Unit safety huddles",
            summary:
              "Use short huddles to highlight hazards, equipment issues, and patient handling risks for the shift.",
          },
          {
            title: "Creating a personal action plan",
            summary:
              "Identify one hazard in your work area, one control improvement, and who you will escalate it to this week.",
          },
        ],
      },
    ],
    outcomes: [
      "Identify OSHA-covered hazards in your workplace",
      "Apply Standard Precautions and sharps safety basics",
      "Use labels, SDS, and PPE correctly",
      "Strengthen everyday safety culture behaviors",
    ],
    whoFor: ["All healthcare staff", "Supervisors & managers", "Safety committees"],
  },
];
