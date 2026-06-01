"use client";

import { useState, useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { AlertCircle, Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradeCardProps {
  plan: "CREATOR" | "PRO";
  currentPlan?: string;
  price: string;
  features: string[];
  color: string;
  buttonClass: string;
}

export function UpgradeCard({ plan, currentPlan, price, features, color, buttonClass }: UpgradeCardProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = () => {
    setError(null);

    startTransition(async () => {
      const result = await createCheckoutSession(plan);

      if ("url" in result && result.url) {
        window.location.href = result.url;
        return;
      }

      setError(result.error || "Checkout is not available yet.");
    });
  };

  const isCurrent = currentPlan === plan;

  return (
    <div className={cn(
      "flex flex-col p-8 rounded-3xl border-2 transition-all bg-card",
      isCurrent ? "border-primary shadow-lg" : "border-slate-100"
    )}>
      <div className="mb-6">
        <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase", color)}>
          {plan}
        </span>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-black">{price}€</span>
          <span className="text-muted-foreground font-medium">/mois</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 mb-8">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 mt-0.5 text-emerald-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpgrade}
        disabled={isPending || isCurrent}
        className={cn(
          "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50",
          buttonClass
        )}
      >
        {isPending ? "Initialisation..." : isCurrent ? "Plan Actuel" : (
          <>
            <Zap className="w-4 h-4 fill-current" />
            Passer à {plan}
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-yellow-400/20 bg-yellow-500/10 p-3 text-xs font-medium text-yellow-100">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
