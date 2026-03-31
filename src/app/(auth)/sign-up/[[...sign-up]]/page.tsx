import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <section className="w-full max-w-4xl grid lg:grid-cols-2 gap-6 items-stretch">
      <div className="hidden lg:flex flex-col justify-between rounded-2xl border border-[rgba(14,165,233,0.25)] bg-[linear-gradient(165deg,rgba(14,165,233,0.2),rgba(6,8,16,0.86))] p-8">
        <div>
          <span className="badge badge-violet mb-4">Get Started</span>
          <h1 className="font-display text-4xl font-bold text-white leading-tight">
            Build Skills That
            <br />
            Save Lives
          </h1>
          <p className="text-slate-300 mt-4 text-sm leading-relaxed">
            Create your account to start courses, track progress, and earn certifications.
          </p>
        </div>
        <Link href="/about" className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
          Learn more about NyxPulse
        </Link>
      </div>

      <div className="rounded-2xl border border-[rgba(14,165,233,0.25)] bg-[rgba(6,8,16,0.8)] backdrop-blur-md p-4 sm:p-6 flex justify-center">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </section>
  );
}
