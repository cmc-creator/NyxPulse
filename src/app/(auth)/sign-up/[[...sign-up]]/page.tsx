import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <section className="w-full max-w-md">
      <div className="rounded-2xl border border-[rgba(14,165,233,0.22)] bg-[rgba(6,8,16,0.82)] backdrop-blur-md p-4 sm:p-6 flex justify-center shadow-[0_20px_80px_rgba(2,6,23,0.5)]">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-indigo-300 hover:text-indigo-200">
          Sign in here
        </Link>
        .
      </p>
    </section>
  );
}
