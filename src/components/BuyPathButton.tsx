"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface BuyPathButtonProps {
  pathId: string;
  className?: string;
}

export default function BuyPathButton({
  pathId,
  className = "",
}: BuyPathButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    router.push(`/learning-paths/${pathId}#trainings`);
  };

  return (
    <button
      onClick={handleClick}
      className={`button button-pulse w-full lg:w-auto ${className}`}
    >
      View trainings in this track
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
