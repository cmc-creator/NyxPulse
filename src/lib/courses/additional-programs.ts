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
];
