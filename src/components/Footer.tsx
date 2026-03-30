import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

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
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "HIPAA Compliance", href: "/hipaa" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#05060b] border-t border-[rgba(99,102,241,0.14)]">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12">
          <div className="xl:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.24)] bg-[rgba(8,10,16,0.9)] shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Image
                  src="/black shiny np.png"
                  alt="NyxPulse logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-2xl font-display">
                <span className="text-white">Nyx</span>
                <span className="gradient-text">Pulse</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Luxury-grade emergency and safety training software for organizations that want credible delivery, clean operations, and measurable readiness.
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
                  className="w-9 h-9 rounded-lg bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] flex items-center justify-center text-slate-400 hover:text-amber-300 hover:border-indigo-400 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-amber-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} NyxCollective LLC. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs uppercase tracking-[0.16em]">
            Professional readiness, beautifully delivered.
          </p>
        </div>
      </div>
    </footer>
  );
}
