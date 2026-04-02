"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import UserNav from "./UserNav";

const navLinks = [
  { href: "/#courses", label: "Programs" },
  { href: "/#features", label: "Approach" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(6,10,18,0.92)] backdrop-blur-xl border-b border-[rgba(99,102,241,0.24)] shadow-[0_8px_30px_rgba(2,6,23,0.38)]"
          : "bg-[linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.18),transparent)]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-44 lg:h-56 relative">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-full">
          <Link href="/" className="flex flex-col items-center justify-center gap-1 group whitespace-nowrap">
            <div className="relative w-20 h-20 rounded-[1.2rem] group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-[1.2rem] bg-[conic-gradient(from_0deg,rgba(226,232,240,0.15),rgba(226,232,240,0.85),rgba(148,163,184,0.25),rgba(248,250,252,0.9),rgba(226,232,240,0.15))] animate-[spin_7s_linear_infinite]" />
              <div className="relative h-full w-full rounded-[1.15rem] overflow-hidden border border-[rgba(255,255,255,0.16)] bg-[#020202] p-1">
                <Image
                  src="/nyxpulse-logo.png"
                  alt="NyxPulse logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
            <span className="font-bold text-xl font-display tracking-tight leading-none">
              <span className="text-white">Nyx</span>
              <span className="gradient-text">Pulse</span>
            </span>
          </Link>

          <button
            className="text-slate-300 hover:text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop brand and menu */}
        <div className="hidden lg:flex h-full flex-col items-center justify-start pt-2">
          <Link href="/" className="flex flex-col items-center justify-center gap-2 group whitespace-nowrap">
            <div className="relative w-40 h-40 rounded-[1.6rem] group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-[1.6rem] bg-[conic-gradient(from_0deg,rgba(226,232,240,0.15),rgba(226,232,240,0.85),rgba(148,163,184,0.25),rgba(248,250,252,0.9),rgba(226,232,240,0.15))] animate-[spin_7s_linear_infinite]" />
              <div className="relative h-full w-full rounded-[1.55rem] overflow-hidden border border-[rgba(255,255,255,0.16)] bg-[#020202] p-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.55)]">
                <Image
                  src="/nyxpulse-logo.png"
                  alt="NyxPulse logo"
                  width={192}
                  height={192}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col items-center leading-none">
              <span className="font-bold text-[2.15rem] font-display tracking-tight whitespace-nowrap">
                <span className="text-white">Nyx</span>
                <span className="gradient-text">Pulse</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wider mt-1">
                by nyxcollective LLC
              </span>
            </div>
          </Link>

          <ul className="flex items-center gap-1 mt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-[rgba(99,102,241,0.14)] transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop auth / CTA */}
        <div className="hidden lg:flex items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2">
          <UserNav />
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[rgba(6,10,18,0.98)] backdrop-blur-xl border-b border-[rgba(99,102,241,0.2)] px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-[rgba(99,102,241,0.14)] rounded-xl transition-all"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10">
            <UserNav />
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/courses" className="btn-outline text-sm text-center" onClick={() => setOpen(false)}>
              Browse Programs
            </Link>
            <Link href="/contact" className="btn-primary text-sm text-center" onClick={() => setOpen(false)}>
              <span>Book Team Training</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
