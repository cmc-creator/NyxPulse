import type { CourseChallenge } from "@/lib/challenges/types";
import {
  bloodborneChallenges,
  emergencyManagementChallenges,
  firstAidChallenges,
  hemorrhageMastery,
  icsChallenges,
  opioidChallenges,
  oshaChallenges,
} from "@/lib/challenges/extra-catalog";

const cprChallenges: CourseChallenge[] = [
  {
    id: "cpr-lobby-collapse",
    title: "Scenario: Collapse in the Lobby",
    kind: "scenario",
    brief:
      "A visitor collapses near the front desk. Make the same decisions you’d make in the first 90 seconds — NyxPulse scores judgment, not memorization.",
    passScore: 75,
    scenario: {
      startNodeId: "scene",
      nodes: [
        {
          id: "scene",
          prompt: "You hear a thud. An adult is on the floor, unresponsive. What is your first move?",
          context: "Lobby · business hours · AED cabinet 40 feet away · two coworkers nearby",
          choices: [
            {
              id: "rush-cpr",
              label: "Start chest compressions immediately without checking the scene",
              feedback: "Speed matters — but an unsafe scene can create a second victim. Pause for a 2-second hazard check.",
              correct: false,
              nextNodeId: "assess",
            },
            {
              id: "check-scene",
              label: "Scan for hazards, then check responsiveness and breathing",
              feedback: "Correct. Scene safety first, then confirm cardiac arrest cues before you commit the team.",
              correct: true,
              nextNodeId: "assess",
            },
            {
              id: "wait-ems",
              label: "Wait for EMS before touching the person",
              feedback: "Waiting costs critical minutes. High-quality CPR and an AED before EMS arrives save lives.",
              correct: false,
              nextNodeId: "assess",
            },
          ],
        },
        {
          id: "assess",
          prompt: "The person is unresponsive and not breathing normally (gasping). What next?",
          choices: [
            {
              id: "call-aed",
              label: "Send one person to call 9-1-1 and another to get the AED, then begin CPR",
              feedback: "Perfect closed-loop activation. Assign people by name so tasks don’t bounce.",
              correct: true,
              nextNodeId: "aed",
            },
            {
              id: "alone-phone",
              label: "Leave them alone while you go find a phone",
              feedback: "Don’t abandon the patient if others can activate EMS/AED. If truly alone, call first for adult collapse, then CPR.",
              correct: false,
              nextNodeId: "aed",
            },
            {
              id: "water",
              label: "Splash water on their face to wake them",
              feedback: "That delays care. Treat as cardiac arrest and start the chain of survival.",
              correct: false,
              nextNodeId: "aed",
            },
          ],
        },
        {
          id: "aed",
          prompt: "The AED arrives. Compressions are ongoing. What’s the highest-value action?",
          choices: [
            {
              id: "stop-long",
              label: "Stop CPR for a full minute while you read the AED manual",
              feedback: "Minimize interruptions. Power on, bare the chest, place pads, resume compressions while it analyzes when prompted.",
              correct: false,
              nextNodeId: null,
            },
            {
              id: "pads-clear",
              label: "Power on AED, place pads, clear for analysis/shock, resume CPR immediately after",
              feedback: "That’s high-performance resuscitation — pads fast, clear voice, compressions back on without delay.",
              correct: true,
              nextNodeId: null,
            },
            {
              id: "shock-wet",
              label: "Shock while a coworker is still touching the patient",
              feedback: "Never. Clear the patient fully before every analysis and shock.",
              correct: false,
              nextNodeId: null,
            },
          ],
        },
      ],
    },
  },
  {
    id: "cpr-mastery",
    title: "CPR Mastery Gate",
    kind: "mastery-quiz",
    brief: "Pass this gate to prove decision-ready CPR knowledge before claiming your NyxPulse certificate.",
    passScore: 80,
    questions: [
      {
        id: "q1",
        prompt: "Target adult compression rate?",
        explanation: "100–120 compressions per minute with full recoil.",
        choices: [
          { id: "a", label: "60–80/min", feedback: "Too slow for high-quality CPR.", correct: false },
          { id: "b", label: "100–120/min", feedback: "Correct.", correct: true },
          { id: "c", label: "140–160/min", feedback: "Too fast — quality and recoil suffer.", correct: false },
        ],
      },
      {
        id: "q2",
        prompt: "Adult compression depth target?",
        explanation: "At least 2 inches (5 cm) for adults.",
        choices: [
          { id: "a", label: "About 1 inch", feedback: "Too shallow.", correct: false },
          { id: "b", label: "At least 2 inches", feedback: "Correct.", correct: true },
          { id: "c", label: "4–5 inches", feedback: "Excessive depth risks injury.", correct: false },
        ],
      },
      {
        id: "q3",
        prompt: "When should you apply an AED?",
        explanation: "As soon as available for an unresponsive person not breathing normally.",
        choices: [
          { id: "a", label: "Only after 10 minutes of CPR", feedback: "Early defibrillation is critical.", correct: false },
          { id: "b", label: "As soon as it is available", feedback: "Correct.", correct: true },
          { id: "c", label: "Only if a physician is present", feedback: "AEDs are designed for trained rescuers on scene.", correct: false },
        ],
      },
      {
        id: "q4",
        prompt: "Best single-rescuer adult CPR ratio?",
        explanation: "30 compressions and 2 breaths for single-rescuer adult CPR.",
        choices: [
          { id: "a", label: "15:2", feedback: "Not the standard single-rescuer adult ratio.", correct: false },
          { id: "b", label: "30:2", feedback: "Correct.", correct: true },
          { id: "c", label: "5:1", feedback: "Outdated / incorrect for this context.", correct: false },
        ],
      },
      {
        id: "q5",
        prompt: "After a shock is delivered, you should:",
        explanation: "Resume compressions immediately; do not pause to check for a pulse right away.",
        choices: [
          { id: "a", label: "Check pulse for 30 seconds before touching the patient", feedback: "That creates a dangerous pause.", correct: false },
          { id: "b", label: "Resume high-quality CPR immediately", feedback: "Correct.", correct: true },
          { id: "c", label: "Turn the AED off", feedback: "Keep the AED attached and follow prompts.", correct: false },
        ],
      },
    ],
  },
];

