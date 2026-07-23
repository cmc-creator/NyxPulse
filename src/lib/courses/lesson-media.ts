export interface LessonMedia {
  image: string;
  imageAlt: string;
  caption?: string;
}

/**
 * Optional educational illustrations keyed by `courseSlug::topicTitle`.
 * These are AI-generated study aids — not a substitute for skills practice.
 */
const lessonMedia: Record<string, LessonMedia> = {
  "cpr-aed::Hand position and compression depth": {
    image: "/course-media/cpr-hand-position.png",
    imageAlt: "Diagram of stacked hands on the center of an adult chest for CPR compressions",
    caption: "Place the heel of one hand on the center of the chest; compress at least 2 inches.",
  },
  "cpr-aed::When to use an AED": {
    image: "/course-media/aed-pad-placement.png",
    imageAlt: "Diagram of adult AED pad placement on the upper right chest and lower left side",
    caption: "Apply an AED as soon as it is available for an unresponsive person who is not breathing normally.",
  },
  "cpr-aed::Recovery position and ongoing monitoring": {
    image: "/course-media/recovery-position.png",
    imageAlt: "Diagram of a person lying on their side in the recovery position with an open airway",
    caption: "Use the recovery position when a person is breathing adequately but remains unresponsive.",
  },
  "first-aid::Life-threatening bleeding control": {
    image: "/course-media/bleeding-direct-pressure.png",
    imageAlt: "Diagram of a gloved hand applying firm continuous pressure with a dressing",
    caption: "For life-threatening bleeding, start firm continuous pressure immediately and get help.",
  },
  "bls::Adult high-quality compressions": {
    image: "/course-media/cpr-hand-position.png",
    imageAlt: "Diagram of stacked hands on the center of an adult chest for high-quality CPR",
    caption: "Depth, rate, recoil, and minimal interruptions define high-performance CPR.",
  },
  "bls::AED and defibrillator workflow": {
    image: "/course-media/aed-pad-placement.png",
    imageAlt: "Diagram of adult AED pad placement for defibrillator workflow",
    caption: "Pads on, clear for analysis/shock, resume compressions immediately afterward.",
  },
  "hemorrhage-control::High-quality direct pressure": {
    image: "/course-media/bleeding-direct-pressure.png",
    imageAlt: "Diagram of a gloved hand applying firm continuous pressure with a dressing on an arm",
    caption: "Expose the wound and apply firm continuous pressure — do not keep lifting the dressing to check.",
  },
  "hemorrhage-control::Tourniquet placement and tightening": {
    image: "/course-media/tourniquet-placement.png",
    imageAlt: "Diagram of a commercial tourniquet placed high on a thigh with a note-the-time reminder",
    caption: "Place high and tight on the limb, tighten until bleeding stops, and note the time.",
  },
  "opioid-overdose-response::Signs of opioid overdose": {
    image: "/course-media/opioid-response-steps.png",
    imageAlt: "Four-step opioid overdose response sequence: recognize, call 911, support breathing, give naloxone",
    caption: "Recognize → call 9-1-1 → support breathing → naloxone when available/authorized.",
  },
  "opioid-overdose-response::Scene safety and EMS activation": {
    image: "/course-media/opioid-response-steps.png",
    imageAlt: "Four-step opioid overdose response sequence infographic",
  },
  "active-shooter-preparedness::Decision framework: escape, hide, defend": {
    image: "/course-media/escape-hide-defend.png",
    imageAlt: "Three-panel preparedness framework showing Escape, Hide, and Defend as a last resort",
    caption: "Escape if you can. Hide if you cannot. Defend only as a last resort. Follow your facility plan and law enforcement.",
  },
  "active-shooter-preparedness::Hide / secure-in-place well": {
    image: "/course-media/hide-secure-in-place.png",
    imageAlt: "Room diagram showing lock or barricade, lights off, out of sight, and silenced phones",
    caption: "Lock/barricade, lights off, silence phones, stay out of sight, wait for clear law-enforcement instructions.",
  },
  "workplace-violence-prevention::Warning signs and escalating behavior": {
    image: "/course-media/wpv-warning-signs.png",
    imageAlt: "Infographic of workplace violence warning signs including clenched fists, pacing, and invading space",
    caption: "Share observations early — before a security call is the only option.",
  },
  "de-escalation::Warning signs of impending violence": {
    image: "/course-media/wpv-warning-signs.png",
    imageAlt: "Infographic of warning signs of impending workplace violence",
  },
  "de-escalation::Trauma-informed approach": {
    image: "/course-media/de-escalation-space.png",
    imageAlt: "Diagram of a calm open stance with space between a caregiver and an agitated person",
    caption: "Give space, keep hands visible, and use a calm angled stance when safe to do so.",
  },
  "bloodborne-pathogens::Standard Precautions": {
    image: "/course-media/ppe-standard-precautions.png",
    imageAlt: "Diagram of gloves, eye protection, mask, and gown for Standard Precautions",
    caption: "Match PPE to the anticipated exposure — treat blood and specified body fluids as potentially infectious.",
  },
  "bloodborne-pathogens::Choosing gloves, masks, eye protection, and gowns": {
    image: "/course-media/ppe-standard-precautions.png",
    imageAlt: "PPE selection diagram for gloves, eye protection, mask, and gown",
  },
  "osha-safety::Selecting and using PPE": {
    image: "/course-media/ppe-standard-precautions.png",
    imageAlt: "PPE selection diagram for gloves, eye protection, mask, and gown",
  },
  "osha-safety::Bloodborne pathogens overview": {
    image: "/course-media/ppe-standard-precautions.png",
    imageAlt: "PPE and Standard Precautions overview diagram for bloodborne pathogens awareness",
  },
  "ics-hics::Command, operations, planning, logistics, finance/admin": {
    image: "/course-media/ics-command-structure.png",
    imageAlt: "ICS organization chart with Incident Commander and Operations, Planning, Logistics, Finance sections",
    caption: "Know the command structure used in your facility’s emergency plan.",
  },
  "ics-hics::HICS organizational chart essentials": {
    image: "/course-media/ics-command-structure.png",
    imageAlt: "ICS / HICS organization chart showing command and general staff sections",
  },
};

export function getLessonMedia(
  courseSlug: string,
  topicTitle: string
): LessonMedia | undefined {
  return lessonMedia[`${courseSlug}::${topicTitle}`];
}

export function courseHasLessonMedia(courseSlug: string): boolean {
  const prefix = `${courseSlug}::`;
  return Object.keys(lessonMedia).some((key) => key.startsWith(prefix));
}
