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

// Silver tracer logo card — shared between mobile and desktop
function LogoCard({ size = 56 }: { size?: number }) {
  const rad = size <= 56 ? "rounded-xl" : "rounded-2xl";
  return (
    <div
      className={`relative group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
      style={{ width: size, height: size }}
    >
      {/* Animated silver conic ring */}
      <div
        className={`absolute inset-[-2px] ${rad} animate-[spin_6s_linear_infinite]`}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(148,163,184,0.1), rgba(226,232,240,0.9), rgba(255,255,255,0.7), rgba(148,163,184,0.1), rgba(100,116,139,0.05), rgba(226,232,240,0.9), rgba(148,163,184,0.1))",
        }}
      />
      {/* Inner card: pure black blending with logo */}
      <div
        className={`absolute inset-[2px] ${rad} overflow-hidden bg-black shadow-[0_6px_20px_rgba(0,0,0,0.7)]`}
        style={{ padding: 4 }}
      >
        <Image
          src="/nyxpulse-logo.png"
          alt="NyxPulse logo"
          width={size}
          height={size}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}

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
          ? "bg-[rgba(6,10,18,0.95)] backdrop-blur-xl border-b border-[rgba(99,102,241,0.2)] shadow-[0_8px_30px_rgba(2,6,23,0.4)]"
          : "bg-[rgba(2,6,23,0.5)] backdrop-blur-md"
      }`}
    >
      {/* ─── Desktop header: two rows centered, auth pinned right ─── */}
      <div className="hidden lg:block relative">
        {/* Auth pinned to right, vertically centered over the two rows */}
        <div className="absolute right-8 top-0 bottom-0 flex items-center gap-3 z-10">
          <UserNav />
        </div>

        {/* Row 1 + Row 2 centered */}
        <div className="flex flex-col items-center py-3 gap-1.5">
          {/* Brand lockup: logo + name stacked */}
          <Link href="/" className="group flex flex-col items-center gap-2">
            <LogoCard size={72} />
            <div className="flex flex-col items-center leading-none">
              <span className="font-bold text-2xl font-display tracking-tight">
                <span className="text-white">Nyx</span>
                <span className="gradient-text">Pulse</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest uppercase mt-0.5">
                by NyxCollective LLC
              </span>
            </div>
          </Link>

          {/* Nav links row */}
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-1.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-[rgba(99,102,241,0.14)] transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Mobile header: single row ─── */}
      <div className="lg:hidden flex items-center justify-between h-16 px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <LogoCard size={40} />
          <span className="font-bold text-lg font-display tracking-tight">
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

      {/* ─── Mobile menu ─── */}
      {open && (
        <div className="lg:hidden bg-[rgba(6,10,18,0.98)] backdrop-blur-xl border-t border-[rgba(99,102,241,0.15)] px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-3">
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
