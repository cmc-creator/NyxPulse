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
            "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="glass-card p-12 lg:p-16 animate-pulse-glow">
          <div className="badge badge-violet mb-6 mx-auto w-fit">
            Ready to Start?
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            Elevate Your Team&apos;s{" "}
            <span className="gradient-text">Emergency Readiness</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Whether you need a single course or a full organizational training program, NyxPulse is ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses" className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Browse All Courses
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/contact" className="btn-outline text-base px-10 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
