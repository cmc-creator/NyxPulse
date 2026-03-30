import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, DollarSign, Users, Zap, Copy, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "Affiliate Program | NyxPulse",
  description: "Earn recurring commission by referring NyxPulse to your network.",
};

export default function AffiliatePage() {
  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-indigo-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl font-bold text-white mb-4">Affiliate Program</h1>
              <p className="text-slate-300 text-lg">
                Earn recurring commission by introducing NyxPulse to healthcare organizations, training departments, and safety-focused teams.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: DollarSign,
                title: "Recurring Revenue",
                desc: "Earn 20% commission on all referred subscriptions, paid monthly",
              },
              {
                icon: Users,
                title: "Partner Support",
                desc: "Dedicated affiliate manager, co-marketing resources, and priority support",
              },
              {
                icon: Zap,
                title: "Easy Setup",
                desc: "Get your unique affiliate link in minutes. No coding required.",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-card p-6 rounded-2xl border border-[rgba(99,102,241,0.2)]">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-300" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  desc: "Join our affiliate program. We review applications within 24 hours.",
                },
                {
                  step: "2",
                  title: "Get Your Link",
                  desc: "Receive your unique affiliate link and promotional materials.",
                },
                {
                  step: "3",
                  title: "Share & Refer",
                  desc: "Share with your network via email, social media, or in conversations.",
                },
                {
                  step: "4",
                  title: "Earn Commission",
                  desc: "Get paid 20% recurring commission every month they remain a customer.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-300 font-bold">{step}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{title}</h3>
                    <p className="text-slate-400 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="glass-card p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
              <h3 className="text-xl font-bold text-white mb-4">Commission Breakdown</h3>
              <div className="space-y-3">
                {[
                  { tier: "Base", rate: "20%", desc: "All referred subscriptions" },
                  { tier: "Tier 1", rate: "25%", desc: "When you refer 5+ customers in a month" },
                  { tier: "Tier 2", rate: "+ bonus", desc: "Top performers get quarterly bonuses" },
                ].map((item) => (
                  <div key={item.tier} className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
                    <div>
                      <div className="font-semibold text-white">{item.tier}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    <div className="text-lg font-bold text-emerald-300">{item.rate}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Who Should Apply?</h3>
              <ul className="space-y-3 text-slate-300">
                {[
                  "Healthcare consultants & industry advisors",
                  "Learning & development professionals",
                  "Safety training coordinators",
                  "Management consultants",
                  "HR and compliance specialists",
                  "Industry associations & networks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-card p-10 lg:p-14 mb-10 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Example Earnings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Scenario: 3 Referrals/Month</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">3 customers × $279 (avg annual team plan)</span>
                    <span className="text-white">$837</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Commission at 20%</span>
                    <span className="text-white">$167.40/month</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-[rgba(99,102,241,0.2)]">
                    <span className="text-indigo-300">Annual recurring</span>
                    <span className="text-indigo-300">$2,008.80</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Scenario: 10 Referrals/Month</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">10 customers × $279</span>
                    <span className="text-white">$2,790</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Commission at 25% (tier 1)</span>
                    <span className="text-white">$697.50/month</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-[rgba(99,102,241,0.2)]">
                    <span className="text-indigo-300">Annual recurring</span>
                    <span className="text-indigo-300">$8,370</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to earn?</h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Join hundreds of healthcare professionals and consultants earning passive income by recommending NyxPulse.
            </p>
            <a href="mailto:affiliate@nyxpulse.com" className="button button-pulse inline-flex items-center gap-2">
              Apply for Affiliate Program
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
