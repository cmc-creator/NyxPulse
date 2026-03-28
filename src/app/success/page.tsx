import Link from "next/link";
import { CheckCircle, ArrowRight, LayoutDashboard, BookOpen } from "lucide-react";
import StarField from "@/components/StarField";

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <StarField />
      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Animated check */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600/30 to-cyan-500/30 border border-violet-500/30 flex items-center justify-center animate-pulse-slow">
              <CheckCircle className="w-12 h-12 text-violet-400" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/10 to-cyan-500/10 blur-xl" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          You&apos;re enrolled! 🎉
        </h1>
        <p className="text-slate-400 text-lg mb-2">
          Your purchase was successful.
        </p>
        <p className="text-slate-500 text-sm mb-10">
          Your course has been added to your dashboard. Head there to start
          learning, track your progress, and earn your certificate.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link
            href="/courses"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Browse More Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Info footer */}
        <p className="mt-10 text-xs text-slate-600">
          A receipt has been sent to your email. Questions?{" "}
          <a
            href="mailto:info@nyxpulse.com"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
