"use client";

import { useTransition } from "react";
import { updateAppearance } from "@/app/actions/appearance";
import { LayoutPreset, Plan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

const LAYOUTS = [
  { id: LayoutPreset.STACK_VERTICAL, label: "Stack", icon: "☰", pro: false },
  { id: LayoutPreset.BENTO_GRID, label: "Bento", icon: "⊞", pro: false },
  { id: LayoutPreset.CAROUSEL, label: "Carousel", icon: "↔", pro: true },
  { id: LayoutPreset.MINIMAL, label: "Minimal", icon: "▫", pro: true },
];

export function LayoutSelector({ initialPreset, plan = Plan.FREE }: { initialPreset: LayoutPreset, plan?: Plan }) {
  const [isPending, startTransition] = useTransition();

  const handleSelect = (preset: LayoutPreset) => {
    startTransition(() => {
      updateAppearance({ layoutPreset: preset });
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-surface-container-low border border-white/5 rounded-3xl">
      {LAYOUTS.map((layout) => {
        const isLocked = layout.pro && plan === Plan.FREE;
        
        return (
          <button
            key={layout.id}
            disabled={isPending || isLocked}
            onClick={() => handleSelect(layout.id as LayoutPreset)}
            className={cn(
              "relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all group",
              initialPreset === layout.id 
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                : "border-white/5 hover:border-primary/30 bg-white/5 hover:bg-white/10",
              isLocked && "opacity-40 grayscale cursor-not-allowed"
            )}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform opacity-60 group-hover:opacity-100">{layout.icon}</span>
            <span className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">{layout.label}</span>
            
            {isLocked && (
              <div className="absolute top-2 right-2 p-1 bg-surface-container-highest rounded-full shadow-sm">
                <Lock className="w-3 h-3 text-on-surface-variant" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
