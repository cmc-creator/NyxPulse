"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Check, Clock, Users, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

const trainingTypes = [
  "CPR / AED",
  "Basic Life Support (BLS)",
  "De-escalation",
  "Emergency Management",
  "ICS / HICS",
  "OSHA Safety",
  "Custom Program",
  "Not sure yet",
];

const formats = ["Live / On-site", "Virtual", "Hybrid", "Flexible"];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    phone: "",
    trainingType: [] as string[],
    format: "",
    teamSize: "",
    message: "",
  });

  const toggleTraining = (t: string) => {
    setForm((prev) => ({
      ...prev,
      trainingType: prev.trainingType.includes(t)
        ? prev.trainingType.filter((x) => x !== t)
        : [...prev.trainingType, t],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to your backend/email service
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="badge badge-violet mb-4">Let&apos;s Connect</span>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white mb-4">
              Book Training or{" "}
              <span className="gradient-text">Get a Quote</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Tell us about your team and training needs — we&apos;ll craft a program that fits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info sidebar */}
            <div className="space-y-5">
              {[
                {
                  Icon: Mail,
                  title: "Email",
                  value: "info@nyxpulse.com",
                  href: "mailto:info@nyxpulse.com",
                  color: "text-violet-400",
                  bg: "bg-violet-500/10",
                },
                {
                  Icon: Phone,
                  title: "Phone",
                  value: "(623) 806-4918",
                  href: "tel:+16238064918",
                  color: "text-cyan-400",
                  bg: "bg-cyan-500/10",
                },
                {
                  Icon: MapPin,
                  title: "Location",
                  value: "United States (nationwide)",
                  href: null,
                  color: "text-amber-400",
                  bg: "bg-amber-500/10",
                },
              ].map(({ Icon, title, value, href, color, bg }) => (
                <div key={title} className="glass-card p-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{title}</div>
                    {href ? (
                      <a href={href} className={`${color} font-medium text-sm hover:underline`}>
                        {value}
                      </a>
                    ) : (
                      <span className="text-white text-sm font-medium">{value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick facts */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-white font-semibold">What to Expect</h3>
                {[
                  { Icon: Clock, text: "We respond within 1 business day" },
                  { Icon: Users, text: "Programs for 1 to 1,000+ staff" },
                  { Icon: Building2, text: "On-site, virtual, or hybrid delivery" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 text-sm text-slate-400">
                    <Icon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="glass-card p-14 text-center animate-pulse-glow">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-white mb-3">
                    Message Received!
                  </h2>
                  <p className="text-slate-400 mb-7">
                    Thanks for reaching out. A NyxPulse team member will be in touch within one business day.
                  </p>
                  <Link href="/courses" className="btn-primary px-8 py-3">
                    <span>Browse Courses</span>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-t-2xl" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">
                        Full Name <span className="text-violet-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(124,58,237,0.2)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">
                        Email <span className="text-violet-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@hospital.org"
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(124,58,237,0.2)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Organization</label>
                      <input
                        type="text"
                        value={form.org}
                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                        placeholder="General Hospital"
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(124,58,237,0.2)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(555) 555-5555"
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(124,58,237,0.2)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Training type multi-select */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Training Interest <span className="text-slate-600">(select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {trainingTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleTraining(t)}
                          className={`badge text-xs px-3 py-1.5 cursor-pointer transition-all ${
                            form.trainingType.includes(t)
                              ? "badge-violet border-violet-500"
                              : "bg-[rgba(255,255,255,0.04)] text-slate-400 border-[rgba(255,255,255,0.08)] hover:border-violet-500/40"
                          }`}
                        >
                          {form.trainingType.includes(t) && <Check className="w-3 h-3" />}
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Format */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Preferred Format</label>
                      <select
                        value={form.format}
                        onChange={(e) => setForm({ ...form, format: e.target.value })}
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(124,58,237,0.2)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a14]">Select format...</option>
                        {formats.map((f) => (
                          <option key={f} value={f} className="bg-[#0a0a14]">{f}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Estimated Team Size</label>
                      <select
                        value={form.teamSize}
                        onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(124,58,237,0.2)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a14]">Select size...</option>
                        {["1–5", "6–15", "16–30", "31–50", "51–100", "100+"].map((s) => (
                          <option key={s} value={s} className="bg-[#0a0a14]">{s} people</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your timeline, specific requirements, or any questions you have..."
                      className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(124,58,237,0.2)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
                    <span>Send Request</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-center text-xs text-slate-600">
                    By submitting you agree to our Privacy Policy. We never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
