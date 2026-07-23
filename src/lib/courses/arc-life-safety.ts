import type { Course } from "@/lib/course-types";
import { jeremyInstructor } from "@/lib/instructors";

const arcCompliance = [
  "NyxPulse issues its own Certificate of Completion when you finish the course modules here.",
  "If you also want an official American Red Cross digital certificate, attend the instructor skills session and complete Red Cross course reporting through the Learning Center.",
  "NyxPulse study modules support learning. They do not replace required Red Cross online coursework when a blended-learning path is assigned.",
  "Jeremy also teaches through other organizations. Red Cross certificates are only issued when a class is taught and reported under an authorized Red Cross Training Provider agreement.",
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
      "Instructor-led American Red Cross Adult & Pediatric CPR/AED training delivered by Jeremy, an American Red Cross certified instructor. Earn a NyxPulse Certificate of Completion in this platform. If you also want an official American Red Cross digital certificate, attend Jeremy's skills session so the class can be reported through the Red Cross Learning Center.",
    duration: "3–4 hours (+ prep)",
    format: ["Live", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate · Red Cross pathway available",
    price: 85,
    featured: true,
    certifyingBody: "american-red-cross",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: true,
    skillsSessionRequired: true,
    certificationValidity: "NyxPulse certificate on completion · Red Cross card valid 2 years when earned",
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
      "American Red Cross Adult & Pediatric First Aid training with Jeremy, an American Red Cross certified instructor. Earn a NyxPulse Certificate of Completion here. Optionally continue to an instructor-led skills session for official Red Cross certification through the Learning Center.",
    duration: "2–3 hours (+ prep)",
    format: ["Live", "Hybrid"],
    level: "All Levels",
    certifies: "NyxPulse Certificate · Red Cross pathway available",
    price: 95,
    featured: true,
    certifyingBody: "american-red-cross",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: true,
    skillsSessionRequired: true,
    certificationValidity: "NyxPulse certificate on completion · Red Cross card valid 2 years when earned",
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
        title: "Medical Emergencies Deep Dive",
        objective: "Recognize high-risk medical presentations and act early.",
        topics: [
          {
            title: "Chest pain and heart attack warning signs",
            summary:
              "Pressure, squeezing, pain radiating to arm/jaw/back, shortness of breath, nausea, or sudden weakness can signal a heart attack. Have the person rest, loosen clothing, and call 9-1-1 immediately. Do not drive them yourself if EMS is available.",
          },
          {
            title: "FAST stroke recognition",
            summary:
              "Face drooping, Arm weakness, Speech difficulty, Time to call 9-1-1. Note the time symptoms started. Keep the person safe and monitor breathing until responders arrive.",
          },
          {
            title: "Fainting and altered responsiveness",
            summary:
              "If someone feels faint, help them lie down and elevate the legs if no injury is suspected. If they become unresponsive, check breathing and begin CPR if needed. Always consider calling EMS when the cause is unclear.",
          },
          {
            title: "Abuse, neglect, and safe reporting awareness",
            summary:
              "If you suspect abuse or neglect while providing first aid, prioritize medical care and scene safety. Follow your workplace/school reporting requirements and share concerns with EMS/authorities as appropriate.",
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
            title: "Building a practical first-aid kit",
            summary:
              "Stock gloves, breathing barrier, gauze, roller bandages, adhesive dressings, trauma dressing, tape, scissors, triangular bandage, instant cold pack, and emergency blanket. Check expiration dates and restock after use.",
          },
          {
            title: "Skills session + certificate pathways",
            summary:
              "Completing NyxPulse modules earns your NyxPulse Certificate of Completion. If you also want an official American Red Cross digital certificate, book a skills session with Jeremy so the class can be taught and reported under an authorized Red Cross Training Provider process.",
          },
        ],
      },
    ],
    outcomes: [
      "Perform a rapid first-aid assessment",
      "Respond to sudden illness and injury emergencies",
      "Control life-threatening bleeding",
      "Earn a NyxPulse Certificate of Completion",
      "Optionally prepare for Red Cross first-aid skills verification",
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
      "American Red Cross Basic Life Support for healthcare providers and students, taught by Jeremy (American Red Cross certified instructor). Earn a NyxPulse Certificate of Completion here. Optionally complete a skills session for an official Red Cross BLS digital certificate.",
    duration: "4–6 hours (+ prep)",
    format: ["Live", "Hybrid"],
    level: "Intermediate",
    certifies: "NyxPulse Certificate · Red Cross pathway available",
    price: 125,
    featured: true,
    certifyingBody: "american-red-cross",
    issuesNyxpulseCertificate: true,
    americanRedCrossPathway: true,
    skillsSessionRequired: true,
    certificationValidity: "NyxPulse certificate on completion · Red Cross card valid 2 years when earned",
    instructor: jeremyInstructor,
    complianceNotes: arcCompliance,
    modules: [
      {
        title: "BLS Foundations for Healthcare Providers",
        objective: "Understand why high-performance BLS matters in clinical environments.",
        topics: [
          {
            title: "Who BLS is for — and why quality matters",
            summary:
              "BLS for healthcare providers is the clinical standard for CPR, AED/defibrillator use, and airway support. Survival after sudden cardiac arrest is tightly linked to compression fraction, depth, rate, and time to first shock — not only whether CPR was started.",
          },
          {
            title: "Chain of survival in clinical settings",
            summary:
              "Early recognition, activation of the emergency response/code team, high-quality CPR, rapid defibrillation, advanced resuscitation, and post-arrest care form the chain. Delays often happen at transitions: waiting for a crash cart, unclear leadership, or pausing compressions for IV access.",
          },
          {
            title: "High-performance CPR metrics",
            summary:
              "Target rate 100–120/min, adult depth at least 2 inches (5 cm), full recoil, and the highest compression fraction reasonably possible. Avoid over-ventilation. Feedback devices (when available) help teams maintain quality during practice and real codes.",
          },
          {
            title: "Personal protective equipment during resuscitation",
            summary:
              "Use gloves and eye protection when available. Know where airway barriers and bag-mask devices are kept on your unit so PPE never becomes the reason care is delayed.",
          },
        ],
      },
      {
        title: "Adult BLS Sequence",
        objective: "Perform high-quality adult BLS including AED use and coordinated roles.",
        topics: [
          {
            title: "Adult assessment and activation",
            summary:
              "Check responsiveness, look for normal breathing, and activate the emergency response system/code team immediately. Send someone for the AED/defibrillator and crash cart. Scene safety still applies in parking lots, home visits, and public areas outside the clinical unit.",
          },
          {
            title: "Adult high-quality compressions",
            summary:
              "Compress the center of the chest at least 2 inches at 100–120/min with full recoil and minimal interruptions. Switch compressors about every 2 minutes before fatigue drops quality. Count out loud or use a metronome/feedback device when available.",
          },
          {
            title: "Bag-mask and advanced airway awareness",
            summary:
              "Practice effective bag-mask ventilation with a tight seal and appropriate volume. When an advanced airway is in place, follow the continuous-compression + asynchronous ventilation approach taught in your BLS skill sheets.",
          },
          {
            title: "AED and defibrillator workflow",
            summary:
              "Apply pads quickly, clear during analysis and shock, and resume compressions immediately after a shock or no-shock decision. Know your unit’s defibrillator mode (AED vs manual under ACLS) and how to handle wet skin, medication patches, and implanted devices.",
          },
        ],
      },
      {
        title: "Pediatric & Infant BLS",
        objective: "Adapt BLS for children and infants with correct technique and AED considerations.",
        topics: [
          {
            title: "Why pediatric arrest is different",
            summary:
              "Pediatric cardiac arrest is more often respiratory or circulatory in origin than primary arrhythmia. Early airway/breathing support and recognition of shock matter as much as compression technique.",
          },
          {
            title: "Child and infant compressions and ventilations",
            summary:
              "Use age-appropriate hand/finger placement, depth, and single- vs two-rescuer compression-to-ventilation ratios as taught in current Red Cross BLS skill sheets. Practice switching between adult, child, and infant techniques without hesitation.",
          },
          {
            title: "Pediatric AED considerations",
            summary:
              "Use pediatric pads/attenuators when available and indicated. If only adult pads are available, use them rather than withhold defibrillation — place carefully to avoid pad overlap. Know your crash cart’s pediatric drawer contents.",
          },
        ],
      },
      {
        title: "Airway Emergencies & Special Situations",
        objective: "Manage choking and adjust BLS for special resuscitation cases.",
        topics: [
          {
            title: "Relief of foreign-body airway obstruction",
            summary:
              "Use the healthcare-provider sequence for responsive and unresponsive choking victims across age groups, including inspection of the mouth during CPR cycles when obstruction is suspected.",
          },
          {
            title: "Opioid-associated emergency response",
            summary:
              "Prioritize EMS activation, airway/ventilation support, CPR if indicated, and naloxone when available under your protocols. Naloxone is not a substitute for breathing support and compressions.",
          },
          {
            title: "Cardiac arrest in pregnancy",
            summary:
              "Use standard high-quality BLS with pregnancy-specific adaptations as taught (for example, manual left uterine displacement during CPR when appropriate). Call OB and neonatal teams early per facility protocol.",
          },
          {
            title: "Drowning and respiratory-arrest emphasis",
            summary:
              "Drowning victims often need early ventilation alongside compressions. Remove from water safely, begin care on a firm surface, and follow hypothermia considerations when relevant.",
          },
        ],
      },
      {
        title: "Team Dynamics, ROSC Hand-off & Skills Session",
        objective: "Run a coordinated code response and complete dual-certification pathways.",
        topics: [
          {
            title: "Roles, closed-loop communication, and leadership",
            summary:
              "Assign clear roles early: compressor, airway/ventilator, AED/defibrillator operator, recorder, and team leader. Use closed-loop orders and confirmations. Rotate compressors to fight fatigue. Speak up when quality drops.",
          },
          {
            title: "Practice-while-waiting and rapid response culture",
            summary:
              "Know how to activate your facility’s rapid response/code team and start BLS immediately while awaiting advanced providers. Rehearse who brings the cart, who documents, and who clears the room.",
          },
          {
            title: "After ROSC — hand-off basics",
            summary:
              "Return of spontaneous circulation is not the end of care. Support airway and breathing, monitor vitals, and hand off downtime estimates, shocks delivered, medications given, and current status to the receiving team.",
          },
          {
            title: "NyxPulse certificate and optional Red Cross BLS skills",
            summary:
              "Mark all modules complete to claim your NyxPulse Certificate of Completion. If you also want an official Red Cross BLS card, book Jeremy’s skills session — the Red Cross digital certificate is issued through the Learning Center after testing and course reporting.",
          },
        ],
      },
    ],
    outcomes: [
      "Perform BLS-level CPR and ventilation as a healthcare provider",
      "Operate effectively in a resuscitation team",
      "Adapt BLS for pediatric, opioid, pregnancy, and drowning situations",
      "Complete NyxPulse certification and optional Red Cross BLS skills verification",
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