const activeShooterChallenges: CourseChallenge[] = [
  {
    id: "as-clinic-threat",
    title: "Scenario: Armed Intruder in Clinic Wing",
    kind: "scenario",
    brief:
      "Unique to NyxPulse: healthcare-constrained decision trees. You can’t always evacuate patients — choose Escape / Hide / Defend with clinical reality in mind.",
    passScore: 75,
    scenario: {
      startNodeId: "gunfire",
      nodes: [
        {
          id: "gunfire",
          prompt: "You hear gunfire down the hall. Your exam room has one ambulatory patient and one in a wheelchair. Door opens to the hallway toward the sound.",
          choices: [
            {
              id: "investigate",
              label: "Step into the hallway to see what’s happening",
              feedback: "Don’t investigate gunfire. Move to protective action immediately.",
              correct: false,
              nextNodeId: "next",
            },
            {
              id: "escape-able",
              label: "Escape with the ambulatory patient away from the sound; shelter the wheelchair patient if escape isn’t possible",
              feedback: "Strong healthcare judgment: evacuate who you can, secure-in-place when you can’t move someone safely.",
              correct: true,
              nextNodeId: "next",
            },
            {
              id: "freeze",
              label: "Freeze and wait for overhead instructions only",
              feedback: "Use your senses now. Alerts help, but delay can be lethal if the threat is close.",
              correct: false,
              nextNodeId: "next",
            },
          ],
        },
        {
          id: "next",
          prompt: "Escape isn’t safe. You’re sheltering in a room with a solid door. What matters most?",
          choices: [
            {
              id: "hide-well",
              label: "Lock/barricade, lights off, silence phones, stay out of sight, wait for LE commands",
              feedback: "That’s a high-quality hide. Do not open for unknown voices.",
              correct: true,
              nextNodeId: "le",
            },
            {
              id: "livestream",
              label: "Livestream the hallway to social media for awareness",
              feedback: "Don’t expose your location or spread chaos. Call 9-1-1 with facts if you can do so safely.",
              correct: false,
              nextNodeId: "le",
            },
            {
              id: "open-door",
              label: "Open the door when someone yells “maintenance”",
              feedback: "Only open for verified law enforcement instructions you can confirm.",
              correct: false,
              nextNodeId: "le",
            },
          ],
        },
        {
          id: "le",
          prompt: "Officers enter the unit with weapons drawn. You are still in the room. Best action?",
          choices: [
            {
              id: "point",
              label: "Run toward them pointing and yelling directions while holding your phone",
              feedback: "Hands empty and visible. Follow commands. Short location info only when asked.",
              correct: false,
              nextNodeId: null,
            },
            {
              id: "comply",
              label: "Show empty hands, follow commands immediately, give short location info if asked",
              feedback: "Correct. Officers stop the threat first — comply and communicate clearly.",
              correct: true,
              nextNodeId: null,
            },
            {
              id: "grab",
              label: "Grab an officer’s arm to guide them faster",
              feedback: "Never grab responding officers.",
              correct: false,
              nextNodeId: null,
            },
          ],
        },
      ],
    },
  },
  {
    id: "as-mastery",
    title: "Threat Preparedness Mastery Gate",
    kind: "mastery-quiz",
    brief: "Prove you can apply Escape / Hide / Defend as a last resort — including healthcare constraints.",
    passScore: 80,
    questions: [
      {
        id: "q1",
        prompt: "Primary decision framework taught in this course?",
        explanation: "Escape if you can, hide if you can’t, defend only as last resort.",
        choices: [
          { id: "a", label: "Escape → Hide → Defend (last resort)", feedback: "Correct.", correct: true },
          { id: "b", label: "Always charge the attacker first", feedback: "Defend is last resort only.", correct: false },
          { id: "c", label: "Wait in place for a perfect announcement", feedback: "Act on what you hear/see.", correct: false },
        ],
      },
      {
        id: "q2",
        prompt: "When law enforcement arrives, you should:",
        explanation: "Hands visible, follow commands, expect them to pass injured people while stopping the threat.",
        choices: [
          { id: "a", label: "Keep hands empty/visible and follow commands", feedback: "Correct.", correct: true },
          { id: "b", label: "Hug the first officer you see", feedback: "Unsafe and confusing under stress.", correct: false },
          { id: "c", label: "Demand they treat patients before clearing the threat", feedback: "Threat stop comes first.", correct: false },
        ],
      },
      {
        id: "q3",
        prompt: "Healthcare-specific truth?",
        explanation: "Some patients cannot evacuate; shelter-in-place and role clarity matter.",
        choices: [
          { id: "a", label: "Every patient can always be evacuated instantly", feedback: "Not true for critical/immobile patients.", correct: false },
          { id: "b", label: "Immobile patients may require shelter-in-place while others evacuate", feedback: "Correct.", correct: true },
          { id: "c", label: "Clinical staff should ignore facility plans", feedback: "Follow your emergency plan.", correct: false },
        ],
      },
      {
        id: "q4",
        prompt: "This NyxPulse course authorizes you to:",
        explanation: "It is preparedness education, not firearms/tactical operator training.",
        choices: [
          { id: "a", label: "Carry a firearm at work automatically", feedback: "No — follow law and policy.", correct: false },
          { id: "b", label: "Make faster protective decisions within your role and policy", feedback: "Correct.", correct: true },
          { id: "c", label: "Ignore law enforcement orders", feedback: "Never.", correct: false },
        ],
      },
    ],
  },
];

