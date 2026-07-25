import type { CourseChallenge } from "@/lib/challenges/types";

function mastery(
  id: string,
  title: string,
  brief: string,
  questions: CourseChallenge["questions"],
  passScore = 80
): CourseChallenge {
  return { id, title, kind: "mastery-quiz", brief, passScore, questions };
}

function scenario(
  id: string,
  title: string,
  brief: string,
  startNodeId: string,
  nodes: NonNullable<CourseChallenge["scenario"]>["nodes"],
  passScore = 75
): CourseChallenge {
  return {
    id,
    title,
    kind: "scenario",
    brief,
    passScore,
    scenario: { startNodeId, nodes },
  };
}

export const firstAidChallenges: CourseChallenge[] = [
  scenario(
    "fa-cafeteria-choke",
    "Scenario: Choking in the Cafeteria",
    "First-minute decisions for a conscious choking adult — before they go unresponsive.",
    "start",
    [
      {
        id: "start",
        prompt: "An adult grabs their throat, cannot speak or cough effectively. What first?",
        choices: [
          {
            id: "water",
            label: "Offer water and tell them to drink quickly",
            feedback: "Fluids won’t fix a severe obstruction and can delay care.",
            correct: false,
            nextNodeId: "act",
          },
          {
            id: "ask-help",
            label: "Ask “Are you choking?”, get consent, call for help, begin abdominal thrusts",
            feedback: "Correct. Confirm, consent, help, then effective thrusts.",
            correct: true,
            nextNodeId: "act",
          },
          {
            id: "back-only",
            label: "Slap their back once and walk away if they nod",
            feedback: "Stay with them and use the full trained sequence until effective.",
            correct: false,
            nextNodeId: "act",
          },
        ],
      },
      {
        id: "act",
        prompt: "They become unresponsive. Next transition?",
        choices: [
          {
            id: "cpr",
            label: "Lower to ground, start CPR, check mouth for object when opening airway",
            feedback: "Right transition from choking to unresponsive care.",
            correct: true,
            nextNodeId: null,
          },
          {
            id: "sit",
            label: "Keep them sitting upright and wait for EMS only",
            feedback: "Unresponsive victims need CPR on a firm surface.",
            correct: false,
            nextNodeId: null,
          },
          {
            id: "finger",
            label: "Do blind finger sweeps deeply every cycle",
            feedback: "Only remove an object you can see — blind sweeps can worsen obstruction.",
            correct: false,
            nextNodeId: null,
          },
        ],
      },
    ]
  ),
  mastery("fa-mastery", "First Aid Mastery Gate", "Prove sudden illness + injury decision-making before certification.", [
    {
      id: "q1",
      prompt: "FAST is used primarily for:",
      explanation: "Stroke recognition cues.",
      choices: [
        { id: "a", label: "Stroke recognition", feedback: "Correct.", correct: true },
        { id: "b", label: "Burn severity only", feedback: "Not what FAST is for.", correct: false },
        { id: "c", label: "Measuring fever", feedback: "Incorrect.", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "For life-threatening bleeding you should:",
      explanation: "Start firm continuous pressure immediately and escalate to tourniquet when needed.",
      choices: [
        { id: "a", label: "Apply firm continuous pressure / tourniquet as indicated", feedback: "Correct.", correct: true },
        { id: "b", label: "Wait to see if it stops on its own for 20 minutes", feedback: "Don’t delay.", correct: false },
        { id: "c", label: "Use a thin wire as a first-line tourniquet", feedback: "Dangerous improvised choice.", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "Suspected opioid overdose priority includes:",
      explanation: "Airway/breathing support + naloxone when available + EMS.",
      choices: [
        { id: "a", label: "Support breathing/CPR as needed and use naloxone if available", feedback: "Correct.", correct: true },
        { id: "b", label: "Only wait for them to “sleep it off”", feedback: "Unsafe.", correct: false },
        { id: "c", label: "Give food to raise blood sugar first", feedback: "Wrong emergency.", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "Shock care basics:",
      explanation: "Keep warm, lie down if possible, monitor, rapid EMS.",
      choices: [
        { id: "a", label: "Keep warm, position appropriately, get EMS", feedback: "Correct.", correct: true },
        { id: "b", label: "Give alcohol to “stimulate” them", feedback: "Never.", correct: false },
        { id: "c", label: "Force them to walk laps", feedback: "Worsens shock.", correct: false },
      ],
    },
  ]),
];

export const emergencyManagementChallenges: CourseChallenge[] = [
  scenario(
    "em-surge",
    "Scenario: Sudden Patient Surge",
    "Emergency management judgment: objectives, communications, and resource requests under surge.",
    "start",
    [
      {
        id: "start",
        prompt: "ED volume triples after a regional event. You’re helping activate the facility plan. First leadership move?",
        choices: [
          {
            id: "chaos",
            label: "Let every unit invent its own response independently",
            feedback: "Fragmentation kills coordination. Activate the plan and unified command structure.",
            correct: false,
            nextNodeId: "comms",
          },
          {
            id: "activate",
            label: "Activate emergency plan, clarify incident objectives, stand up command/communications",
            feedback: "Correct. Structure before heroics.",
            correct: true,
            nextNodeId: "comms",
          },
          {
            id: "twitter",
            label: "Post publicly asking for random volunteer clinicians to show up unbadged",
            feedback: "Credentialing and safety first — use official volunteer/staffing pathways.",
            correct: false,
            nextNodeId: "comms",
          },
        ],
      },
      {
        id: "comms",
        prompt: "Rumors are spreading that the hospital is “closing.” Best communication move?",
        choices: [
          {
            id: "silence",
            label: "Say nothing to avoid panic",
            feedback: "Silence fuels rumors. Push clear, approved messages on official channels.",
            correct: false,
            nextNodeId: null,
          },
          {
            id: "single-source",
            label: "Issue a single approved status update to staff/patients via designated channels",
            feedback: "One source of truth reduces chaos.",
            correct: true,
            nextNodeId: null,
          },
          {
            id: "blame",
            label: "Name individual nurses publicly as the cause",
            feedback: "Not useful and damages trust.",
            correct: false,
            nextNodeId: null,
          },
        ],
      },
    ]
  ),
  mastery(
    "em-mastery",
    "Emergency Management Mastery Gate",
    "Prove you understand activation, objectives, and continuity basics.",
    [
      {
        id: "q1",
        prompt: "A good incident objective is:",
        explanation: "Specific, measurable, time-bound, and safety-focused.",
        choices: [
          { id: "a", label: "Specific and time-bound (e.g., triage all arrivals in 15 min)", feedback: "Correct.", correct: true },
          { id: "b", label: "“Do your best”", feedback: "Too vague to execute.", correct: false },
          { id: "c", label: "Secret from the team", feedback: "Objectives must be shared.", correct: false },
        ],
      },
      {
        id: "q2",
        prompt: "Emergency operations plans should be:",
        explanation: "Practiced, accessible, and updated after drills/incidents.",
        choices: [
          { id: "a", label: "Practiced and updated after drills/events", feedback: "Correct.", correct: true },
          { id: "b", label: "Written once and never opened", feedback: "Shelfware fails.", correct: false },
          { id: "c", label: "Only for executives", feedback: "Frontline needs role clarity too.", correct: false },
        ],
      },
      {
        id: "q3",
        prompt: "Resource requests should go through:",
        explanation: "Defined logistics/command pathways, not random side channels.",
        choices: [
          { id: "a", label: "Established logistics/command channels", feedback: "Correct.", correct: true },
          { id: "b", label: "Personal group chats only", feedback: "Creates blind spots.", correct: false },
          { id: "c", label: "Whoever answers the phone first anywhere", feedback: "Unreliable.", correct: false },
        ],
      },
      {
        id: "q4",
        prompt: "After-action reviews exist to:",
        explanation: "Capture lessons and fix gaps without blame theater.",
        choices: [
          { id: "a", label: "Capture lessons and improve systems", feedback: "Correct.", correct: true },
          { id: "b", label: "Punish staff publicly", feedback: "Destroys reporting culture.", correct: false },
          { id: "c", label: "Replace all training forever", feedback: "They’re one improvement loop.", correct: false },
        ],
      },
    ]
  ),
];

export const icsChallenges: CourseChallenge[] = [
  scenario(
    "ics-transfer",
    "Scenario: Transfer of Command",
    "ICS/HICS judgment: span of control, common terminology, and clean command transfer.",
    "start",
    [
      {
        id: "start",
        prompt: "You’re assisting in the Hospital Command Center. Five people are giving conflicting orders to the same unit. What’s wrong?",
        choices: [
          {
            id: "unity",
            label: "Unity of command is broken — clarify who the unit reports to",
            feedback: "Exact diagnosis. One boss for that assignment.",
            correct: true,
            nextNodeId: "transfer",
          },
          {
            id: "more",
            label: "Add more leaders so everyone feels included",
            feedback: "That worsens span-of-control and confusion.",
            correct: false,
            nextNodeId: "transfer",
          },
          {
            id: "ignore",
            label: "Ignore it; conflict creates useful competition",
            feedback: "In incidents, conflict in command delays care.",
            correct: false,
            nextNodeId: "transfer",
          },
        ],
      },
      {
        id: "transfer",
        prompt: "Night commander arrives to relieve day command. Best transfer practice?",
        choices: [
          {
            id: "radio",
            label: "Quick wave on the radio and leave",
            feedback: "Transfer needs briefing: objectives, resources, org chart, risks.",
            correct: false,
            nextNodeId: null,
          },
          {
            id: "brief",
            label: "Brief objectives, resources, section status, open risks, then announce transfer",
            feedback: "Clean ICS transfer.",
            correct: true,
            nextNodeId: null,
          },
          {
            id: "secret",
            label: "Keep the transfer secret so staff aren’t distracted",
            feedback: "People need to know who is in command.",
            correct: false,
            nextNodeId: null,
          },
        ],
      },
    ]
  ),
  mastery("ics-mastery", "ICS/HICS Mastery Gate", "Command structure and planning cycle essentials.", [
    {
      id: "q1",
      prompt: "ICS sections commonly include:",
      explanation: "Operations, Planning, Logistics, Finance/Admin under Command.",
      choices: [
        { id: "a", label: "Operations, Planning, Logistics, Finance/Admin", feedback: "Correct.", correct: true },
        { id: "b", label: "Marketing, Sales, HR only", feedback: "Not ICS.", correct: false },
        { id: "c", label: "Whatever names people invent that day", feedback: "Common terminology matters.", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "Span of control means:",
      explanation: "Limit how many resources one supervisor directly manages.",
      choices: [
        { id: "a", label: "Keeping supervisory load manageable", feedback: "Correct.", correct: true },
        { id: "b", label: "How far radios transmit", feedback: "Different concept.", correct: false },
        { id: "c", label: "Billing codes", feedback: "No.", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "HICS is:",
      explanation: "Hospital/healthcare adaptation of incident command concepts.",
      choices: [
        { id: "a", label: "Incident command adapted for healthcare facilities", feedback: "Correct.", correct: true },
        { id: "b", label: "A replacement for all clinical protocols", feedback: "It organizes response, not clinical care itself.", correct: false },
        { id: "c", label: "Only for wildfires", feedback: "Healthcare focus.", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "Incident Action Plans should:",
      explanation: "Capture objectives and assignments for an operational period.",
      choices: [
        { id: "a", label: "Document objectives/assignments for the operational period", feedback: "Correct.", correct: true },
        { id: "b", label: "Be optional poetry", feedback: "They guide action.", correct: false },
        { id: "c", label: "Replace patient charts", feedback: "Different purpose.", correct: false },
      ],
    },
  ]),
];

export const oshaChallenges: CourseChallenge[] = [
  scenario(
    "osha-spill",
    "Scenario: Chemical Smell in Supply Closet",
    "OSHA mindset: hazard recognition, PPE, and stop-work authority.",
    "start",
    [
      {
        id: "start",
        prompt: "You open a closet and smell a strong chemical odor; a jug is leaking. First move?",
        choices: [
          {
            id: "mop",
            label: "Start mopping with no PPE to clean fast",
            feedback: "Don’t expose yourself. Isolate, alert, use proper spill response.",
            correct: false,
            nextNodeId: "ppe",
          },
          {
            id: "isolate",
            label: "Keep others out, notify supervisor/safety, follow spill/PPE procedures",
            feedback: "Correct hazard control sequence.",
            correct: true,
            nextNodeId: "ppe",
          },
          {
            id: "sniff",
            label: "Take a deep sniff to identify the chemical",
            feedback: "Never intentionally inhale unknowns.",
            correct: false,
            nextNodeId: "ppe",
          },
        ],
      },
      {
        id: "ppe",
        prompt: "Your coworker says PPE “slows everything down.” Best response?",
        choices: [
          {
            id: "skip",
            label: "Agree and skip PPE for speed",
            feedback: "Speed without protection creates injuries and liability.",
            correct: false,
            nextNodeId: null,
          },
          {
            id: "match",
            label: "Match PPE to the hazard and task; don’t skip required controls",
            feedback: "Right safety culture answer.",
            correct: true,
            nextNodeId: null,
          },
          {
            id: "fashion",
            label: "Wear random PPE that looks careful even if wrong for the chemical",
            feedback: "Wrong PPE can be false security.",
            correct: false,
            nextNodeId: null,
          },
        ],
      },
    ]
  ),
  mastery("osha-mastery", "OSHA Safety Mastery Gate", "Hazard communication, PPE, and reporting fundamentals.", [
    {
      id: "q1",
      prompt: "SDS stands for:",
      explanation: "Safety Data Sheet — hazard and handling info.",
      choices: [
        { id: "a", label: "Safety Data Sheet", feedback: "Correct.", correct: true },
        { id: "b", label: "Staff Dinner Schedule", feedback: "No.", correct: false },
        { id: "c", label: "Standard Desk Supply", feedback: "No.", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "If a required guard is missing on equipment:",
      explanation: "Stop and report — don’t operate unsafe equipment.",
      choices: [
        { id: "a", label: "Stop use and report the hazard", feedback: "Correct.", correct: true },
        { id: "b", label: "Use it carefully anyway", feedback: "Unsafe.", correct: false },
        { id: "c", label: "Remove other guards to match", feedback: "Makes it worse.", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "Near-miss reporting is valuable because:",
      explanation: "It reveals hazards before injuries occur.",
      choices: [
        { id: "a", label: "It reveals hazards before someone is hurt", feedback: "Correct.", correct: true },
        { id: "b", label: "It wastes time", feedback: "Prevention time is never wasted.", correct: false },
        { id: "c", label: "It only matters after hospitalization", feedback: "Too late.", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "PPE should be selected based on:",
      explanation: "Anticipated hazard/exposure for the task.",
      choices: [
        { id: "a", label: "The hazard and task", feedback: "Correct.", correct: true },
        { id: "b", label: "Whatever is closest in the drawer", feedback: "May be wrong protection.", correct: false },
        { id: "c", label: "Fashion preference", feedback: "No.", correct: false },
      ],
    },
  ]),
];

export const bloodborneChallenges: CourseChallenge[] = [
  scenario(
    "bbp-needlestick",
    "Scenario: Needlestick After Draw",
    "Exposure response speed and Standard Precautions judgment.",
    "start",
    [
      {
        id: "start",
        prompt: "During disposal you feel a needlestick. Immediate action?",
        choices: [
          {
            id: "hide",
            label: "Say nothing because you’re embarrassed",
            feedback: "Silent exposures delay prophylaxis and put you at risk.",
            correct: false,
            nextNodeId: "report",
          },
          {
            id: "wash-report",
            label: "Wash with soap/water, report immediately, seek evaluation pathway",
            feedback: "Correct exposure sequence.",
            correct: true,
            nextNodeId: "report",
          },
          {
            id: "squeeze-bleach",
            label: "Squeeze the wound hard and pour bleach into it",
            feedback: "Soap/water wash is appropriate; harsh chemicals can worsen tissue injury — follow occupational health guidance.",
            correct: false,
            nextNodeId: "report",
          },
        ],
      },
      {
        id: "report",
        prompt: "Who should know next?",
        choices: [
          {
            id: "social",
            label: "Only your social media followers",
            feedback: "Use official occupational health / supervisor channels.",
            correct: false,
            nextNodeId: null,
          },
          {
            id: "oh",
            label: "Supervisor/employee health (or ED pathway) per policy — same day",
            feedback: "Right. Speed matters for evaluation decisions.",
            correct: true,
            nextNodeId: null,
          },
          {
            id: "week",
            label: "Wait a week to see if you feel sick",
            feedback: "Too late for timely evaluation.",
            correct: false,
            nextNodeId: null,
          },
        ],
      },
    ]
  ),
  mastery("bbp-mastery", "Bloodborne Pathogens Mastery Gate", "Standard Precautions, sharps, and exposure response.", [
    {
      id: "q1",
      prompt: "Standard Precautions mean:",
      explanation: "Treat blood/specified body fluids as potentially infectious.",
      choices: [
        { id: "a", label: "Treat blood/specified fluids as potentially infectious", feedback: "Correct.", correct: true },
        { id: "b", label: "Only protect yourself if the patient “looks sick”", feedback: "Appearance is not a control strategy.", correct: false },
        { id: "c", label: "Gloves are optional for blood draws", feedback: "Use required PPE.", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "Sharps should be:",
      explanation: "Disposed immediately in puncture-resistant containers; no recapping habits.",
      choices: [
        { id: "a", label: "Disposed immediately in a sharps container", feedback: "Correct.", correct: true },
        { id: "b", label: "Left on the bed for environmental services", feedback: "Unsafe.", correct: false },
        { id: "c", label: "Recapped with two hands as routine", feedback: "High-risk habit.", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "After a splash to the eyes:",
      explanation: "Flush and report promptly.",
      choices: [
        { id: "a", label: "Flush with water/saline and report immediately", feedback: "Correct.", correct: true },
        { id: "b", label: "Ignore it if it stings only a little", feedback: "Report exposures.", correct: false },
        { id: "c", label: "Rub vigorously with a dry towel only", feedback: "Flush first.", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "Hepatitis B vaccination awareness matters because:",
      explanation: "It’s a key prevention tool for at-risk workers.",
      choices: [
        { id: "a", label: "It is a key prevention tool for at-risk staff", feedback: "Correct.", correct: true },
        { id: "b", label: "It replaces all PPE forever", feedback: "Still use precautions.", correct: false },
        { id: "c", label: "It is unrelated to occupational risk", feedback: "It is related.", correct: false },
      ],
    },
  ]),
];

export const opioidChallenges: CourseChallenge[] = [
  scenario(
    "opioid-bathroom",
    "Scenario: Unresponsive in the Restroom",
    "Recognize overdose, support breathing, naloxone timing, EMS handoff.",
    "start",
    [
      {
        id: "start",
        prompt: "A person is unresponsive in a restroom stall with slow/absent breathing and pinpoint pupils. First priorities?",
        choices: [
          {
            id: "selfie",
            label: "Film them for evidence before helping",
            feedback: "Care first. Activate help and support breathing.",
            correct: false,
            nextNodeId: "naloxone",
          },
          {
            id: "ems-airway",
            label: "Scene safety, call 9-1-1, open airway/support breathing, get naloxone/AED",
            feedback: "Correct chain.",
            correct: true,
            nextNodeId: "naloxone",
          },
          {
            id: "coffee",
            label: "Force coffee to wake them",
            feedback: "Not an overdose treatment.",
            correct: false,
            nextNodeId: "naloxone",
          },
        ],
      },
      {
        id: "naloxone",
        prompt: "Naloxone is available. What’s true?",
        choices: [
          {
            id: "replace",
            label: "Naloxone replaces the need for breathing support",
            feedback: "False — support breathing/CPR remain essential.",
            correct: false,
            nextNodeId: null,
          },
          {
            id: "both",
            label: "Give naloxone as trained/authorized and continue airway/breathing support + monitoring",
            feedback: "Correct. Naloxone can wear off before opioids do.",
            correct: true,
            nextNodeId: null,
          },
          {
            id: "one-and-done",
            label: "Give one dose and leave them alone outside",
            feedback: "Stay, reassess, hand off to EMS.",
            correct: false,
            nextNodeId: null,
          },
        ],
      },
    ]
  ),
  mastery("opioid-mastery", "Opioid Response Mastery Gate", "Recognition, naloxone integration, and post-reversal monitoring.", [
    {
      id: "q1",
      prompt: "Key overdose signs include:",
      explanation: "Unresponsiveness, slow/absent breathing, pinpoint pupils, cyanosis.",
      choices: [
        { id: "a", label: "Unresponsiveness + very slow/absent breathing", feedback: "Correct.", correct: true },
        { id: "b", label: "Loud talking and pacing only", feedback: "Not classic opioid OD.", correct: false },
        { id: "c", label: "High fever only", feedback: "Not the hallmark set.", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "After naloxone, you should:",
      explanation: "Monitor — effects may return as naloxone wears off.",
      choices: [
        { id: "a", label: "Monitor closely and expect possible recurrence", feedback: "Correct.", correct: true },
        { id: "b", label: "Assume they are fine forever", feedback: "Unsafe.", correct: false },
        { id: "c", label: "Encourage them to drive home immediately", feedback: "Dangerous.", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "If breathing is inadequate:",
      explanation: "Support ventilation/CPR per training; AED if indicated.",
      choices: [
        { id: "a", label: "Support breathing / start CPR as indicated", feedback: "Correct.", correct: true },
        { id: "b", label: "Wait silently for naloxone to work alone", feedback: "Support breathing now.", correct: false },
        { id: "c", label: "Use smelling salts only", feedback: "Not sufficient.", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "EMS handoff should include:",
      explanation: "Doses/times, breathing status, other substances if known.",
      choices: [
        { id: "a", label: "Naloxone doses/times and breathing status", feedback: "Correct.", correct: true },
        { id: "b", label: "Only their clothing brand", feedback: "Not useful.", correct: false },
        { id: "c", label: "Nothing — let EMS figure it out", feedback: "Good handoffs save time.", correct: false },
      ],
    },
  ]),
];

export const hemorrhageMastery: CourseChallenge = mastery(
  "hem-mastery",
  "Bleeding Control Mastery Gate",
  "Pressure, packing awareness, tourniquet timing, and handoff.",
  [
    {
      id: "q1",
      prompt: "Life-threatening bleeding may look like:",
      explanation: "Spurting, pooling, soaking clothes rapidly, amputation.",
      choices: [
        { id: "a", label: "Spurting/pooling/rapid soaking", feedback: "Correct.", correct: true },
        { id: "b", label: "A tiny scratch that already clotted", feedback: "Not life-threatening.", correct: false },
        { id: "c", label: "Dry skin only", feedback: "No.", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "Direct pressure should be:",
      explanation: "Firm and continuous — don’t keep lifting to check.",
      choices: [
        { id: "a", label: "Firm and continuous", feedback: "Correct.", correct: true },
        { id: "b", label: "Light dabbing every few seconds", feedback: "Ineffective.", correct: false },
        { id: "c", label: "Only with bare hands forever", feedback: "Use PPE/dressings when available.", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "Tourniquet application should include:",
      explanation: "High and tight, tighten until bleeding stops, note time.",
      choices: [
        { id: "a", label: "High/tight, stop the bleeding, note the time", feedback: "Correct.", correct: true },
        { id: "b", label: "Loose enough to stay comfortable", feedback: "Must stop life-threatening bleeding.", correct: false },
        { id: "c", label: "Hidden so EMS can’t find it", feedback: "Tell EMS and mark time.", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "Commercial tourniquets are:",
      explanation: "Preferred over thin improvised cords/wires.",
      choices: [
        { id: "a", label: "Preferred when available", feedback: "Correct.", correct: true },
        { id: "b", label: "Never useful", feedback: "They are first-line tools for severe limb bleeding.", correct: false },
        { id: "c", label: "Only for hospitals, never bystanders", feedback: "Trained responders/bystanders use them too.", correct: false },
      ],
    },
  ]
);
