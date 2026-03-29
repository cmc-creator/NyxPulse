"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CalendarRange,
  ChartNoAxesCombined,
  CircleDollarSign,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";
import MotionReveal from "@/components/MotionReveal";

const readinessMetrics = [
  { label: "Active Learners", value: "184", change: "+12%" },
  { label: "Completion Rate", value: "94%", change: "+8%" },
  { label: "Expiring Certs", value: "17", change: "7 days" },
];

const activityFeed = [
  { title: "BLS cohort completed", meta: "Regional Medical Center · 24 learners" },
  { title: "ICS/HICS session scheduled", meta: "St. Helena Network · Apr 4" },
  { title: "De-escalation certificates issued", meta: "Community Clinics · 36 issued" },
];

export default function PlatformShowcase() {
  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div className="orbital-ring w-[460px] h-[460px] top-[6%] left-[8%] animate-drift-slow opacity-40" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[520px] pointer-events-none animate-drift-slow"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, rgba(245,158,11,0.06) 38%, transparent 72%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.95fr_1.45fr] gap-10 items-center">
        <MotionReveal>
          <span className="badge badge-cyan mb-4">Software Experience</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            A training platform that
            <span className="gradient-text"> feels as polished as the teams using it</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-xl mb-8">
            NyxPulse is not just a course catalog. It is a refined operating layer for readiness,
            enrollment, certificates, compliance tracking, and live program coordination.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: Layers3,
                title: "Executive visibility",
                detail: "See readiness across teams, cohorts, expirations, and program demand in one place.",
              },
              {
                icon: CircleDollarSign,
                title: "Transparent commercial model",
                detail: "Seat-based access for individuals, scoped proposals for groups, and clean enterprise planning.",
              },
              {
                icon: BadgeCheck,
                title: "Elegant compliance workflow",
                detail: "Certificates, rosters, and training histories are organized for audits without the clutter.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22 }}
                className="glass-card p-5 rounded-[24px]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[rgba(99,102,241,0.14)] border border-[rgba(99,102,241,0.24)] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{item.title}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1} y={34} className="relative">
          <div className="glass-card rounded-[32px] overflow-hidden border-[rgba(148,163,184,0.22)] shadow-[0_30px_120px_rgba(2,6,23,0.55)] surface-premium">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">NyxPulse Command</div>
            </div>

            <div className="grid grid-cols-[220px_1fr] min-h-[560px]">
              <div className="border-r border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5">
                <div className="text-white font-semibold text-sm mb-5">Operations</div>
                <div className="space-y-2">
                  {[
                    { icon: ChartNoAxesCombined, label: "Overview", active: true },
                    { icon: Users, label: "Learners" },
                    { icon: CalendarRange, label: "Cohorts" },
                    { icon: BadgeCheck, label: "Certificates" },
                    { icon: ShieldCheck, label: "Compliance" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
                        item.active
                          ? "bg-[rgba(99,102,241,0.16)] text-white border border-[rgba(99,102,241,0.24)]"
                          : "text-slate-400"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-[linear-gradient(180deg,rgba(99,102,241,0.16),rgba(245,158,11,0.08))] border border-[rgba(99,102,241,0.22)] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Licensing</p>
                  <p className="text-white text-2xl font-display font-bold mb-1">74 seats</p>
                  <p className="text-sm text-slate-300">Assigned across 4 active teams</p>
                </div>
              </div>

              <div className="p-6 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_34%)]">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">Readiness Dashboard</p>
                    <h3 className="text-white text-2xl font-display font-bold">Enterprise overview</h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                    <Bell className="w-4 h-4 text-amber-300" />
                    3 actions due
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {readinessMetrics.map((metric) => (
                    <motion.div
                      key={metric.label}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">{metric.label}</p>
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-white text-2xl font-display font-bold">{metric.value}</p>
                        <span className="text-xs text-amber-300">{metric.change}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4">
                  <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-white font-semibold">Program activity</p>
                      <span className="text-xs text-slate-500 uppercase tracking-[0.18em]">Last 30 days</span>
                    </div>
                    <div className="h-44 rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 flex items-end gap-3">
                      {[42, 58, 51, 74, 69, 83, 92].map((value, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2">
                          <div
                            className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-amber-300"
                            style={{ height: `${value}%` }}
                          />
                          <span className="text-[10px] text-slate-500">W{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-white font-semibold">Recent activity</p>
                      <Activity className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div className="space-y-4">
                      {activityFeed.map((item) => (
                        <motion.div
                          key={item.title}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.18 }}
                          className="rounded-xl border border-white/8 bg-slate-950/40 p-3.5"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <p className="text-sm text-white font-medium leading-snug">{item.title}</p>
                            <ArrowUpRight className="w-4 h-4 text-amber-300 flex-shrink-0" />
                          </div>
                          <p className="text-xs text-slate-400">{item.meta}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="hidden sm:block absolute -right-6 top-10 w-52 rounded-[24px] border border-[rgba(245,158,11,0.2)] bg-[rgba(10,12,18,0.92)] p-4 shadow-[0_16px_40px_rgba(2,6,23,0.45)] animate-drift"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2">Certificate Status</p>
            <p className="text-white text-2xl font-display font-bold mb-1">98.2%</p>
            <p className="text-sm text-slate-300">Up-to-date compliance coverage across current roster.</p>
          </motion.div>
        </MotionReveal>
      </div>
    </section>
  );
}