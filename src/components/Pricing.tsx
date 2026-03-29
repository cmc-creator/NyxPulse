"use client";

import Link from "next/link";
import { Check, Zap, ArrowRight, Sparkles, TrendingDown } from "lucide-react";

const plans = [
  {
    name: "Pay-Per-Course",
    badge: null,
    price: "From $49",
    per: "per learner, per course",
    desc: "Individual enrollment with transparent pricing. No platform fees, no surprises.",
    cta: "Browse Courses",
    ctaHref: "/courses",
    highlight: false,
    features: [
      "CPR/AED from $49 · BLS from $69",
      "De-escalation, ICS/HICS, OSHA all included",
      "Digital certificates instantly on completion",
      "Lifetime access to course materials",
      "Fast 5-minute registration",
    ],
  },
  {
    name: "Team Bundle",
    badge: "Best Value",
    price: "20% Off",
    per: "groups of 5+ learners",
    desc: "Same premium courses with volume discounts. Perfect for departments scaling training.",
    cta: "Calculate Team Cost",
    ctaHref: "/contact",
    highlight: true,
    features: [
      "20% savings on all courses at 5+ seats",
      "30% savings at 20+ seats",
      "Custom invoice & payment terms",
      "Roster management & tracking",
      "Completion certificates for your records",
      "Post-training skills assessment included",
    ],
  },
  {
    name: "Enterprise Annual",
    badge: null,
    price: "Scale Smart",
    per: "unlimited annual program",
    desc: "Organizations that train 500+ staff annually. Full suite access with dedicated support.",
    cta: "Talk to Sales",
    ctaHref: "/contact",
    highlight: false,
    features: [
      "Unlimited enrollments across all courses",
      "Fixed annual cost (typically 40-50% savings)",
      "LMS integration & single sign-on",
      "Dedicated account manager",
      "Custom course bundling by role",
      "Advanced analytics & compliance reporting",
      "Regulatory audit reports & attestations",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-24 lg:py-32 px-5 sm:px-6">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 72%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.95fr] gap-8 sm:gap-10 items-start mb-12 sm:mb-14">
          <div>
            <span className="badge badge-amber mb-4">Competitive Pricing</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Premium training.
              <span className="gradient-text"> Accessible pricing.</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl">
              No hidden fees. No platform markups. Individual seats start at $49, teams get 20-30% volume discounts, and enterprises scale with fixed annual pricing.
            </p>

            <div className="glass-card mt-6 sm:mt-8 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3 text-white font-semibold text-xs sm:text-sm">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                Why we're competitive
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>Lowest per-seat rates in category. Starting at $49 per course.</li>
                <li>Volume discounts built in: 20% at 5+ learners, 30% at 20+.</li>
                <li>No enrollment fees, platform charges, or surprise costs.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-[28px] p-6 sm:p-8 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-[rgba(99,102,241,0.24)] to-[rgba(245,158,11,0.08)] border-indigo-400/55 shadow-[0_0_60px_rgba(99,102,241,0.22)]"
                    : "bg-[rgba(12,12,24,0.9)] border-[rgba(148,163,184,0.2)] hover:border-[rgba(99,102,241,0.42)]"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-violet text-[10px] px-3 py-1">
                      <Zap className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold gradient-text">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-[0.18em]">{plan.per}</p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 lg:min-h-[168px]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight ? "btn-primary" : "btn-outline"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          All prices in USD. Group discounts, nonprofit considerations, and multi-site enterprise proposals available on request.
        </p>
      </div>
    </section>
  );
}
