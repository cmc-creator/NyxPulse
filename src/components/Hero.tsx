"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Building2,
  Siren,
  HeartPulse,
} from "lucide-react";

const stats = [
  { value: "6", label: "Core Certification Tracks" },
  { value: "24/7", label: "Operational Readiness Mindset" },
  { value: "AHA/FEMA/OSHA", label: "Standards Coverage" },
  { value: "On-Site + Virtual", label: "Delivery Modes" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,164,0.18) 0%, transparent 72%)",
          transform: "translate(-45%, -40%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,113,133,0.16) 0%, transparent 72%)",
          transform: "translate(42%, 42%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3">
          <div className="inline-flex items-center gap-2 badge badge-violet mb-8">
            <Siren className="w-3.5 h-3.5" />
            <span>Emergency Readiness Training Platform</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-6">
            <span className="text-white">Professional Training</span>
            <br />
            <span className="gradient-text">for High-Stakes Teams</span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            NyxPulse gives healthcare and community teams a disciplined training command center:
            certification tracks, scenario-driven drills, and measurable readiness outcomes.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link href="/courses" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
              <span className="flex items-center gap-2">
                Explore Programs
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="btn-outline text-base px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Talk to Training Ops
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-12">
            {[
              { Icon: ShieldCheck, text: "AHA-Aligned Curriculum" },
              { Icon: Award, text: "FEMA ICS / HICS Aligned" },
              { Icon: Zap, text: "CMS + TJC Compliance Focused" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-slate-300">
                <Icon className="w-4 h-4 text-teal-300" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <div className="text-lg sm:text-2xl font-bold gradient-text font-display mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card p-6 sm:p-7 border-[rgba(45,212,191,0.35)]">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Readiness Snapshot</p>
              <span className="badge badge-amber">Live</span>
            </div>

            <div className="space-y-4 mb-6">
              {[
                {
                  icon: HeartPulse,
                  title: "CPR/BLS Competency",
                  detail: "Critical response fundamentals",
                },
                {
                  icon: Building2,
                  title: "ICS/HICS Coordination",
                  detail: "Command structure under pressure",
                },
                {
                  icon: Siren,
                  title: "De-Escalation + OSHA",
                  detail: "Safety and prevention workflows",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-700/70 bg-slate-900/55 p-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <item.icon className="w-4.5 h-4.5 text-rose-300" />
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                  <p className="text-slate-400 text-xs">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-gradient-to-r from-teal-500/15 to-rose-400/15 border border-slate-700/60 p-4">
              <p className="text-white text-sm font-semibold mb-1">Built for real environments</p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Hospitals, clinics, schools, churches, community programs, and volunteer teams.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--nyx-dark))" }}
      />
    </section>
  );
}
