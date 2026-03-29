"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "NyxPulse's BLS training completely changed how our code team communicates. The team dynamics module alone was worth it. Our response times dropped noticeably.",
    name: "Sarah M., RN, BSN",
    role: "ICU Charge Nurse",
    org: "Regional Medical Center",
    initials: "SM",
    color: "violet",
  },
  {
    quote:
      "We brought NyxPulse in for our entire ED staff for de-escalation. The instructors understood our environment. Real scenarios, no fluff. Our staff left with actual tools.",
    name: "Dr. James T.",
    role: "Emergency Medicine Physician",
    org: "Urban Health System",
    initials: "JT",
    color: "cyan",
  },
  {
    quote:
      "Their Emergency Management course helped us pass our TJC survey with zero findings in the emergency preparedness chapter. That has never happened before. Phenomenal.",
    name: "Linda P.",
    role: "Safety & Emergency Manager",
    org: "Community Hospital Network",
    initials: "LP",
    color: "amber",
  },
  {
    quote:
      "The virtual format was seamless. Our staff across three facilities all trained together in real time. Certificate management made compliance tracking easy.",
    name: "Marcus W.",
    role: "CNO",
    org: "Multi-Site Outpatient Clinics",
    initials: "MW",
    color: "green",
  },
];

const initBg: Record<string, string> = {
  violet: "bg-violet-600",
  cyan: "bg-cyan-600",
  amber: "bg-amber-600",
  green: "bg-emerald-600",
};

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge badge-green mb-4">Trusted Outcomes</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Proof That the Experience
            <span className="gradient-text"> Delivers</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            High-trust organizations choose NyxPulse because the platform looks polished, the instruction feels credible, and the outcomes are measurable.
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
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Verified Client</div>
              </div>
              <p className="text-slate-200 text-base leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${initBg[t.color]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">
                    {t.role} | {t.org}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
