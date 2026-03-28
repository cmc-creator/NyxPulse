"use client";

import Link from "next/link";
import { Zap, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const footerLinks = {
  Training: [
    { label: "CPR / AED", href: "/courses/cpr-aed" },
    { label: "BLS", href: "/courses/bls" },
    { label: "De-escalation", href: "/courses/de-escalation" },
    { label: "Emergency Management", href: "/courses/emergency-management-healthcare" },
    { label: "ICS / HICS", href: "/courses/ics-hics" },
    { label: "OSHA Safety", href: "/courses/osha-safety" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#02020a] border-t border-[rgba(124,58,237,0.15)]">
      {/* Top glow line */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="xl:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl font-display">
                <span className="text-white">Nyx</span>
                <span className="gradient-text">Pulse</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Next-generation emergency and safety training for healthcare professionals. Live, virtual, and hybrid programs designed to save lives.
            </p>
            <p className="text-xs text-slate-600 mb-5">A product of <span className="text-slate-500">NyxCollective LLC</span></p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <a href="mailto:info@nyxpulse.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@nyxpulse.com
              </a>
              <a href="tel:+16238064918" className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors">
                <Phone className="w-4 h-4" />
                (623) 806-4918
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                United States
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { label: "Twitter / X", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Instagram", href: "#" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-violet-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} NyxCollective LLC. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs">
            Built with care for the people who save lives.
          </p>
        </div>
      </div>
    </footer>
  );
}
