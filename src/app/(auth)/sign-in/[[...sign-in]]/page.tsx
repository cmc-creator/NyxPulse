import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="w-full max-w-md">
      <div className="rounded-2xl border border-[rgba(124,58,237,0.22)] bg-[rgba(6,8,16,0.82)] backdrop-blur-md p-4 sm:p-6 flex justify-center shadow-[0_20px_80px_rgba(2,6,23,0.5)]">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full bg-transparent shadow-none border-0",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton: "bg-slate-900/60 border border-slate-700 hover:bg-slate-800 text-white",
              formFieldInput: "bg-slate-900/60 border border-slate-700 text-white",
              formButtonPrimary: "bg-gradient-to-r from-indigo-500 to-amber-400 hover:opacity-90",
              footerActionText: "text-slate-400",
              footerActionLink: "text-indigo-300 hover:text-indigo-200",
            },
          }}
        />
      </div>
    </section>
  );
}
