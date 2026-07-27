import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <section className="w-full max-w-md">
      <AuthForm mode="sign-in" />
    </section>
  );
}
