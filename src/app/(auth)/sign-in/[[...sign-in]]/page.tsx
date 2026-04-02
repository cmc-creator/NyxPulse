import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="w-full max-w-md">
      <div className="rounded-2xl border border-[rgba(124,58,237,0.22)] bg-[rgba(6,8,16,0.82)] backdrop-blur-md p-4 sm:p-6 flex justify-center shadow-[0_20px_80px_rgba(2,6,23,0.5)]">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        If the sign-in form does not load, go directly to{" "}
        <Link href="/sign-up" className="text-indigo-300 hover:text-indigo-200">
          account creation
        </Link>
        .
      </p>
    </section>
  );
}
