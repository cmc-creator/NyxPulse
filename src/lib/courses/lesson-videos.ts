export interface LessonVideo {
  /** YouTube video id on the official American Red Cross channel. */
  youtubeId: string;
  /** Exact video title as published by the American Red Cross. */
  title: string;
  /** Short note on how the video relates to the lesson topic. */
  caption?: string;
}

/**
 * Official American Red Cross training videos, embedded from the
 * American Red Cross YouTube channel (youtube.com/@AmericanRedCross).
 *
 * Every id below was verified against YouTube oEmbed to confirm the
 * uploader is "American Red Cross" — do not add videos from other
 * channels (AHA, hospitals, etc.) to this registry.
 */
const arcVideos = {
  handsOnlyCpr: {
    youtubeId: "6eRwgM2Pa4o",
    title: "How to Perform Hands-Only CPR",
    caption:
      "Check, call, care: an American Red Cross instructor demonstrates compression-only CPR from recognizing the emergency through continuous compressions.",
  },
  compressionOnlyCpr: {
    youtubeId: "VZqG-tcZvfE",
    title: "How to do Compression-Only CPR",
    caption:
      "Watch correct kneeling position, hand placement, at-least-2-inch depth, and the 100–120/min rhythm demonstrated on a manikin.",
  },
  aedAdult: {
    youtubeId: "in8j2Q2z3HE",
    title: "How to Use an AED on an Adult",
    caption:
      "Turn it on and follow the prompts: bare and dry the chest, place adult pads, clear for analysis and shock, then resume CPR immediately.",
  },
  aedChildInfant: {
    youtubeId: "yp5gjJa2FxA",
    title: "How to use an AED on Children and Infants",
    caption:
      "Pediatric pad selection and placement, including the front/back placement always used for infants.",
  },
  adultChokingResponsive: {
    youtubeId: "8R3RWC-xx1I",
    title: "What to Do When an Adult is Choking (Responsive)",
    caption:
      "Sets of 5 back blows and 5 abdominal thrusts, plus chest thrusts for people who are pregnant, in a wheelchair, or too large to reach around.",
  },
  adultChokingUnresponsive: {
    youtubeId: "9pTnepZd5as",
    title: "What to Do When an Adult is Choking (Unresponsive)",
    caption:
      "Lower the person to a firm, flat surface, start CPR with compressions, and look in the mouth before each set of breaths — never blind-sweep.",
  },
  infantChokingResponsive: {
    youtubeId: "ShaNuST_58A",
    title: "What to Do When Infant is Choking (Responsive)",
    caption:
      "Support the head and neck while alternating 5 firm back blows with 5 two-finger chest thrusts about 1½ inches deep.",
  },
  infantChokingUnresponsive: {
    youtubeId: "NF9oSpXt19c",
    title: "What to Do When an Infant is Choking (Unresponsive)",
    caption:
      "CPR for an unresponsive choking infant using the encircling-thumbs compression technique and a pinky finger sweep only when an object is visible.",
  },
} satisfies Record<string, LessonVideo>;

/**
 * Lesson videos keyed by `courseSlug::topicTitle`, mirroring lesson-media.
 * The same video may back several closely related topics.
 */
const lessonVideos: Record<string, LessonVideo> = {
  // Adult & Pediatric CPR/AED — primary focus
  "cpr-aed::Emergency action steps": arcVideos.handsOnlyCpr,
  "cpr-aed::Hand position and compression depth": arcVideos.compressionOnlyCpr,
  "cpr-aed::Compression rate and minimizing interruptions": arcVideos.compressionOnlyCpr,
  "cpr-aed::When to use an AED": arcVideos.aedAdult,
  "cpr-aed::Pad placement and preparation": arcVideos.aedAdult,
  "cpr-aed::Clearing for analysis and shock": arcVideos.aedAdult,
  "cpr-aed::Pediatric AED considerations": arcVideos.aedChildInfant,
  "cpr-aed::Two-finger / two-thumb compressions": arcVideos.infantChokingUnresponsive,
  "cpr-aed::Conscious infant choking (back blows & chest thrusts)": arcVideos.infantChokingResponsive,
  "cpr-aed::Conscious adult/child choking (abdominal thrusts)": arcVideos.adultChokingResponsive,
  "cpr-aed::Unresponsive choking progression": arcVideos.adultChokingUnresponsive,

  // Basic Life Support — shared CPR/AED/choking skills
  "bls::High-performance CPR metrics": arcVideos.handsOnlyCpr,
  "bls::Adult high-quality compressions": arcVideos.compressionOnlyCpr,
  "bls::AED and defibrillator workflow": arcVideos.aedAdult,
  "bls::Pediatric AED considerations": arcVideos.aedChildInfant,
  "bls::Relief of foreign-body airway obstruction": arcVideos.adultChokingUnresponsive,
};

export function getLessonVideo(
  courseSlug: string,
  topicTitle: string
): LessonVideo | undefined {
  return lessonVideos[`${courseSlug}::${topicTitle}`];
}

/** Unique videos mapped to a course, in curriculum order — for preview lists. */
export function getCourseLessonVideos(courseSlug: string): LessonVideo[] {
  const prefix = `${courseSlug}::`;
  const seen = new Set<string>();
  const result: LessonVideo[] = [];
  for (const [key, video] of Object.entries(lessonVideos)) {
    if (!key.startsWith(prefix) || seen.has(video.youtubeId)) continue;
    seen.add(video.youtubeId);
    result.push(video);
  }
  return result;
}
