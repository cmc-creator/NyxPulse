"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "NyxPulse's BLS training helped our code team communicate more clearly during drills.",
    name: "Sarah M., RN, BSN",
    role: "ICU Charge Nurse",
    org: "Regional Medical Center",
    initials: "SM",
    color: "violet",
  },
  {
    quote:
      "The de-escalation training gave our staff practical tools that fit our environment.",
    name: "Dr. James T.",
    role: "Emergency Medicine Physician",
    org: "Urban Health System",
    initials: "JT",
    color: "cyan",
  },
  {
    quote:
      "The Emergency Management course made our preparedness documentation easier to organize.",
    name: "Linda P.",
    role: "Safety & Emergency Manager",
    org: "Community Hospital Network",
    initials: "LP",
    color: "amber",
  },
  {
    quote:
      "The virtual format worked well across multiple sites, and certificate tracking simplified follow-up.",
    name: "Marcus W.",
    role: "CNO",
    org: "Multi-Site Outpatient Clinics",
    initials: "MW",
    color: "green",
  },
];

const initBg: Record<string, string> = {
  violet: "bg-gradient-to-br from-indigo-500 to-indigo-300",
  cyan: "bg-gradient-to-br from-sky-500 to-cyan-300",
  amber: "bg-gradient-to-br from-amber-500 to-amber-300",
  green: "bg-gradient-to-br from-emerald-500 to-teal-300",
};

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge badge-green mb-4">Training Feedback</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            What teams
            <span className="gradient-text"> mention</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Teams mention clear instruction, structured delivery, and practical training workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card p-8 rounded-[28px] group hover:shadow-[0_0_40px_rgba(99,102,241,0.12)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-indigo-300/40" />
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Client feedback</div>
              </div>
              <p className="text-slate-200 text-base leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-[6px] bg-[rgba(99,102,241,0.35)]" />
                  <div
                    className={`relative w-10 h-10 rounded-full ${initBg[t.color]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 border border-white/20`}
                  >
                    {t.initials}
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">
                    {t.role} | {t.org}
                  </div>
                </div>
                <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-slate-500">Feedback</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
