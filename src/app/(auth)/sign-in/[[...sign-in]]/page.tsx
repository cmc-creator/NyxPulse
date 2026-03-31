import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="w-full max-w-4xl grid lg:grid-cols-2 gap-6 items-stretch">
      <div className="hidden lg:flex flex-col justify-between rounded-2xl border border-[rgba(124,58,237,0.25)] bg-[linear-gradient(165deg,rgba(124,58,237,0.2),rgba(6,8,16,0.86))] p-8">
        <div>
          <span className="badge badge-violet mb-4">Welcome Back</span>
          <h1 className="font-display text-4xl font-bold text-white leading-tight">
            Continue Your
            <br />
            Training Journey
          </h1>
          <p className="text-slate-300 mt-4 text-sm leading-relaxed">
            Sign in to access your courses, certificates, and team dashboard.
          </p>
        </div>
        <Link href="/courses" className="text-sm text-violet-300 hover:text-violet-200 transition-colors">
          Explore courses instead
        </Link>
      </div>

      <div className="rounded-2xl border border-[rgba(124,58,237,0.25)] bg-[rgba(6,8,16,0.8)] backdrop-blur-md p-4 sm:p-6 flex justify-center">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </section>
  );
}
