"use client";

import Link from "next/link";
import { ArrowRight, Play, ShieldCheck, Zap, Award } from "lucide-react";

const stats = [
  { value: "6+", label: "Certified Programs" },
  { value: "500+", label: "Professionals Trained" },
  { value: "100%", label: "Compliance Ready" },
  { value: "Live & Virtual", label: "Flexible Formats" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          transform: "translate(50%, 50%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 badge badge-violet mb-8 animate-float">
          <Zap className="w-3.5 h-3.5" />
          <span>Training That Saves Lives</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6">
          <span className="text-white">Train Smarter.</span>
          <br />
          <span className="gradient-text">Respond Faster.</span>
          <br />
          <span className="text-white">Save Lives.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-slate-400 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-10">
          NyxPulse delivers next-generation emergency and safety training for healthcare
          professionals — immersive, evidence-based, and built for the real world.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/courses" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
            <span className="flex items-center gap-2">
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link href="/contact" className="btn-outline text-base px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Book Live Training
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          {[
            { Icon: ShieldCheck, text: "AHA-Aligned Curriculum" },
            { Icon: Award, text: "FEMA ICS Aligned" },
            { Icon: Zap, text: "CMS & TJC Compliant" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
              <Icon className="w-4 h-4 text-violet-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text font-display mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--nyx-dark))" }} />
    </section>
  );
}
