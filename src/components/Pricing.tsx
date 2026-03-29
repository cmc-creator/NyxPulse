"use client";

import Link from "next/link";
import { Check, Zap, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Certification Access",
    badge: null,
    price: "From $75",
    per: "per learner, per course",
    desc: "Transparent self-serve enrollment for clinicians, staff members, and independent professionals.",
    cta: "Browse Courses",
    ctaHref: "/courses",
    highlight: false,
    features: [
      "Simple per-seat pricing",
      "Digital certificate on completion",
      "Course materials included",
      "Fast online registration",
    ],
  },
  {
    name: "Team Cohort",
    badge: "Best Value",
    price: "Custom",
    per: "priced to your scope",
    desc: "Private on-site or virtual training for departments, clinics, schools, and community organizations.",
    cta: "Request Proposal",
    ctaHref: "/contact",
    highlight: true,
    features: [
      "Volume pricing for groups of 5+",
      "Dedicated instructor-led delivery",
      "Live or virtual delivery",
      "Roster & certificate management",
      "Post-training skills assessment",
    ],
  },
  {
    name: "Enterprise Partnership",
    badge: null,
    price: "Annual",
    per: "custom annual program",
    desc: "For health systems and multi-site operators who want a polished, repeatable training infrastructure.",
    cta: "Talk to Sales",
    ctaHref: "/contact",
    highlight: false,
    features: [
      "Full curriculum access",
      "Unlimited enrollments",
      "LMS integration support",
      "Dedicated account manager",
      "Custom course branding",
      "Analytics dashboard",
      "Regulatory audit reports",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 px-6">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 72%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.95fr] gap-10 items-start mb-14">
          <div>
            <span className="badge badge-amber mb-4">Transparent Pricing</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Premium delivery.
              <span className="gradient-text"> Clear commercial structure.</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-xl">
              NyxPulse is designed to feel bespoke without hiding the economics. Individual seats start clearly, team pricing scales sensibly, and larger partnerships are scoped with precision.
            </p>

            <div className="glass-card mt-8 p-5">
              <div className="flex items-center gap-2 mb-3 text-white font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Pricing principles
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>No hidden platform fees for course enrollment.</li>
                <li>Group pricing is based on scope, format, and seat volume.</li>
                <li>Enterprise engagements include planning and reporting support.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-[28px] p-8 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-[rgba(99,102,241,0.24)] to-[rgba(245,158,11,0.08)] border-indigo-400/55 shadow-[0_0_60px_rgba(99,102,241,0.22)]"
                    : "bg-[rgba(12,12,24,0.9)] border-[rgba(148,163,184,0.2)] hover:border-[rgba(99,102,241,0.42)]"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="badge badge-violet text-xs px-3 py-1">
                      <Zap className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-display font-extrabold gradient-text">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3 uppercase tracking-[0.18em]">{plan.per}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 min-h-[168px]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
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
