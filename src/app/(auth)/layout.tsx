import StarField from "@/components/StarField";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <StarField />
      <div className="relative z-10 w-full flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl font-display">
            <span className="text-white">Nyx</span>
            <span className="gradient-text">Pulse</span>
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}
