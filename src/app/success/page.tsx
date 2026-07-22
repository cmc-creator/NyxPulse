import { Suspense } from "react";
import SuccessClient from "./SuccessClient";
import StarField from "@/components/StarField";
import { Loader2 } from "lucide-react";

function SuccessFallback() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <StarField />
      <div className="relative z-10 text-center">
        <Loader2 className="w-10 h-10 text-violet-400 animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Loading checkout status…</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessClient />
    </Suspense>
  );
}
