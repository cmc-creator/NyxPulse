"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import UserNav from "./UserNav";

const navLinks = [
  { href: "/#courses", label: "Courses" },
  { href: "/#features", label: "Why NyxPulse" },
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
          ? "bg-[rgba(4,4,10,0.95)] backdrop-blur-xl border-b border-[rgba(124,58,237,0.2)] shadow-[0_4px_30px_rgba(124,58,237,0.1)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl font-display tracking-tight">
            <span className="text-white">Nyx</span>
            <span className="gradient-text">Pulse</span>
          </span>
          <span className="hidden sm:inline text-[10px] text-slate-500 font-medium tracking-wider uppercase ml-1 mt-1">
            by NyxCollective
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[rgba(124,58,237,0.1)] transition-all duration-200"
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
          className="lg:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[rgba(4,4,10,0.98)] backdrop-blur-xl border-b border-[rgba(124,58,237,0.15)] px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-[rgba(124,58,237,0.1)] rounded-xl transition-all"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/courses" className="btn-outline text-sm text-center" onClick={() => setOpen(false)}>
              Browse Courses
            </Link>
            <Link href="/contact" className="btn-primary text-sm text-center" onClick={() => setOpen(false)}>
              <span>Book Training</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
