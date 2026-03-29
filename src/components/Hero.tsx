"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Building2,
  Siren,
  HeartPulse,
} from "lucide-react";
import MotionReveal from "@/components/MotionReveal";

const stats = [
  { value: "6", label: "Elite Training Tracks" },
  { value: "365", label: "Days of Readiness Focus" },
  { value: "AHA/FEMA/OSHA", label: "Accreditation Alignment" },
  { value: "On-Site + Virtual", label: "Premium Delivery" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden">
      <div className="orbital-ring w-[520px] h-[520px] top-[12%] right-[8%] animate-drift-slow opacity-60" />
      <div className="orbital-ring w-[320px] h-[320px] bottom-[10%] left-[4%] animate-drift opacity-40" />
      <div
        className="absolute top-0 left-0 w-[640px] h-[640px] rounded-full pointer-events-none animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.24) 0%, transparent 72%)",
          transform: "translate(-45%, -40%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[560px] h-[560px] rounded-full pointer-events-none animate-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.16) 0%, transparent 72%)",
          transform: "translate(42%, 42%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-7 sm:gap-8 items-center">
        <div className="lg:col-span-3">
          <MotionReveal delay={0.02} className="inline-flex items-center gap-2 badge badge-violet mb-8">
            <Siren className="w-3.5 h-3.5" />
            <span>Luxury-Grade Readiness Platform</span>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-5 sm:mb-6">
            <span className="text-white">Where Preparedness</span>
            <br />
            <span className="gradient-text">Meets Excellence</span>
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <p className="text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed mb-8 sm:mb-10">
            NyxPulse delivers a premium command experience for healthcare and community teams:
            rigorous certification pathways, high-fidelity scenarios, and polished operational oversight.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.2} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
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
              Design a Private Program
            </Link>
          </MotionReveal>

          <MotionReveal delay={0.26} className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
            {[
              { Icon: ShieldCheck, text: "AHA-Aligned Curriculum" },
              { Icon: Award, text: "FEMA ICS / HICS Aligned" },
              { Icon: Zap, text: "CMS + TJC Compliance Focused" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <Icon className="w-4 h-4 text-amber-300" />
                <span>{text}</span>
              </div>
            ))}
          </MotionReveal>

          <MotionReveal delay={0.32} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.22 }}
                className="glass-card p-3 sm:p-5 text-center surface-premium"
              >
                <div className="text-base sm:text-2xl font-bold gradient-text font-display mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </MotionReveal>
        </div>

        <div className="lg:col-span-2">
          <MotionReveal delay={0.18} y={36} className="glass-card p-5 sm:p-7 border-[rgba(99,102,241,0.35)] surface-premium animate-drift-slow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Readiness Snapshot</p>
              <span className="badge badge-amber">Priority</span>
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
                <motion.div
                  key={item.title}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-slate-700/70 bg-slate-900/55 p-4"
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <item.icon className="w-4.5 h-4.5 text-indigo-300" />
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                  <p className="text-slate-400 text-xs">{item.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl bg-gradient-to-r from-indigo-500/16 to-amber-400/12 border border-slate-700/60 p-4">
              <p className="text-white text-sm font-semibold mb-1">Built for real environments</p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Hospitals, clinics, schools, churches, community programs, and volunteer teams.
              </p>
            </div>
          </MotionReveal>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--nyx-dark))" }}
      />
    </section>
  );
}
