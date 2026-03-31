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
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20 lg:h-28">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.4rem] overflow-hidden border border-[rgba(148,163,184,0.24)] bg-[rgba(8,10,16,0.9)] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_18px_rgba(99,102,241,0.35)]">
            <Image
              src="/black shiny np.png"
              alt="NyxPulse logo"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-bold text-[1.8rem] lg:text-[2.4rem] font-display tracking-tight leading-none">
            <span className="text-white">Nyx</span>
            <span className="gradient-text">Pulse</span>
          </span>
          <span className="hidden sm:inline text-[11px] lg:text-xs text-slate-500 font-medium tracking-wider uppercase ml-1 mt-1">
            by NyxCollective
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
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

        {/* Auth / CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <UserNav />
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-slate-300 hover:text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
