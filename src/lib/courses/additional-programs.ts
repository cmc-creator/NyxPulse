import type { Course } from "@/lib/course-types";
import { jeremyInstructor } from "@/lib/instructors";

export const additionalPrograms: Course[] = [
  {
    slug: "bloodborne-pathogens",
    title: "Bloodborne Pathogens Awareness",
    shortTitle: "Bloodborne Pathogens",
    category: "Workplace Safety",
    badge: "green",
    icon: "🩸",
    tagline: "Protect yourself and others from exposure risks.",
    description:
      "A focused NyxPulse course on bloodborne pathogens awareness for healthcare and public-facing teams. Covers Standard Precautions, sharps safety, spill response, and what to do after an exposure. Issues a NyxPulse Certificate of Completion.",
    duration: "2 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "Beginner",
    certifies: "NyxPulse Certificate of Completion",
    price: 65,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "1 year (recommended annual renewal)",
    instructor: jeremyInstructor,
    modules: [
      {
        title: "Pathogens & Transmission",
        objective: "Understand the risks you are protecting against.",
        topics: [
          {
            title: "HBV, HCV, and HIV basics",
            summary:
              "These viruses can be transmitted through blood and certain body fluids. Vaccination (for hepatitis B), safe practices, and rapid exposure response reduce risk.",
          },
          {
            title: "How workplace exposures happen",
            summary:
              "Needlesticks, sharps injuries, splashes to eyes/mouth, and contact with non-intact skin are common routes. Know your highest-risk tasks.",
          },
          {
            title: "Standard Precautions",
            summary:
              "Treat all blood and specified body fluids as potentially infectious. Use PPE based on anticipated exposure, not on whether a patient “looks sick.”",
          },
          {
            title: "Engineering and work-practice controls",
            summary:
              "Safety devices, sharps containers, no-recap habits, and designated clean/dirty areas are more reliable than willpower alone.",
          },
        ],
      },
      {
        title: "PPE, Sharps & Spill Response",
        objective: "Use protective practices correctly in real workflows.",
        topics: [
          {
            title: "Choosing gloves, masks, eye protection, and gowns",
            summary:
              "Match PPE to the task. Change gloves between patients, avoid touching your face, and remove PPE in an order that limits self-contamination.",
          },
          {
            title: "Sharps handling and disposal",
            summary:
              "Dispose sharps immediately in puncture-resistant containers. Do not overfill containers. Never reach into a sharps container.",
          },
          {
            title: "Blood and body fluid spill cleanup",
            summary:
              "Restrict the area, use PPE, absorb carefully, disinfect with an approved product, and dispose of waste per policy.",
          },
          {
            title: "Laundry, waste, and contaminated equipment",
            summary:
              "Handle contaminated items with minimal agitation. Follow your facility’s bagging, labeling, and cleaning procedures.",
          },
        ],
      },
      {
        title: "Exposure Response & Prevention Culture",
        objective: "Act fast after exposure and prevent the next one.",
        topics: [
          {
            title: "Immediate first steps after an exposure",
            summary:
              "Wash needlesticks/cuts with soap and water, flush mucous membranes with water, and report immediately so evaluation and treatment are not delayed.",
          },
          {
            title: "Reporting and medical follow-up",
            summary:
              "Know who to call (supervisor/employee health/ED). Follow-up may include baseline testing, prophylaxis decisions, and confidential counseling.",
          },
          {
            title: "Hepatitis B vaccination awareness",
            summary:
              "Hepatitis B vaccination is a key prevention tool for at-risk workers. Know how to access occupational health resources.",
          },
          {
            title: "Building safer habits on your unit",
            summary:
              "Speak up about missing sharps containers, broken safety devices, or rushed unsafe practices. Prevention is a team sport.",
          },
        ],
      },
    ],
    outcomes: [
      "Apply Standard Precautions in daily work",
      "Handle sharps and spills more safely",
      "Respond immediately and correctly after an exposure",
    ],
    whoFor: [
      "Clinical staff",
      "Environmental services",
      "Security & public safety",
      "Students in clinical settings",
    ],
  },
  {
    slug: "opioid-overdose-response",
    title: "Opioid Overdose Response & Naloxone Awareness",
    shortTitle: "Opioid Response",
    category: "Life Safety",
    badge: "cyan",
    icon: "💉",
    tagline: "Recognize overdose fast and act with confidence.",
    description:
      "Practical NyxPulse training to recognize opioid overdose, support breathing, use naloxone when available/authorized, and hand off to EMS. Complements CPR training and issues a NyxPulse Certificate of Completion.",
    duration: "2 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate of Completion",
    price: 75,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "2 years (recommended renewal)",
    instructor: jeremyInstructor,
    modules: [
      {
        title: "Recognizing Opioid Overdose",
        objective: "Identify overdose quickly and activate help.",
        topics: [
          {
            title: "Why opioid overdoses are different",
            summary:
              "Opioids can slow or stop breathing while the heart is still beating at first. Early airway/breathing support is critical.",
          },
          {
            title: "Signs of opioid overdose",
            summary:
              "Unresponsiveness, very slow/absent breathing, gurgling/snoring sounds, pinpoint pupils, limp body, and blue/gray lips or fingertips are key warning signs.",
          },
          {
            title: "Scene safety and EMS activation",
            summary:
              "Ensure the scene is safe, call 9-1-1, and get naloxone + AED if available. Do not leave the person alone if you can avoid it.",
          },
          {
            title: "Stimulation check and positioning",
            summary:
              "Check responsiveness firmly. If breathing is inadequate, prepare to support ventilation. If they are breathing adequately but unresponsive, recovery position may be appropriate while you monitor closely.",
          },
        ],
      },
      {
        title: "Naloxone & Breathing Support",
        objective: "Use naloxone and airway skills within your training/authorization.",
        topics: [
          {
            title: "How naloxone works",
            summary:
              "Naloxone can temporarily reverse opioid effects. It may wear off before the opioid does, so continued monitoring is essential.",
          },
          {
            title: "Intranasal and injectable naloxone awareness",
            summary:
              "Follow the device instructions you are trained/authorized to use. Assemble/administer promptly, then reassess breathing and responsiveness.",
          },
          {
            title: "Rescue breathing and CPR integration",
            summary:
              "If the person is not breathing normally, provide breathing support / CPR per your CPR training. An AED should be used if they become pulseless/unresponsive without normal breathing.",
          },
          {
            title: "When to give additional doses",
            summary:
              "If no improvement after the first dose and the time interval indicated by your protocol/device guidance, additional naloxone may be needed while supporting breathing.",
          },
        ],
      },
      {
        title: "Aftercare, Safety & Team Practice",
        objective: "Stay safe after reversal and communicate clearly with responders.",
        topics: [
          {
            title: "Post-naloxone monitoring",
            summary:
              "People may wake up confused, agitated, or sick. Keep them from leaving before EMS evaluates when possible, and watch for repeat respiratory depression.",
          },
          {
            title: "What to tell EMS",
            summary:
              "Report estimated time found, breathing status, naloxone doses/times, other drugs/alcohol if known, and any trauma.",
          },
          {
            title: "Workplace and community response planning",
            summary:
              "Know where naloxone kits are stored, who is authorized to use them, and how replacements are requested after use.",
          },
          {
            title: "Scenario practice checklist",
            summary:
              "Walk through: recognize → call 9-1-1 → open airway/support breathing → naloxone → reassess → handoff. Practice until the sequence feels automatic.",
          },
        ],
      },
    ],
    outcomes: [
      "Recognize opioid overdose signs quickly",
      "Support breathing and integrate naloxone use appropriately",
      "Provide a clear EMS handoff and post-reversal monitoring",
    ],
    whoFor: [
      "Healthcare staff",
      "Security teams",
      "School & community responders",
      "Anyone in a high-risk workplace",
    ],
  },
  {
    slug: "hemorrhage-control",
    title: "Life-Threatening Bleeding Control",
    shortTitle: "Bleeding Control",
    category: "Life Safety",
    badge: "cyan",
    icon: "🩹",
    tagline: "Stop severe bleeding before help arrives.",
    description:
      "Hands-on-ready NyxPulse training for life-threatening bleeding control: direct pressure, wound packing concepts, and tourniquet application awareness. Issues a NyxPulse Certificate of Completion and pairs well with First Aid/CPR.",
    duration: "2–3 hours",
    format: ["Live", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate of Completion",
    price: 85,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "2 years (recommended renewal)",
    instructor: jeremyInstructor,
    modules: [
      {
        title: "Recognizing Life-Threatening Bleeding",
        objective: "Decide when bleeding is an emergency.",
        topics: [
          {
            title: "What makes bleeding life-threatening",
            summary:
              "Blood that is spurting, pooling, soaking clothes rapidly, or coming from an amputated/mangled limb needs immediate action. Do not wait for EMS to start care.",
          },
          {
            title: "Scene safety and PPE",
            summary:
              "Gloves and eye protection matter. If the scene is unsafe (traffic, active threat), prioritize getting to safety before care.",
          },
          {
            title: "Call for help and get equipment",
            summary:
              "Activate EMS and send someone for a bleeding-control kit / AED / first-aid supplies while you begin pressure.",
          },
          {
            title: "Triage mindset with multiple injured people",
            summary:
              "If many people are hurt, prioritize those with massive bleeding who can be saved with rapid pressure/tourniquet use.",
          },
        ],
      },
      {
        title: "Direct Pressure & Wound Packing",
        objective: "Control bleeding with pressure-based techniques.",
        topics: [
          {
            title: "High-quality direct pressure",
            summary:
              "Expose the wound, apply firm continuous pressure with a clean dressing, and do not repeatedly lift to “check.” Add dressings on top if soaked.",
          },
          {
            title: "Wound packing awareness",
            summary:
              "For deep junctional/limb wounds that continue bleeding, packing gauze into the wound and holding pressure can help. Practice this with your instructor using training equipment.",
          },
          {
            title: "Pressure bandages",
            summary:
              "Once bleeding slows, a pressure bandage can free your hands. Ensure it is tight enough to control bleeding but monitor circulation beyond the bandage when applicable.",
          },
          {
            title: "What not to do",
            summary:
              "Avoid improvised dangerous methods, removing deeply embedded objects, or using a loose/poorly placed tourniquet as a first lazy option when pressure would work.",
          },
        ],
      },
      {
        title: "Tourniquets & Handoff",
        objective: "Apply a tourniquet correctly and communicate care.",
        topics: [
          {
            title: "When to use a tourniquet",
            summary:
              "Use for severe limb bleeding that is not controlled with direct pressure, or when you cannot effectively apply pressure (multi-casualty / movement needed).",
          },
          {
            title: "Tourniquet placement and tightening",
            summary:
              "Place high and tight on the limb per training guidance, tighten until bleeding stops, and note the time of application. Do not loosen it casually once placed for true life-threatening bleeding.",
          },
          {
            title: "Commercial vs improvised devices",
            summary:
              "Commercial tourniquets are preferred. Improvised options are last resort and must be wide/strong enough — thin cords/wires can cause more harm.",
          },
          {
            title: "Shock care and EMS handoff",
            summary:
              "Keep the person warm and lying down if possible. Tell EMS exactly where bleeding was controlled, what devices were applied, and what time the tourniquet went on.",
          },
        ],
      },
    ],
    outcomes: [
      "Recognize life-threatening bleeding immediately",
      "Apply effective direct pressure and pressure dressings",
      "Place a tourniquet appropriately and hand off to EMS",
    ],
    whoFor: [
      "Healthcare & clinic staff",
      "Security teams",
      "Teachers & coaches",
      "Workplace emergency responders",
    ],
  },
  {
    slug: "workplace-violence-prevention",
    title: "Workplace Violence Prevention",
    shortTitle: "Workplace Violence",
    category: "Behavioral Safety",
    badge: "violet",
    icon: "🛡️",
    tagline: "Recognize risk early, report clearly, and protect your team.",
    description:
      "NyxPulse training on workplace violence prevention for healthcare and public-facing teams. Covers risk factors, warning signs, reporting, environmental controls, and post-incident support. Complements de-escalation skills training and issues a NyxPulse Certificate of Completion.",
    duration: "4 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate of Completion",
    price: 165,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "2 years (recommended renewal)",
    instructor: jeremyInstructor,
    modules: [
      {
        title: "Understanding Workplace Violence",
        objective: "Know what workplace violence looks like and why healthcare is high-risk.",
        topics: [
          {
            title: "What counts as workplace violence",
            summary:
              "Workplace violence includes physical assault, threats, intimidation, harassment, and verbal abuse that create a reasonable fear of harm. It can come from patients, visitors, coworkers, or outsiders. Do not wait for injury before treating a threat as serious.",
          },
          {
            title: "Why healthcare and public settings are high-risk",
            summary:
              "24/7 operations, high stress, long waits, behavioral health crises, substance use, and unrestricted public access raise risk. Home visits, parking lots, and triage areas are common exposure points. Knowing your highest-risk locations helps you prepare.",
          },
          {
            title: "Types of workplace violence",
            summary:
              "Common categories include criminal intent (stranger crime), customer/client (patient or visitor), worker-on-worker, and personal relationship (domestic violence spilling into work). Prevention tactics differ by type — one policy does not cover every scenario.",
          },
          {
            title: "Impact on staff, patients, and culture",
            summary:
              "Violence and near-misses drive injury, turnover, fear, and reduced care quality. A strong reporting culture and visible leadership response matter as much as any single technique.",
          },
        ],
      },
      {
        title: "Recognition, Reporting & Prevention Controls",
        objective: "Spot warning signs early and use organizational controls that reduce risk.",
        topics: [
          {
            title: "Warning signs and escalating behavior",
            summary:
              "Watch for pacing, clenched fists, invading space, loud threats, fixation, sudden silence, or statements about weapons. Share observations with your team early — before a code-gray or security call is the only option.",
          },
          {
            title: "Reporting near-misses and events",
            summary:
              "Report threats, assaults, and near-misses through your facility’s process the same day when possible. Include who, what, where, when, weapons/objects, injuries, and witnesses. Under-reporting hides patterns leadership needs to fix.",
          },
          {
            title: "Environmental and administrative controls",
            summary:
              "Controls include visibility, lighting, panic buttons, badge access, visitor management, safe rooms, staffing patterns, and clear escalation pathways. Know what exists on your unit and what to request when gaps appear.",
          },
          {
            title: "Working alone, home visits, and after-hours risk",
            summary:
              "Use check-in procedures, share itineraries, park under lights, keep exits clear, and know when to postpone a visit. Never feel obligated to enter an unsafe scene alone.",
          },
        ],
      },
      {
        title: "Response, Support & Continuous Improvement",
        objective: "Respond safely in the moment and support people after an event.",
        topics: [
          {
            title: "Immediate response options",
            summary:
              "Create distance, call for help (security/code team/911 as appropriate), use calm communication when safe, and evacuate others if needed. Your job is to protect life — not to win an argument or restrain someone beyond your training and role.",
          },
          {
            title: "Coordination with security and law enforcement",
            summary:
              "Know how to request security, what information they need, and when to call 9-1-1. Follow your facility’s weapons and visitor policies. Do not improvise beyond your training.",
          },
          {
            title: "Post-incident care and documentation",
            summary:
              "Get medical evaluation for injuries, complete required reports, preserve evidence when directed, and access employee assistance / peer support. Leaders should follow up so staff are not left alone after a traumatic event.",
          },
          {
            title: "Building a prevention program on your team",
            summary:
              "Practice drills, review incident trends, refresh de-escalation skills, and speak up about broken locks, missing panic buttons, or chronic understaffing in high-risk areas. Prevention is ongoing work, not a one-time class.",
          },
        ],
      },
    ],
    outcomes: [
      "Identify workplace violence types and warning signs",
      "Report threats and near-misses clearly and promptly",
      "Use prevention controls and post-incident support pathways",
    ],
    whoFor: [
      "Healthcare & clinic staff",
      "Front desk & triage teams",
      "Security & public safety",
      "Managers and unit leaders",
    ],
  },
  {
    slug: "active-shooter-preparedness",
    title: "Active Shooter / Armed Intruder Preparedness",
    shortTitle: "Active Shooter Prep",
    category: "Emergency Preparedness",
    badge: "amber",
    icon: "🚨",
    tagline: "Decide fast: get out, hide well, or defend as a last resort.",
    description:
      "Awareness training for active shooter and armed-intruder events in workplaces and healthcare settings. Covers recognition, escape/hide/defend decision-making, communication with 9-1-1, and recovery basics. Issues a NyxPulse Certificate of Completion. This is preparedness education — not firearms or tactical operator training. Always follow your facility emergency plan and law-enforcement direction.",
    duration: "3 hours",
    format: ["Live", "Virtual", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate of Completion",
    price: 145,
    featured: true,
    certifyingBody: "nyxpulse",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: false,
    skillsSessionRequired: false,
    certificationValidity: "2 years (recommended renewal)",
    instructor: jeremyInstructor,
    complianceNotes: [
      "This course provides general preparedness education aligned with widely taught public-safety concepts (escape, hide, defend as last resort).",
      "It does not authorize use of force beyond your role, policy, and applicable law.",
      "Follow your organization’s emergency operations plan and responding law enforcement instructions during a real event.",
    ],
    modules: [
      {
        title: "Recognize & Decide Quickly",
        objective: "Identify an active threat and choose an initial survival action.",
        topics: [
          {
            title: "What an active shooter / armed intruder event is",
            summary:
              "These events are fast, chaotic, and unpredictable. Your first job is to recognize gunfire, screams, or credible reports of an armed person and start protective action — not to investigate the sound alone.",
          },
          {
            title: "Your facility plan and notification systems",
            summary:
              "Know how alerts are sent (overhead page, app, text, radio), what language your facility uses, and where unit-specific guidance lives. Practice so the first minutes are not spent searching for instructions.",
          },
          {
            title: "Decision framework: escape, hide, defend",
            summary:
              "If you can get out safely, leave. If escape is not possible, hide in a secure location. Defend yourself only as a last resort when your life is in imminent danger. There is no single correct choice for every room or role — decide based on distance, exits, and ability to move others.",
          },
          {
            title: "Healthcare-specific constraints",
            summary:
              "Patients may be immobile, attached to equipment, or unable to evacuate. Prioritize getting yourself and ambulatory people to safety when possible, shelter-in-place when you cannot move patients, and follow your clinical emergency plan for who stays with critical patients.",
          },
        ],
      },
      {
        title: "Escape, Hide & Communicate",
        objective: "Move to safety, harden a hide location, and call for help effectively.",
        topics: [
          {
            title: "Escape / evacuate well",
            summary:
              "Leave belongings, use exits away from the threat, keep hands visible when approaching responders, and help others only if it does not trap you. Have a rally point mindset — do not return to the building until officials say it is safe.",
          },
          {
            title: "Hide / secure-in-place well",
            summary:
              "Lock or barricade doors, turn off lights, silence phones, stay out of sight of windows, and spread out if multiple people are present. Remain quiet and wait for clear law-enforcement instructions before opening the door.",
          },
          {
            title: "Calling 9-1-1 and what to report",
            summary:
              "Give location (address, floor, unit), what you heard/saw, description if safe to observe, number of victims if known, and your name/callback number. Stay on the line if dispatch asks — but do not expose yourself to gather details.",
          },
          {
            title: "When law enforcement arrives",
            summary:
              "Keep hands empty and visible, follow commands immediately, expect officers to pass injured people while they stop the threat first, and do not grab or point suddenly. Direct them with short, clear location information.",
          },
        ],
      },
      {
        title: "Last Resort, Aftermath & Team Readiness",
        objective: "Understand last-resort defense, medical priorities, and recovery steps.",
        topics: [
          {
            title: "Defend only as a last resort",
            summary:
              "If confronted and escape/hiding are impossible, commit to actions that disrupt the attacker long enough to create an escape — improvised objects, teamwork, and decisive movement. This is last resort only and must align with your role, policy, and law. This course does not teach firearms tactics.",
          },
          {
            title: "Bleeding control and helping the injured",
            summary:
              "When the immediate threat is contained or you are in a safe area, life-threatening bleeding control and basic first aid may save lives. Pair this course with NyxPulse Bleeding Control and CPR trainings for hands-on skill depth.",
          },
          {
            title: "After the event — accountability and support",
            summary:
              "Account for staff and patients, follow reunification procedures, avoid spreading unverified information, and access crisis support. Document what you observed when asked by authorized investigators.",
          },
          {
            title: "Drills, walk-throughs, and continuous readiness",
            summary:
              "Walk your unit’s exits and safe rooms, practice notification language, and debrief drills without blame. Update plans when construction, staffing, or access patterns change.",
          },
        ],
      },
    ],
    outcomes: [
      "Recognize an active threat and choose escape, hide, or last-resort defense",
      "Communicate effectively with 9-1-1 and arriving law enforcement",
      "Apply healthcare-aware shelter/evacuation thinking and post-event support steps",
    ],
    whoFor: [
      "All facility staff",
      "Healthcare & clinic teams",
      "Schools & public venues",
      "Security & managers",
    ],
  },
];
