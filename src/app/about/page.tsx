import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Heart, Target, Globe, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "About | NyxPulse",
  description:
    "NyxPulse is a product of NyxCollective LLC, delivering next-generation emergency and safety training for healthcare professionals.",
};

const values = [
  {
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    title: "Life-First",
    desc: "Everything we build, teach, and deliver is guided by one goal: preserving human life through better preparation.",
  },
  {
    icon: Target,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    title: "Evidence-Based",
    desc: "Our curriculum follows the latest AHA, FEMA, OSHA, and TJC guidelines — no outdated content, no shortcuts.",
  },
  {
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    title: "Accessible",
    desc: "Live, virtual, or hybrid — we meet your team where they are, from a rural clinic to an urban hospital system.",
  },
  {
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    title: "Immersive",
    desc: "Passive slide-shows don't save lives. Our training is scenario-driven, hands-on, and designed to create muscle memory.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <span className="badge badge-violet mb-4">Our Story</span>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white mb-5 leading-tight">
              Redefining Emergency{" "}
              <span className="gradient-text">Preparedness</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              NyxPulse was built on a simple belief: the people who save lives deserve training
              that actually prepares them — not just paperwork that checks a box.
            </p>
          </div>

          {/* Story section */}
          <div className="glass-card p-10 lg:p-14 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-cyan-500" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  Who We Are
                </h2>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    NyxPulse is the training division of <span className="text-violet-400 font-semibold">NyxCollective LLC</span> — a company dedicated to building tools, platforms, and programs that push the boundaries of what&apos;s possible in healthcare preparedness.
                  </p>
                  <p>
                    We bring together experienced instructors, emergency management professionals, and healthcare educators to design programs that are engaging, rigorous, and immediately applicable in the real world.
                  </p>
                  <p>
                    From a solo nurse needing BLS recertification to a 2,000-bed hospital overhaul of its emergency operations plan — we scale to fit.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Training Programs", value: "6+" },
                  { label: "Professionals Trained", value: "500+" },
                  { label: "Organizations Served", value: "50+" },
                  { label: "States Active", value: "Growing" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between bg-[rgba(124,58,237,0.08)] rounded-xl px-5 py-3 border border-[rgba(124,58,237,0.15)]"
                  >
                    <span className="text-slate-400 text-sm">{s.label}</span>
                    <span className="text-xl font-bold gradient-text font-display">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold text-white text-center mb-10">
              What Drives Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className={`p-7 rounded-2xl bg-gradient-to-br border ${v.bg} ${v.border} hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all`}
                  >
                    <div className={`w-11 h-11 rounded-xl ${v.bg} border ${v.border} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card p-10 text-center">
            <h3 className="font-display text-3xl font-bold text-white mb-3">
              Ready to Train with NyxPulse?
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Let&apos;s talk about how we can elevate your team&apos;s readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses" className="btn-primary px-8 py-3.5">
                <span className="flex items-center gap-2">
                  Browse Courses
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/contact" className="btn-outline px-8 py-3.5">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
