import StarField from "@/components/StarField";
import Link from "next/link";
import Image from "next/image";

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
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-black border border-white/10 p-1 shadow-[0_8px_18px_rgba(0,0,0,0.5)]">
            <Image
              src="/nyxpulse-logo.png"
              alt="NyxPulse logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
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
