import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  return (
    <section className="w-full max-w-md">
      <AuthForm mode="sign-up" />
    </section>
  );
}
