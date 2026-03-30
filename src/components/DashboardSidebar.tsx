"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  CreditCard,
  Menu,
  X,
  Users,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/courses", label: "My Courses", icon: BookOpen, exact: false },
  { href: "/dashboard/sessions", label: "Live Sessions", icon: Calendar, exact: false },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award, exact: false },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, exact: false },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard, exact: false },
  { href: "/dashboard/org", label: "Team Portal", icon: Users, exact: false },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[rgba(2,2,10,0.95)] backdrop-blur-xl border-b border-[rgba(124,58,237,0.15)] px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-[rgba(148,163,184,0.24)] bg-[rgba(8,10,16,0.9)]">
            <Image
              src="/black shiny np.png"
              alt="NyxPulse logo"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-bold text-lg font-display">
            <span className="text-white">Nyx</span>
            <span className="gradient-text">Pulse</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <UserButton />
          <button onClick={() => setOpen(!open)} className="text-slate-400 p-1">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 pt-14">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative bg-[#02020a] h-full w-64 border-r border-[rgba(124,58,237,0.15)] p-5">
            <nav className="space-y-1 mt-2">
              {navItems.map(({ href, label, icon: Icon, exact }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    isActive(href, exact)
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                      : "text-slate-400 hover:text-white hover:bg-[rgba(124,58,237,0.08)]"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 bg-[#02020a] border-r border-[rgba(124,58,237,0.12)] z-30">
        {/* Logo */}
        <div className="px-5 h-16 flex items-center border-b border-[rgba(124,58,237,0.1)]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.24)] bg-[rgba(8,10,16,0.9)] shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <Image
                src="/black shiny np.png"
                alt="NyxPulse logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="font-bold text-xl font-display">
              <span className="text-white">Nyx</span>
              <span className="gradient-text">Pulse</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive(href, exact)
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30 shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                  : "text-slate-400 hover:text-white hover:bg-[rgba(124,58,237,0.08)]"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[rgba(124,58,237,0.1)]">
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500">Signed in</div>
              <Link href="/" className="text-xs text-slate-400 hover:text-violet-400 transition-colors truncate block">
                ← Back to site
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
