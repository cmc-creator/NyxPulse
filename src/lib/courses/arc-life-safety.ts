import type { Course } from "@/lib/course-types";
import { jeremyInstructor } from "@/lib/instructors";

const arcCompliance = [
  "Official American Red Cross digital certificates are issued only through the Red Cross Learning Center after your instructor verifies skills.",
  "NyxPulse prep modules help you study before class. They are not a substitute for Red Cross online coursework when a blended-learning path is assigned.",
  "Skills practice uses instructor-led manikin/AED training under Red Cross program standards (classroom or blended skills session).",
  "American Red Cross name and marks are used only to identify authorized instructor-led training. NyxPulse does not issue Red Cross certificates from this app.",
];

export const arcLifeSafetyCourses: Course[] = [
  {
    slug: "cpr-aed",
    title: "Adult & Pediatric CPR/AED",
    shortTitle: "CPR / AED",
    category: "Life Safety",
    badge: "cyan",
    icon: "❤️",
    tagline: "Learn high-quality CPR and AED use for adults, children, and infants — with a Red Cross certified instructor.",
    description:
      "Instructor-led American Red Cross Adult & Pediatric CPR/AED training delivered by Jeremy, an American Red Cross certified instructor. Complete NyxPulse prep modules, then attend your skills session so your official Red Cross digital certificate can be issued through the Red Cross Learning Center.",
    duration: "3–4 hours (+ prep)",
    format: ["Live", "Hybrid"],
    level: "All Levels",
    certifies: "American Red Cross Adult & Pediatric CPR/AED",
    price: 85,
    featured: true,
    certifyingBody: "american-red-cross",
    officialCertificateIssuer: "american-red-cross",
    skillsSessionRequired: true,
    certificationValidity: "2 years (Red Cross digital certificate)",
    instructor: jeremyInstructor,
    complianceNotes: arcCompliance,
    modules: [
      {
        title: "Before You Help — Foundations",
        objective: "Know when and how to act safely before touching a victim.",
        topics: [
          {
            title: "Scene safety and personal protection",
            summary:
              "Pause before you rush in. Check for traffic, fire, wires, water, weapons, or other hazards. Use gloves and a breathing barrier when available. Your safety keeps you available to help.",
          },
          {
            title: "Recognizing cardiac arrest",
            summary:
              "Suspect cardiac arrest when a person is unresponsive and not breathing normally (including gasping/agonal breaths). Do not wait for perfect certainty — early CPR and AED use save lives.",
          },
          {
            title: "Emergency action steps",
            summary:
              "Follow a simple sequence: check the scene, check the person, call 9-1-1 / activate EMS, get an AED, and begin care. Assign someone specific to call and meet responders when bystanders are present.",
          },
          {
            title: "Consent, duty to act, and Good Samaritan basics",
            summary:
              "Ask a responsive adult for consent. For an unresponsive person, consent is implied. Know your workplace duty-to-act rules. Good Samaritan protections generally cover reasonable voluntary care within your training.",
          },
        ],
      },
      {
        title: "Adult CPR",
        objective: "Deliver high-quality compressions and breaths for adolescents/adults.",
        topics: [
          {
            title: "Hand position and compression depth",
            summary:
              "Place the heel of one hand on the center of the chest (lower half of the sternum), other hand on top, shoulders over hands. Compress at least 2 inches for adults while allowing full chest recoil.",
          },
          {
            title: "Compression rate and minimizing interruptions",
            summary:
              "Target 100–120 compressions per minute. Limit pauses. Switch compressors about every 2 minutes if a second trained rescuer is available so quality stays high.",
          },
          {
            title: "Opening the airway and giving breaths",
            summary:
              "Use a head-tilt/chin-lift (or jaw thrust if spinal injury is suspected and you are trained). Give 2 breaths that make the chest rise. If the chest does not rise, reposition and retry. Use a barrier device when possible.",
          },
          {
            title: "Compression-to-ventilation ratio (single rescuer)",
            summary:
              "For single-rescuer adult CPR, use cycles of 30 compressions and 2 breaths. Continue until an AED is ready, the person shows signs of life, EMS takes over, or you are too exhausted to continue.",
          },
          {
            title: "High-performance teamwork cues",
            summary:
              "Use clear roles: compressor, airway/breaths, AED operator, and timer/recorder. Closed-loop communication (“I’m starting compressions”) reduces confusion during a real emergency.",
          },
        ],
      },
      {
        title: "AED for Adults",
        objective: "Apply and operate an AED confidently and quickly.",
        topics: [
          {
            title: "When to use an AED",
            summary:
              "Apply an AED as soon as it is available for an unresponsive person who is not breathing normally. Early defibrillation is critical for shockable cardiac arrest rhythms.",
          },
          {
            title: "Pad placement and preparation",
            summary:
              "Expose the chest, dry wet skin, shave only if pad adhesion fails, and place pads as shown on the device diagrams (typically upper right chest and lower left side). Do not place pads over medication patches or implanted devices — place beside them.",
          },
          {
            title: "Clearing for analysis and shock",
            summary:
              "Follow voice prompts. Ensure no one is touching the person during analysis or shock delivery. Resume compressions immediately after a shock or a no-shock prompt.",
          },
          {
            title: "Special situations (water, metal, pregnancy, pacemakers)",
            summary:
              "Move a person out of standing water and dry the chest. Metal surfaces are usually acceptable if the person is not in water. Place pads around implanted devices. Continue care for pregnant patients — maternal resuscitation is fetal resuscitation.",
          },
        ],
      },
      {
        title: "Child CPR & AED",
        objective: "Adapt CPR and AED skills for children.",
        topics: [
          {
            title: "Child age range and assessment differences",
            summary:
              "For training purposes, a child is generally from age 1 to puberty. Assessment still focuses on responsiveness and normal breathing. Children often deteriorate from respiratory problems before cardiac arrest.",
          },
          {
            title: "Compression depth and technique for children",
            summary:
              "Compress about 2 inches (approximately one-third the chest depth). Use one or two hands depending on the child’s size and your ability to reach depth with good form.",
          },
          {
            title: "Breaths and ratios for children",
            summary:
              "Give breaths that make the chest rise. Single-rescuer CPR commonly uses 30:2. If two trained rescuers are present, follow your instructor’s Red Cross skill sheet for the two-rescuer ratio used in class.",
          },
          {
            title: "Pediatric AED considerations",
            summary:
              "Use pediatric pads/key if available and indicated by the device. If pediatric accessories are not available, use adult pads — make sure pads do not touch/overlap. Follow the AED prompts.",
          },
        ],
      },
      {
        title: "Infant CPR & Choking",
        objective: "Perform infant CPR and relieve foreign-body airway obstruction.",
        topics: [
          {
            title: "Infant assessment and pulse/breathing checks",
            summary:
              "An infant is under age 1. Check responsiveness with a tap to the foot and look for normal breathing. Your instructor will coach the skill-sheet sequence used for professional vs. lay responder roles.",
          },
          {
            title: "Two-finger / two-thumb compressions",
            summary:
              "Compress about 1.5 inches (about one-third chest depth) just below the nipple line. Single rescuers often use two fingers; two-rescuer techniques may use the encircling thumbs method as taught in class.",
          },
          {
            title: "Infant breaths and sealing the airway",
            summary:
              "Cover the infant’s mouth and nose with your mouth (or use an appropriate barrier). Give gentle puffs that produce visible chest rise — avoid over-ventilation.",
          },
          {
            title: "Conscious infant choking (back blows & chest thrusts)",
            summary:
              "For a conscious choking infant, support the head/neck and deliver firm back blows alternating with chest thrusts. Do not do abdominal thrusts on infants. Reassess between cycles.",
          },
          {
            title: "Unresponsive choking progression",
            summary:
              "If a choking person becomes unresponsive, lower them to a firm surface, begin CPR, and look in the mouth for an object before breaths. Remove only if you see an object you can easily grasp.",
          },
        ],
      },
      {
        title: "Adult & Child Choking + Skills Session Ready",
        objective: "Relieve choking and arrive prepared for manikin/AED skills testing.",
        topics: [
          {
            title: "Conscious adult/child choking (abdominal thrusts)",
            summary:
              "Ask “Are you choking?” If they cannot cough, speak, or breathe, call for help and perform abdominal thrusts (or chest thrusts for pregnant/obese persons) until the object is expelled or they become unresponsive.",
          },
          {
            title: "Recovery position and ongoing monitoring",
            summary:
              "If a person is unresponsive but breathing normally and no trauma is suspected, place them in a recovery position and monitor breathing until EMS arrives.",
          },
          {
            title: "Opioid-associated emergencies awareness",
            summary:
              "Suspect opioid involvement with pinpoint pupils, respiratory depression, and unresponsiveness. Focus first on calling EMS, supporting ventilation/CPR as needed, and using naloxone if it is available and you are trained to administer it.",
          },
          {
            title: "What to expect in your Red Cross skills session",
            summary:
              "Bring focus and comfortable clothes. You will demonstrate CPR, AED, and choking skills on manikins with your instructor. After successful skills verification and course reporting in the Red Cross Learning Center, your official digital certificate is issued by the American Red Cross — not by NyxPulse.",
          },
          {
            title: "Finding and sharing your Red Cross digital certificate",
            summary:
              "After your instructor closes the course record, check your email and redcross.org/digitalcertificate. Employers can verify the certificate ID/QR code. Keep a screenshot/PDF for onboarding while waiting for email delivery.",
          },
        ],
      },
    ],
    outcomes: [
      "Recognize cardiac arrest and activate EMS quickly",
      "Perform high-quality CPR for adults, children, and infants",
      "Operate an AED with correct pad placement and safety clears",
      "Relieve choking for adults, children, and infants",
      "Arrive prepared for Red Cross instructor skills verification",
    ],
    whoFor: [
      "Healthcare workers",
      "Teachers & coaches",
      "Security personnel",
      "Parents & caregivers",
      "Workplace response teams",
    ],
  },
  {
    slug: "first-aid",
    title: "Adult & Pediatric First Aid",
    shortTitle: "First Aid",
    category: "Life Safety",
    badge: "cyan",
    icon: "🩹",
    tagline: "Recognize and respond to sudden illness and injury until advanced help arrives.",
    description:
      "American Red Cross Adult & Pediatric First Aid training with Jeremy, an American Red Cross certified instructor. Build strong first-aid decision-making in NyxPulse, then complete your instructor-led skills session for official Red Cross certification through the Learning Center.",
    duration: "2–3 hours (+ prep)",
    format: ["Live", "Hybrid"],
    level: "All Levels",
    certifies: "American Red Cross Adult & Pediatric First Aid",
    price: 95,
    featured: true,
    certifyingBody: "american-red-cross",
    officialCertificateIssuer: "american-red-cross",
    skillsSessionRequired: true,
    certificationValidity: "2 years (Red Cross digital certificate)",
    instructor: jeremyInstructor,
    complianceNotes: arcCompliance,
    modules: [
      {
        title: "First Aid Foundations",
        objective: "Size up emergencies and prioritize care.",
        topics: [
          {
            title: "Emergency action steps for first aid",
            summary:
              "Check scene, check person, call 9-1-1 when needed, and provide care within your training. Use PPE. Tell responders what you found and what care you gave.",
          },
          {
            title: "Finding the problem (rapid check)",
            summary:
              "Look for life-threatening bleeding, trouble breathing, unresponsiveness, severe allergic reaction signs, and obvious injuries. Treat the most serious problems first.",
          },
          {
            title: "Shock recognition and care",
            summary:
              "Shock can follow severe bleeding, burns, allergic reaction, or other emergencies. Keep the person lying down if possible, keep them warm, nothing by mouth if altered, and get advanced care fast.",
          },
        ],
      },
      {
        title: "Sudden Illness",
        objective: "Respond to common medical emergencies.",
        topics: [
          {
            title: "Breathing difficulty and asthma awareness",
            summary:
              "Help the person sit upright, loosen tight clothing, and use their prescribed quick-relief inhaler if they have one and can take it. Call 9-1-1 for severe distress, blue lips, or inability to speak.",
          },
          {
            title: "Allergic reaction and anaphylaxis cues",
            summary:
              "Watch for hives, swelling, wheezing, and shock signs. If they have an epinephrine auto-injector and it is prescribed for them, help them use it as directed and call 9-1-1.",
          },
          {
            title: "Diabetic emergencies",
            summary:
              "For a responsive person with suspected low blood sugar who can swallow, give glucose gel/tablets or another available sugar source per training guidance. Call 9-1-1 if they worsen or become unresponsive.",
          },
          {
            title: "Seizures, stroke signs, and poisoning basics",
            summary:
              "Protect the head during a seizure; do not restrain or put objects in the mouth. For stroke, use FAST cues and call 9-1-1 immediately. For poisoning, call Poison Control / EMS and follow their instructions.",
          },
        ],
      },
      {
        title: "Injuries & Bleeding",
        objective: "Control bleeding and care for common injuries.",
        topics: [
          {
            title: "Life-threatening bleeding control",
            summary:
              "Apply firm, direct pressure with a dressing. Add more dressings if needed without removing the first layer. Use a tourniquet for severe limb bleeding when direct pressure fails or is not possible, following your instructor’s skill sheet.",
          },
          {
            title: "Wounds, burns, and nosebleeds",
            summary:
              "Clean minor wounds when appropriate, cover with sterile dressings, and watch for infection signs. Cool burns with clean running water and cover loosely. For nosebleeds, lean forward and pinch soft tissue of the nose.",
          },
          {
            title: "Head, neck, and spine precautions",
            summary:
              "If mechanism suggests spinal injury, minimize movement, support the head in the position found, and wait for EMS. Do not remove helmets unless necessary for airway care and you are trained to do so.",
          },
          {
            title: "Bone, joint, and muscle injuries",
            summary:
              "Rest, immobilize in the position found if moving causes pain, cold pack wrapped in cloth, and elevation when it does not increase pain. Seek emergency care for open fractures, deformity, or loss of sensation.",
          },
        ],
      },
      {
        title: "Environmental Emergencies & Skills Ready",
        objective: "Handle heat, cold, and bites; prepare for skills practice.",
        topics: [
          {
            title: "Heat exhaustion vs. heat stroke",
            summary:
              "Move to a cool place, loosen clothing, and cool with water. Heat stroke is a 9-1-1 emergency — cool aggressively and do not give oral fluids if the person is confused or unresponsive.",
          },
          {
            title: "Cold emergencies and hypothermia",
            summary:
              "Move gently to warmth, remove wet clothing, and insulate. Handle hypothermic patients carefully. Call 9-1-1 for severe symptoms or unresponsiveness.",
          },
          {
            title: "Bites, stings, and exposure concerns",
            summary:
              "Remove stingers by scraping, wash the area, and watch for allergic reaction. For snake/animal bites, keep still, clean if possible, and seek medical care. Know local reporting rules for animal bites.",
          },
          {
            title: "Skills session checklist",
            summary:
              "You will practice putting gloves on/off, checking a person, controlling bleeding, and other first-aid skills with your instructor. Official Red Cross certification is issued after skills verification and course reporting in the Red Cross Learning Center.",
          },
        ],
      },
    ],
    outcomes: [
      "Perform a rapid first-aid assessment",
      "Respond to sudden illness and injury emergencies",
      "Control life-threatening bleeding",
      "Prepare for Red Cross first-aid skills verification",
    ],
    whoFor: [
      "Workplace responders",
      "School staff",
      "Coaches",
      "Parents & caregivers",
      "Community volunteers",
    ],
  },
  {
    slug: "bls",
    title: "Basic Life Support (BLS)",
    shortTitle: "BLS",
    category: "Life Safety",
    badge: "cyan",
    icon: "🫁",
    tagline: "Clinical-grade resuscitation for healthcare providers — Red Cross BLS with skills verification.",
    description:
      "American Red Cross Basic Life Support for healthcare providers and students, taught by Jeremy (American Red Cross certified instructor). Use NyxPulse for structured prep, then complete the required skills session for your official Red Cross BLS digital certificate.",
    duration: "4–6 hours (+ prep)",
    format: ["Live", "Hybrid"],
    level: "Intermediate",
    certifies: "American Red Cross Basic Life Support (BLS)",
    price: 125,
    featured: true,
    certifyingBody: "american-red-cross",
    officialCertificateIssuer: "american-red-cross",
    skillsSessionRequired: true,
    certificationValidity: "2 years (Red Cross digital certificate)",
    instructor: jeremyInstructor,
    complianceNotes: arcCompliance,
    modules: [
      {
        title: "BLS for Healthcare Providers",
        objective: "Deliver high-performance CPR in clinical settings.",
        topics: [
          {
            title: "High-performance CPR metrics",
            summary:
              "Prioritize correct depth, rate 100–120, full recoil, and limited interruptions. Capnography and feedback devices (when available) help teams maintain quality.",
          },
          {
            title: "Bag-mask and advanced airway awareness",
            summary:
              "Practice effective bag-mask ventilation with a tight seal and appropriate volume. When an advanced airway is in place, follow the continuous-compression + asynchronous ventilation approach taught in your BLS skill sheets.",
          },
          {
            title: "AED/defibrillator use in clinical environments",
            summary:
              "Know how to operate the defibrillator available on your unit. Minimize pauses for rhythm checks and shock delivery. Resume compressions immediately afterward.",
          },
        ],
      },
      {
        title: "Airway, Breathing & Special Situations",
        objective: "Manage airway emergencies and special resuscitation cases.",
        topics: [
          {
            title: "Relief of foreign-body airway obstruction",
            summary:
              "Use the healthcare-provider sequence for responsive and unresponsive choking victims across age groups, including inspection of the mouth during CPR cycles when obstruction is suspected.",
          },
          {
            title: "Opioid-associated emergency response",
            summary:
              "Prioritize EMS activation, airway/ventilation support, CPR if pulseless, and naloxone administration when indicated and available under your protocols.",
          },
          {
            title: "Pregnancy and other special considerations",
            summary:
              "Use standard BLS with pregnancy-specific adaptations as taught (for example, manual uterine displacement during CPR when appropriate). Follow your instructor’s current Red Cross skill guidance.",
          },
        ],
      },
      {
        title: "Team Dynamics & Skills Session",
        objective: "Run a coordinated code response and complete skills testing.",
        topics: [
          {
            title: "Roles, closed-loop communication, and leadership",
            summary:
              "Assign clear roles early. Use closed-loop orders and confirmations. Rotate compressors to fight fatigue. Speak up when quality drops.",
          },
          {
            title: "Practice-while-waiting and rapid response culture",
            summary:
              "Know how to activate your facility’s rapid response/code team and start BLS immediately while awaiting advanced providers.",
          },
          {
            title: "Red Cross BLS skills verification",
            summary:
              "Your official Red Cross BLS certificate is issued through the Red Cross Learning Center after successful skills testing and course reporting by your instructor. NyxPulse tracks prep completion only.",
          },
        ],
      },
    ],
    outcomes: [
      "Perform BLS-level CPR and ventilation as a healthcare provider",
      "Operate effectively in a resuscitation team",
      "Manage choking and opioid-associated emergencies at a BLS level",
      "Complete Red Cross BLS skills verification requirements",
    ],
    whoFor: [
      "Nurses",
      "Physicians",
      "EMTs & paramedics",
      "Respiratory therapists",
      "Medical & nursing students",
    ],
  },
];
