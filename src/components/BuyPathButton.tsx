"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, ShoppingCart } from "lucide-react";

interface BuyPathButtonProps {
  pathId: string;
  price: number;
  className?: string;
}

export default function BuyPathButton({
  pathId,
  price,
  className = "",
}: BuyPathButtonProps) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push(`/sign-up?redirect=/learning-paths/${pathId}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading || !isLoaded}
        className={`button button-pulse w-full lg:w-auto disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Redirecting to checkout…
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            {isSignedIn ? `Enroll in Path ($${price})` : `Get Started — $${price}`}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
