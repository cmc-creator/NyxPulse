"use client";

import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Individual",
    badge: null,
    price: "From $75",
    per: "per course / per person",
    desc: "Perfect for individual healthcare professionals needing a single certification or refresher.",
    cta: "Register Now",
    ctaHref: "/courses",
    highlight: false,
    features: [
      "Any single course enrollment",
      "Digital certificate on completion",
      "Course materials included",
      "Email support",
    ],
  },
  {
    name: "Team Bundle",
    badge: "Most Popular",
    price: "Custom",
    per: "for your whole team",
    desc: "Bring NyxPulse training on-site or as a dedicated virtual cohort for groups of 5 or more.",
    cta: "Get a Quote",
    ctaHref: "/contact",
    highlight: true,
    features: [
      "Any 1–3 courses bundled",
      "Group discounts from 20% off",
      "Dedicated instructor",
      "Live or virtual delivery",
      "Roster & certificate management",
      "Post-training skills assessment",
    ],
  },
  {
    name: "Organization",
    badge: null,
    price: "Annual",
    per: "unlimited training access",
    desc: "Ideal for hospitals, clinics, and healthcare systems that need continuous staff development.",
    cta: "Contact Us",
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
      {/* Background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge badge-amber mb-4">Pricing</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Flexible Plans for Every{" "}
            <span className="gradient-text">Organization</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From solo practitioners to enterprise health systems — we have a plan that fits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-[rgba(124,58,237,0.2)] to-[rgba(6,182,212,0.08)] border-violet-500/50 scale-105 shadow-[0_0_60px_rgba(124,58,237,0.2)]"
                  : "bg-[rgba(12,12,24,0.9)] border-[rgba(124,58,237,0.15)] hover:border-[rgba(124,58,237,0.4)]"
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
                <p className="text-xs text-slate-500 mb-3">{plan.per}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "btn-primary"
                    : "btn-outline"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          All prices in USD. Group and volume pricing available. Contact us for non-profit and public sector rates.
        </p>
      </div>
    </section>
  );
}
