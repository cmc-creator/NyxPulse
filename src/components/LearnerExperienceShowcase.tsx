"use client";

import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileCheck,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import MotionReveal from "@/components/MotionReveal";

const modules = [
  { name: "Recognition and response", complete: true },
  { name: "Team-based BLS flow", complete: true },
  { name: "Airway and compression quality", complete: true },
  { name: "Skills check and certificate issue", complete: false },
];

export default function LearnerExperienceShowcase() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 px-5 sm:px-6 overflow-hidden">
      <div className="orbital-ring w-[380px] h-[380px] bottom-[6%] right-[10%] animate-drift-slow opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle at 20% 40%, rgba(245,158,11,0.08), transparent 30%), radial-gradient(circle at 80% 60%, rgba(99,102,241,0.12), transparent 34%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <MotionReveal delay={0.06} y={34} className="relative order-2 xl:order-1">
          <div className="glass-card rounded-[32px] overflow-hidden border-[rgba(148,163,184,0.22)] shadow-[0_30px_120px_rgba(2,6,23,0.52)] surface-premium">
            <div className="border-b border-white/8 px-4 sm:px-6 py-4 bg-[rgba(255,255,255,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Learner Experience</p>
                <h3 className="text-white font-display text-xl sm:text-2xl font-bold mt-1">Course progress and certificate flow</h3>
              </div>
              <div className="badge badge-amber">In Progress</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-0">
              <div className="p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
                <div className="rounded-[24px] border border-white/8 bg-slate-950/40 p-5 mb-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-1">Current program</p>
                      <h4 className="text-white font-semibold">Basic Life Support</h4>
                    </div>
                    <PlayCircle className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                    <div className="h-full w-[82%] bg-gradient-to-r from-indigo-500 to-amber-300 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>82% complete</span>
                    <span>Estimated finish today</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {modules.map((module) => (
                    <motion.div
                      key={module.name}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.18 }}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        {module.complete ? (
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-300" />
                        ) : (
                          <BookOpen className="w-4.5 h-4.5 text-amber-300" />
                        )}
                        <span className="text-sm text-slate-200">{module.name}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        {module.complete ? "Complete" : "Active"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_38%)]">
                <div className="rounded-[28px] border border-[rgba(245,158,11,0.16)] bg-[linear-gradient(180deg,rgba(245,158,11,0.08),rgba(255,255,255,0.02))] p-5 mb-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[rgba(245,158,11,0.14)] flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Certificate ready on completion</p>
                      <p className="text-sm text-slate-300">Automatically issued and stored in the learner dashboard.</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-slate-950/40 p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Credential details</p>
                      <BadgeCheck className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div className="space-y-2 text-sm text-slate-200">
                      <div className="flex items-center justify-between gap-3">
                        <span>Program</span>
                        <span className="text-white">BLS Provider</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Status</span>
                        <span className="text-emerald-300">Pending issuance</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Delivery</span>
                        <span className="text-white">Live virtual cohort</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[rgba(148,163,184,0.2)] bg-[rgba(255,255,255,0.03)] p-4 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.32),transparent_68%)]" />
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">Certificate preview</p>
                        <p className="text-white font-semibold">NyxPulse BLS Completion</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.1)] flex items-center justify-center text-amber-300">
                        <Award className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 mb-3">
                      <div className="rounded-lg bg-slate-950/45 border border-white/8 p-2.5">
                        <p className="text-slate-500 mb-1">Credential ID</p>
                        <p className="text-white">NYX-BLS-48291</p>
                      </div>
                      <div className="rounded-lg bg-slate-950/45 border border-white/8 p-2.5">
                        <p className="text-slate-500 mb-1">Issue Date</p>
                        <p className="text-white">Apr 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-slate-500 border-t border-white/8 pt-2.5">
                      <span>Digitally verifiable</span>
                      <span>Ready for download</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                    <FileCheck className="w-4.5 h-4.5 text-indigo-300" />
                    What learners get
                  </div>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                      Elegant course progress with clear completion markers.
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                      Immediate access to certificates and completion history.
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                      A product experience that feels premium from enrollment to proof of completion.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal className="order-1 xl:order-2">
          <span className="badge badge-cyan mb-4">Learner Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight text-balance">
            Sophisticated for administrators.
            <span className="gradient-text"> Effortless for learners.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            The platform experience is designed to feel calm, clear, and premium. Learners always know what to complete next, while leaders get clean documentation and instant visibility.
          </p>

          <div className="space-y-4">
            {[
              "Focused progress tracking with no clutter.",
              "Automatic certificate access when requirements are complete.",
              "A polished digital workflow that reflects the quality of the training itself.",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-5 rounded-[22px] text-slate-200 text-sm leading-relaxed"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}