"use client";

import Link from "next/link";
import { LayoutDashboard, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { isFirebaseClientConfigured } from "@/lib/firebase/client-auth";

function SignedOutLinks() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/sign-in" className="btn-outline text-sm py-2 px-5">
        Sign In
      </Link>
      <Link href="/sign-up" className="btn-primary text-sm py-2 px-5">
        <span className="flex items-center gap-1.5">
          Get Started
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </div>
  );
}

export default function UserNav() {
  const { isLoaded, isSignedIn, displayName, signOut } = useAuth();

  if (!isFirebaseClientConfigured()) {
    return <SignedOutLinks />;
  }

  if (!isLoaded) {
    return <div className="h-9 w-28 rounded-lg bg-white/5 animate-pulse" />;
  }

  if (!isSignedIn) {
    return <SignedOutLinks />;
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="hidden lg:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-[rgba(124,58,237,0.1)]"
      >
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>
      <span className="hidden lg:inline text-sm text-slate-300">
        {displayName ?? "Account"}
      </span>
      <button onClick={() => void signOut()} className="btn-outline text-sm py-2 px-4">
        Sign Out
      </button>
    </div>
  );
}
