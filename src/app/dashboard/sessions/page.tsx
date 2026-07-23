import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import SkillsSessionBooking from "@/components/SkillsSessionBooking";

export default async function SessionsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Skills Sessions</h1>
        <p className="text-slate-400 mt-1">
          Book instructor-led practice with Jeremy. Your NyxPulse certificate is earned in the
          course player; Red Cross digital certificates are optional and handled separately.
        </p>
      </div>

      <div className="glass-card p-5 border border-cyan-400/20 bg-cyan-500/5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-300 mt-0.5" />
        <div className="text-sm text-slate-300">
          <p className="text-white font-semibold mb-1">Two certificate paths</p>
          <p>
            1) NyxPulse Certificate of Completion from this platform.{" "}
            2) Official American Red Cross digital certificate when a class is taught and reported
            under an authorized Red Cross Training Provider agreement (Jeremy may teach through
            NyxPulse or other organizations).
          </p>
          <Link
            href="/certifications/american-red-cross"
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-white mt-2"
          >
            Read the pathway details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <Suspense
        fallback={<div className="glass-card p-8 text-slate-400">Loading booking form…</div>}
      >
        <SkillsSessionBooking />
      </Suspense>
    </div>
  );
}
