"use client";

import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, ArrowRight } from "lucide-react";

export default function UserNav() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="w-8 h-8 rounded-full bg-[rgba(124,58,237,0.2)] animate-pulse" />;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="hidden lg:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-[rgba(124,58,237,0.1)]"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <UserButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <SignInButton mode="modal">
        <button className="hidden lg:block btn-outline text-sm py-2 px-5">
          Sign In
        </button>
      </SignInButton>
      <Link href="/sign-up" className="btn-primary text-sm py-2 px-5">
        <span className="flex items-center gap-1.5">
          Get Started
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </div>
  );
}
