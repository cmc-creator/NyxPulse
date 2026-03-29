"use client";

import Link from "next/link";
import { getAllLearningPaths } from "@/lib/courses";
import { ArrowRight, TrendingDown } from "lucide-react";

const badgeBg: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  green: "bg-green-500/10 text-green-300 border-green-500/30",
};

export default function LearningPaths() {
  const paths = getAllLearningPaths();

  return (
    <section className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge badge-amber mb-4">Smart Bundles</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Learning Paths Built for
            <span className="gradient-text"> Real Roles</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Skip the guesswork. Pick a path aligned with your job and competency level. Each bundle saves you money and delivers exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {paths.map((path) => (
            <Link
              key={path.id}
              href={`/learning-paths/${path.id}`}
              className="glass-card p-8 rounded-[28px] group hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{path.icon}</div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-semibold ${badgeBg[path.badge]}`}>
                  <TrendingDown className="w-3 h-3" />
                  Save ${path.savings}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {path.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {path.description}
              </p>

              <div className="flex items-center justify-between p-4 bg-[rgba(99,102,241,0.08)] rounded-xl border border-[rgba(99,102,241,0.1)] mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-1">Path Includes</div>
                  <div className="text-sm text-slate-300">{path.courseList.length} courses</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-1">Total Hours</div>
                  <div className="text-sm font-semibold text-indigo-300">{path.totalHours}h</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.1em] text-slate-500 mb-1">Bundle Price</div>
                  <div className="text-2xl font-bold text-white">${path.price}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                  <ArrowRight className="w-5 h-5 text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm mb-4">
            Enrolling as a team? Bundle pricing goes even deeper with volume discounts.
          </p>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-indigo-300 hover:text-white transition-colors group">
            View team pricing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