const deescalationChallenges: CourseChallenge[] = [
  {
    id: "de-triage-agitation",
    title: "Scenario: Escalating Visitor at Triage",
    kind: "scenario",
    brief:
      "NyxPulse scores verbal judo under pressure — space, tone, and timing — not movie-style takedowns.",
    passScore: 75,
    scenario: {
      startNodeId: "start",
      nodes: [
        {
          id: "start",
          prompt: "A visitor is pacing, voice rising: “You’ve ignored us for two hours!” Hands clenched. What’s your best first move?",
          choices: [
            {
              id: "match",
              label: "Match their volume so they know you’re serious",
              feedback: "Matching volume usually fuels the fire. Lower your tone and slow your pace.",
              correct: false,
              nextNodeId: "space",
            },
            {
              id: "space-empathy",
              label: "Increase space, angled stance, acknowledge the wait, offer a next step",
              feedback: "Excellent. Presence + empathy + a concrete next step reduces threat physiology.",
              correct: true,
              nextNodeId: "space",
            },
            {
              id: "threat",
              label: "Threaten security immediately as the first words out of your mouth",
              feedback: "Security may be needed — but opening with a threat often accelerates escalation.",
              correct: false,
              nextNodeId: "space",
            },
          ],
        },
        {
          id: "space",
          prompt: "They step closer into your space and jab a finger toward you. Safest response?",
          choices: [
            {
              id: "corner",
              label: "Step backward into a corner so you’re closer to the wall phone",
              feedback: "Don’t trap yourself. Move laterally toward an exit/help and keep an exit path.",
              correct: false,
              nextNodeId: "end",
            },
            {
              id: "boundary",
              label: "Calm boundary + create distance + call for support if still advancing",
              feedback: "Right mix of dignity and safety. Boundaries can be firm without humiliation.",
              correct: true,
              nextNodeId: "end",
            },
            {
              id: "grab",
              label: "Grab their wrist to control the pointing hand",
              feedback: "Physical control is last resort and role/training dependent — not a first verbal-de-escalation move.",
              correct: false,
              nextNodeId: "end",
            },
          ],
        },
        {
          id: "end",
          prompt: "They begin to calm but are still angry. Closing move?",
          choices: [
            {
              id: "lecture",
              label: "Lecture them about hospital policy for two minutes",
              feedback: "Keep it short. Confirm the plan and disengage while the window is good.",
              correct: false,
              nextNodeId: null,
            },
            {
              id: "plan",
              label: "Confirm the agreed next step, thank them for working with you, and exit the power struggle",
              feedback: "Clean close. You protected dignity and moved the process forward.",
              correct: true,
              nextNodeId: null,
            },
            {
              id: "sarcasm",
              label: "Add sarcasm to show you weren’t intimidated",
              feedback: "Sarcasm restarts escalation.",
              correct: false,
              nextNodeId: null,
            },
          ],
        },
      ],
    },
  },
  {
    id: "de-mastery",
    title: "De-escalation Mastery Gate",
    kind: "mastery-quiz",
    brief: "Show you can choose presence, language, and escalation thresholds under stress.",
    passScore: 80,
    questions: [
      {
        id: "q1",
        prompt: "Best early stance with an agitated person?",
        explanation: "Angled body, open hands visible, adequate distance.",
        choices: [
          { id: "a", label: "Chest-to-chest, close enough to whisper", feedback: "Too close / confrontational.", correct: false },
          { id: "b", label: "Angled stance, hands visible, give space", feedback: "Correct.", correct: true },
          { id: "c", label: "Arms crossed, blocking the doorway", feedback: "Reads as hostile and trapping.", correct: false },
        ],
      },
      {
        id: "q2",
        prompt: "Trauma-informed communication favors:",
        explanation: "Choices, clear explanations, no surprise touch.",
        choices: [
          { id: "a", label: "Surprise touch to reassure", feedback: "Avoid surprising touch.", correct: false },
          { id: "b", label: "Offer choices when possible and explain actions", feedback: "Correct.", correct: true },
          { id: "c", label: "Argue about delusions until they agree", feedback: "Don’t debate delusions.", correct: false },
        ],
      },
      {
        id: "q3",
        prompt: "When is calling security/code appropriate?",
        explanation: "When safety is threatened or escalation continues despite verbal strategies.",
        choices: [
          { id: "a", label: "Only after someone is already injured", feedback: "Call earlier when danger is rising.", correct: false },
          { id: "b", label: "When warning signs persist or safety is at risk", feedback: "Correct.", correct: true },
          { id: "c", label: "Never — it always makes things worse", feedback: "Support is part of the plan.", correct: false },
        ],
      },
      {
        id: "q4",
        prompt: "After a near-miss workplace violence event you should:",
        explanation: "Report, support staff, and improve controls — silence hides risk.",
        choices: [
          { id: "a", label: "Stay quiet so nobody gets in trouble", feedback: "Under-reporting hides patterns.", correct: false },
          { id: "b", label: "Report, document, and access support resources", feedback: "Correct.", correct: true },
          { id: "c", label: "Post details publicly online", feedback: "Follow privacy and policy.", correct: false },
        ],
      },
    ],
  },
];

