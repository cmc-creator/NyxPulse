"use client";

import { Monitor, Users, Award, Clock, Layers, Headphones } from "lucide-react";

const features = [
  {
    icon: Monitor,
    color: "violet",
    title: "Premium multi-format delivery",
    desc: "Offer on-site, virtual, or hybrid programs with the same polished experience across every format.",
  },
  {
    icon: Users,
    color: "cyan",
    title: "Scenario-driven team performance",
    desc: "Role-based simulations sharpen communication, command flow, and response behavior under pressure.",
  },
  {
    icon: Award,
    color: "amber",
    title: "Compliance without visual clutter",
    desc: "Certificates and records align with AHA, FEMA ICS, OSHA, CMS preparedness, and TJC expectations.",
  },
  {
    icon: Clock,
    color: "green",
    title: "Shift-aware scheduling",
    desc: "Morning, evening, and weekend cohorts fit twenty-four hour operations and distributed teams.",
  },
  {
    icon: Layers,
    color: "violet",
    title: "Modular program design",
    desc: "Launch a single course or build tailored pathways for frontline staff, supervisors, and leadership groups.",
  },
  {
    icon: Headphones,
    color: "cyan",
    title: "Measured reinforcement",
    desc: "Follow-up assets and instructor support keep skill retention and readiness moving in the right direction.",
  },
];

const colorMap: Record<string, string> = {
  violet:
    "from-teal-500/18 to-teal-900/8 border-teal-400/25 group-hover:border-teal-300/65",
  cyan:
    "from-sky-500/16 to-sky-900/8 border-sky-400/20 group-hover:border-sky-300/60",
  amber:
    "from-amber-500/14 to-amber-900/10 border-amber-400/25 group-hover:border-amber-300/65",
  green:
    "from-rose-500/16 to-rose-900/8 border-rose-400/25 group-hover:border-rose-300/65",
};

const iconColorMap: Record<string, string> = {
  violet: "text-teal-300",
  cyan: "text-sky-300",
  amber: "text-amber-300",
  green: "text-rose-300",
};

const iconBgMap: Record<string, string> = {
  violet: "bg-teal-400/12",
  cyan: "bg-sky-400/12",
  amber: "bg-amber-400/12",
  green: "bg-rose-400/12",
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-violet mb-4">Operating Model</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            A refined system for
            <span className="gradient-text"> modern readiness</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            NyxPulse blends operational rigor, strong visual design, and practical instruction so teams respond faster, communicate clearly, and document readiness with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative p-7 rounded-2xl bg-gradient-to-br border transition-all duration-300 ${colorMap[f.color]}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${iconBgMap[f.color]} flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-6 h-6 ${iconColorMap[f.color]}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-300/90 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
