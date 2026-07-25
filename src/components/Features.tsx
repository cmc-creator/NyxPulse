"use client";

import { Swords, Fingerprint, Award, ShieldCheck, Layers, Radio } from "lucide-react";

const features = [
  {
    icon: Swords,
    color: "amber",
    title: "Advantage Gates",
    desc: "Branching emergency scenarios and mastery quizzes. Certificates unlock only after judgment-ready scores — not checkbox theater.",
  },
  {
    icon: Fingerprint,
    color: "violet",
    title: "Skills Passport",
    desc: "One employer-shareable readiness profile with gate scores, certificates, and Red Cross pathway status.",
  },
  {
    icon: ShieldCheck,
    color: "cyan",
    title: "Dual-certificate honesty",
    desc: "NyxPulse issues its own Certificate of Completion. Optional American Red Cross cards stay on the real instructor pathway — never faked in-app.",
  },
  {
    icon: Radio,
    color: "green",
    title: "Healthcare-real scenarios",
    desc: "Active threat, triage agitation, lobby collapse, and bleeding control trees built for clinics and hospitals — not generic office slides.",
  },
  {
    icon: Award,
    color: "amber",
    title: "Public verification",
    desc: "Certificate IDs and passport share links employers can open without logging into NyxPulse.",
  },
  {
    icon: Layers,
    color: "violet",
    title: "Flat-fee, unbundled programs",
    desc: "CPR, OSHA, ICS/HICS, and threat prep stay separate enrollments. No seat-license maze. No junk bundles.",
  },
];

const colorMap: Record<string, string> = {
  violet:
    "from-teal-500/18 to-teal-900/8 border-teal-400/25 group-hover:border-teal-300/65",
  cyan:
    "from-sky-500/16 to-sky-900/8 border-sky-400/20 group-hover:border-sky-300/60",
  amber:
    "from-amber-500/14 to-amber-900/10 border-amber-400/25 group-hover:border-amber-300/65",
  green:
    "from-rose-500/16 to-rose-900/8 border-rose-400/25 group-hover:border-rose-300/65",
};

const iconColorMap: Record<string, string> = {
  violet: "text-teal-300",
  cyan: "text-sky-300",
  amber: "text-amber-300",
  green: "text-rose-300",
};

const iconBgMap: Record<string, string> = {
  violet: "bg-teal-400/12",
  cyan: "bg-sky-400/12",
  amber: "bg-amber-400/12",
  green: "bg-rose-400/12",
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-amber mb-4">NyxPulse Advantage</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
            Training that proves
            <span className="gradient-text"> judgment under pressure</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Most platforms track completion. NyxPulse scores decisions, gates certificates on mastery,
            and gives employers a passport they can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, color, title, desc }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-[28px] border bg-gradient-to-br p-7 transition-all duration-300 ${colorMap[color]}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${iconBgMap[color]} flex items-center justify-center mb-5`}
              >
                <Icon className={`w-6 h-6 ${iconColorMap[color]}`} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