const hemorrhageChallenges: CourseChallenge[] = [
  {
    id: "hem-parking-lot",
    title: "Scenario: Arterial Bleed in the Parking Lot",
    kind: "scenario",
    brief: "Life-threatening bleeding decisions under time pressure — pressure first, tourniquet when needed, clean EMS handoff.",
    passScore: 75,
    scenario: {
      startNodeId: "start",
      nodes: [
        {
          id: "start",
          prompt: "A motorcyclist has bright blood spurting from a thigh wound. They’re awake and screaming. First action?",
          choices: [
            {
              id: "photo",
              label: "Take a photo for EMS before touching anything",
              feedback: "Care first. Photos can wait.",
              correct: false,
              nextNodeId: "pressure",
            },
            {
              id: "glove-pressure",
              label: "Scene safety/PPE as available, expose, apply firm continuous direct pressure, send someone for 9-1-1/kit",
              feedback: "Correct sequence: safety, pressure, help/equipment.",
              correct: true,
              nextNodeId: "pressure",
            },
            {
              id: "ice",
              label: "Pack the wound with ice from a cooler",
              feedback: "Ice is not the priority for spurting hemorrhage.",
              correct: false,
              nextNodeId: "pressure",
            },
          ],
        },
        {
          id: "pressure",
          prompt: "Blood soaks through and continues spurting despite strong pressure. Next?",
          choices: [
            {
              id: "tq",
              label: "Apply a tourniquet high and tight, note the time, keep pressure strategies as trained",
              feedback: "Right call for uncontrolled limb hemorrhage.",
              correct: true,
              nextNodeId: "handoff",
            },
            {
              id: "loosen",
              label: "Loosen everything to check if bleeding slowed",
              feedback: "Don’t create on/off interruptions for true life-threatening bleeding.",
              correct: false,
              nextNodeId: "handoff",
            },
            {
              id: "walk",
              label: "Have them walk to the ambulance bay to meet EMS",
              feedback: "Keep them down, warm, and controlled — don’t worsen shock.",
              correct: false,
              nextNodeId: "handoff",
            },
          ],
        },
        {
          id: "handoff",
          prompt: "EMS arrives. Highest-value handoff info?",
          choices: [
            {
              id: "story",
              label: "A long story about the motorcycle brand",
              feedback: "Lead with clinical facts.",
              correct: false,
              nextNodeId: null,
            },
            {
              id: "facts",
              label: "Wound location, what you applied, tourniquet time, mental status/breathing changes",
              feedback: "That’s an elite field handoff.",
              correct: true,
              nextNodeId: null,
            },
            {
              id: "remove-tq",
              label: "Remove the tourniquet so EMS can see the wound clearly",
              feedback: "Don’t remove a necessary tourniquet casually.",
              correct: false,
              nextNodeId: null,
            },
          ],
        },
      ],
    },
  },
];

const challengeCatalog: Record<string, CourseChallenge[]> = {
  "cpr-aed": cprChallenges,
  bls: cprChallenges,
  "first-aid": firstAidChallenges,
  "active-shooter-preparedness": activeShooterChallenges,
  "de-escalation": deescalationChallenges,
  "workplace-violence-prevention": deescalationChallenges,
  "hemorrhage-control": [...hemorrhageChallenges, hemorrhageMastery],
  "emergency-management-healthcare": emergencyManagementChallenges,
  "ics-hics": icsChallenges,
  "osha-safety": oshaChallenges,
  "bloodborne-pathogens": bloodborneChallenges,
  "opioid-overdose-response": opioidChallenges,
};

export function getChallengesForCourse(courseSlug: string): CourseChallenge[] {
  return challengeCatalog[courseSlug] ?? [];
}

export function getChallenge(courseSlug: string, challengeId: string): CourseChallenge | undefined {
  return getChallengesForCourse(courseSlug).find((c) => c.id === challengeId);
}

export function coursesWithChallenges(): string[] {
  return Object.keys(challengeCatalog);
}
