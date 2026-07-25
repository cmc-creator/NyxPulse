"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, BookOpen, ShoppingCart } from "lucide-react";
import { isClerkPublishableConfigured } from "@/lib/clerk-config";

interface BuyButtonProps {
  courseSlug: string;
  price: number | null;
  hasCourse: boolean;
  className?: string;
}

function BuyButtonUI({
  courseSlug,
  price,
  hasCourse,
  className = "",
  isSignedIn,
  isLoaded,
}: BuyButtonProps & { isSignedIn: boolean; isLoaded: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!isLoaded) return;

    if (hasCourse) {
      router.push(`/dashboard/courses/${courseSlug}`);
      return;
    }

    if (price === null) {
      router.push("/contact");
      return;
    }

    if (!isSignedIn) {
      router.push(`/sign-up?redirect=/courses/${courseSlug}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug }),
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

  if (hasCourse) {
    return (
      <button
        onClick={handleClick}
        className={`btn-primary flex items-center justify-center gap-2 ${className}`}
      >
        <BookOpen className="w-4 h-4" />
        <span>Go to Course</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading || !isLoaded}
        className={`btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting to checkout…</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>
              {price === null
                ? "Contact Us to Enroll"
                : isSignedIn
                  ? `Enroll — $${price}`
                  : `Get Started — $${price}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
    </div>
  );
}

function BuyButtonWithClerk(props: BuyButtonProps) {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <BuyButtonUI
      {...props}
      isSignedIn={Boolean(isSignedIn)}
      isLoaded={isLoaded}
    />
  );
}

export default function BuyButton(props: BuyButtonProps) {
  if (!isClerkPublishableConfigured()) {
    return <BuyButtonUI {...props} isSignedIn={false} isLoaded />;
  }

  return <BuyButtonWithClerk {...props} />;
}
