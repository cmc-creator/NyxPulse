"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.2) 0%, rgba(245,158,11,0.08) 42%, transparent 72%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="glass-card p-12 lg:p-16 rounded-[32px] animate-pulse-glow border-[rgba(148,163,184,0.22)]">
          <div className="badge badge-violet mb-6 mx-auto w-fit">
            Concierge Enrollment
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight text-balance">
            Elevate Your Team&apos;s{" "}
            <span className="gradient-text">Emergency Readiness</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Whether you need a focused certification or a multi-site rollout, we help you assemble the right mix of rigor, polish, and transparent pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses" className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Explore the Catalog
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/contact" className="btn-outline text-base px-10 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Request Private Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
