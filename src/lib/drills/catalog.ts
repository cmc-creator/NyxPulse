import type { DrillTemplate } from "@/lib/drills/types";

export const drillTemplates: DrillTemplate[] = [
  {
    id: "code-blue-medsurg",
    title: "Code Blue — Med-Surg Corridor",
    category: "Resuscitation",
    durationMinutes: 12,
    summary:
      "Timed team drill for adult cardiac arrest recognition, role clarity, AED arrival, and closed-loop communication.",
    objectives: [
      "Recognize arrest cues within 15 seconds",
      "Assign compressor/AED/airway roles aloud",
      "Place AED pads with minimal interruption",
      "Deliver a clean 30-second EMS/code-team handoff",
    ],
    roles: [
      { id: "clinical-lead", label: "Clinical Lead", mission: "Run the bedside priorities and rotate compressors." },
      { id: "operations", label: "Compressor 1", mission: "High-quality compressions; call for relief before fatigue." },
      { id: "runner", label: "AED/Runner", mission: "Fetch AED/cart and set pads fast." },
      { id: "communications", label: "Activator", mission: "Call code/EMS and give location clearly." },
      { id: "scribe", label: "Scribe", mission: "Timestamp shocks, role changes, and key events." },
    ],
    injects: [
      { atSecond: 20, title: "Gasping noted", detail: "Bystander says “they’re still breathing a little.” Lead must recognize agonal breathing." },
      { atSecond: 90, title: "AED on scene", detail: "Pads available. Minimize pause; clear for analysis." },
      { atSecond: 240, title: "Family arrives", detail: "Anxious family member enters scene. Assign someone to guide them away safely." },
      { atSecond: 480, title: "Code team arrives", detail: "Give a 20–30 second handoff: down time, shocks, roles, current status." },
    ],
    afterActionPrompts: [
      "Where did role clarity break?",
      "How long were compressions interrupted?",
      "What will you change on the next real code?",
    ],
  },
  {
    id: "active-threat-clinic",
    title: "Active Threat — Clinic Pod",
    category: "Threat Preparedness",
    durationMinutes: 10,
    summary:
      "Escape/Hide/Defend decision drill with immobile patient constraints and law-enforcement arrival.",
    objectives: [
      "Choose Escape vs Hide correctly by proximity/exits",
      "Barricade + silence + out-of-sight hide quality",
      "Protect ambulatory vs non-ambulatory patients differently",
      "Comply with LE arrival (hands visible, short info)",
    ],
    roles: [
      { id: "incident-commander", label: "Pod Lead", mission: "Call the Escape/Hide decision and keep accountability." },
      { id: "clinical-lead", label: "Clinician", mission: "Manage immobile patient shelter-in-place needs." },
      { id: "security", label: "Security Liaison", mission: "Door status, exits, and LE handoff language." },
      { id: "communications", label: "911 Caller", mission: "Location, sounds heard, victim estimates if safe." },
      { id: "scribe", label: "Scribe", mission: "Log decisions and times for after-action." },
    ],
    injects: [
      { atSecond: 15, title: "Shots heard east hallway", detail: "Sound is closer to Exit B. Re-evaluate escape route." },
      { atSecond: 70, title: "Wheelchair patient", detail: "Cannot evacuate quickly. Decide who shelters-in-place." },
      { atSecond: 180, title: "Unknown voice at door", detail: "Someone claims to be “maintenance.” Do not open." },
      { atSecond: 420, title: "LE entry", detail: "Officers enter with weapons drawn. Hands empty/visible; follow commands." },
    ],
    afterActionPrompts: [
      "Did anyone investigate toward gunfire?",
      "Was the hide room actually hardened?",
      "What patient-movement rule will you adopt?",
    ],
  },
  {
    id: "workplace-violence-triage",
    title: "Workplace Violence — Triage Desk",
    category: "Behavioral Safety",
    durationMinutes: 8,
    summary:
      "De-escalation under time pressure with security activation thresholds and post-incident reporting.",
    objectives: [
      "Use space/angle/tone in the first 20 seconds",
      "Set a calm boundary when space is invaded",
      "Activate security before injury occurs",
      "Complete a near-miss/event report pathway",
    ],
    roles: [
      { id: "clinical-lead", label: "Triage RN", mission: "Lead verbal de-escalation and safety decisions." },
      { id: "security", label: "Security", mission: "Stage appropriately; intervene when called." },
      { id: "communications", label: "Desk Partner", mission: "Call for help / document witnesses." },
      { id: "scribe", label: "Scribe", mission: "Capture warning signs and timestamps." },
    ],
    injects: [
      { atSecond: 10, title: "Voice rising", detail: "Visitor pacing, clenched fists, invading desk space." },
      { atSecond: 60, title: "Finger jab", detail: "They step into personal space. Boundary + distance now." },
      { atSecond: 150, title: "Threat language", detail: "“Someone’s going to get hurt.” Activate security/code pathway." },
      { atSecond: 300, title: "De-escalated", detail: "They sit. Close with a plan and report the near-miss." },
    ],
    afterActionPrompts: [
      "Did anyone corner themselves?",
      "Was security called early enough?",
      "What environmental control is missing at triage?",
    ],
  },
  {
    id: "hics-command-surge",
    title: "HICS — Surge Command Stand-up",
    category: "Emergency Command",
    durationMinutes: 15,
    summary:
      "Stand up a mini Hospital Command Center: objectives, sections, resource requests, public message discipline.",
    objectives: [
      "State 1–3 incident objectives in plain language",
      "Assign Operations/Planning/Logistics roles",
      "Route resource requests through logistics",
      "Publish one approved status message",
    ],
    roles: [
      { id: "incident-commander", label: "Incident Commander", mission: "Set objectives and approve message." },
      { id: "operations", label: "Operations Section", mission: "Manage patient-care/operational actions." },
      { id: "communications", label: "Liaison/PIO", mission: "Craft one approved update; kill rumors." },
      { id: "runner", label: "Logistics", mission: "Track requests: beds, staff, supplies, transport." },
      { id: "scribe", label: "Planning/Scribe", mission: "Maintain status board and timeline." },
    ],
    injects: [
      { atSecond: 30, title: "Census spike", detail: "ED wait times exceed 4 hours. Set an objective." },
      { atSecond: 180, title: "Supply ask", detail: "Three units text different managers for the same ventilators." },
      { atSecond: 420, title: "Rumor", detail: "Staff say the hospital is diverting all EMS permanently." },
      { atSecond: 720, title: "Executive ask", detail: "Leadership wants a 60-second status. Use objectives + risks + needs." },
    ],
    afterActionPrompts: [
      "Were objectives clear enough to act on?",
      "Did resource requests duplicate?",
      "Was there a single source of truth for messaging?",
    ],
  },
];

export function getDrillTemplate(id: string) {
  return drillTemplates.find((t) => t.id === id);
}
