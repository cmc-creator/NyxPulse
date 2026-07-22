"use client";

import Link from "next/link";
import { ArrowRight, Check, Building2 } from "lucide-react";
import { courses } from "@/lib/courses";

export default function Pricing() {
  const pricedCourses = courses.filter((course) => course.price !== null);

  return (
    <section id="pricing" className="relative py-20 sm:py-24 lg:py-32 px-5 sm:px-6">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 72%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="badge badge-amber mb-4">Flat-Fee Training</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            One training.
            <span className="gradient-text"> One flat fee.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Every NyxPulse program is priced independently at a transparent flat fee.
            CPR, OSHA, ICS/HICS, and the rest are never packaged together — enroll only in the training you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {pricedCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="glass-card p-6 rounded-[24px] hover:border-indigo-400/40 transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-2xl mb-2">{course.icon}</div>
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-200 transition-colors">
                    {course.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{course.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-display font-extrabold gradient-text">
                    ${course.price}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                    flat fee
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                {course.tagline}
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 mt-0.5" />
                  {course.duration}
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 mt-0.5" />
                  {course.certifies}
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 mt-0.5" />
                  Separate enrollment — not sold in mixed bundles
                </li>
              </ul>
              <span className="inline-flex items-center gap-2 text-sm text-indigo-300 group-hover:text-white transition-colors">
                View training <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="glass-card p-6 sm:p-8 rounded-[28px] border border-indigo-400/25 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Custom facility programs</h3>
              <p className="text-slate-400 text-sm max-w-2xl">
                Need on-site, virtual, or multi-session delivery for your organization?
                We quote a flat program fee for the trainings you select — not per-seat pricing.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Request a quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          All prices in USD. Flat fee covers enrollment in that training only.
        </p>
      </div>
    </section>
  );
}
