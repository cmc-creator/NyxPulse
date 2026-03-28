"use client";

import { Monitor, Users, Award, Clock, Layers, Headphones } from "lucide-react";

const features = [
  {
    icon: Monitor,
    color: "violet",
    title: "Live & Virtual Formats",
    desc: "Every program available in-person, fully virtual via our immersive platform, or as a hybrid blend — you choose what fits your team.",
  },
  {
    icon: Users,
    color: "cyan",
    title: "Team-Based Learning",
    desc: "Scenario-driven simulations and role-play exercises designed for real healthcare teams, not just individuals.",
  },
  {
    icon: Award,
    color: "amber",
    title: "Compliance-Ready Certs",
    desc: "Certificates aligned with AHA, FEMA ICS, OSHA, CMS Emergency Preparedness Rule, and The Joint Commission standards.",
  },
  {
    icon: Clock,
    color: "green",
    title: "Flexible Scheduling",
    desc: "On-site, on-demand, or scheduled cohort sessions — morning, evening, or weekend slots available to fit shift workers.",
  },
  {
    icon: Layers,
    color: "violet",
    title: "Modular Curriculum",
    desc: "Mix and match courses into bundles for comprehensive staff development, or pick a single focused program.",
  },
  {
    icon: Headphones,
    color: "cyan",
    title: "Ongoing Support",
    desc: "Post-training reinforcement materials, competency check-ins, and dedicated instructor access included with every program.",
  },
];

const colorMap: Record<string, string> = {
  violet: "from-violet-600/20 to-violet-900/10 border-violet-500/20 group-hover:border-violet-500/50",
  cyan: "from-cyan-600/15 to-cyan-900/10 border-cyan-500/20 group-hover:border-cyan-500/50",
  amber: "from-amber-600/15 to-amber-900/10 border-amber-500/20 group-hover:border-amber-500/50",
  green: "from-emerald-600/15 to-emerald-900/10 border-emerald-500/20 group-hover:border-emerald-500/50",
};

const iconColorMap: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  amber: "text-amber-400",
  green: "text-emerald-400",
};

const iconBgMap: Record<string, string> = {
  violet: "bg-violet-500/15",
  cyan: "bg-cyan-500/10",
  amber: "bg-amber-500/10",
  green: "bg-emerald-500/10",
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="badge badge-violet mb-4">Why NyxPulse</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Training Built for the{" "}
            <span className="gradient-text">Real World</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We don&apos;t just deliver certifications — we build confident responders through
            immersive, evidence-based experiences.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative p-7 rounded-2xl bg-gradient-to-br border transition-all duration-300 ${colorMap[f.color]}`}
              >
                <div className={`w-12 h-12 rounded-xl ${iconBgMap[f.color]} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${iconColorMap[f.color]}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
