import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default async function SessionsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Live Sessions</h1>
        <p className="text-slate-400 mt-1">
          Instructor-led training is scheduled with our team.
        </p>
      </div>

      <div className="glass-card p-10 text-center">
        <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">
          Book live or virtual training
        </h3>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Self-serve session scheduling is coming soon. Contact us to reserve an
          instructor-led class for your team.
        </p>
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Contact Training Team <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
