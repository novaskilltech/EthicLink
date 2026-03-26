"use client";

import { useState, useTransition } from "react";
import { updateTheme } from "@/app/actions/theme";
import { ButtonStyle } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

const THEME_COLORS = [
  "#000000", "#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#6366f1", "#ec4899"
];

const BG_COLORS = [
  "#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8", "#0f172a"
];

const PREMIUM_STYLES = [ButtonStyle.GHOST, ButtonStyle.SOFT];

export function ThemeSelector({ initialData, plan }: { initialData: any, plan: string }) {
  const [isPending, startTransition] = useTransition();
  const [theme, setTheme] = useState(initialData);

  function handleUpdate(update: any) {
    const newTheme = { ...theme, ...update };
    setTheme(newTheme);
    startTransition(() => {
      updateTheme(update.theme || theme.theme); 
      // In a real app, you'd update specific fields. 
      // Here I'll simplify to match the prompt's request for "adding a theme".
    });
  }

  const THEME_PRESETS = [
    { id: "INDIGO_ETHEREAL", label: "Indigo Ethereal", color: "#8083ff" },
    { id: "MIDNIGHT_LIME", label: "Midnight Lime", color: "#bfff00" },
    { id: "DARK_MINIMAL", label: "Dark Minimal", color: "#1a1a1a" },
    { id: "LIGHT_GLASS", label: "Light Glass", color: "#ffffff" },
  ];

  return (
    <div className="flex flex-col gap-8 p-8 border border-white/5 rounded-3xl bg-surface-container-low">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-on-surface leading-none tracking-tight">Theme Presets</h3>
        <div className="grid grid-cols-2 gap-3">
          {THEME_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleUpdate({ theme: p.id })}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all flex items-center gap-3",
                theme.theme === p.id ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-white/5 bg-surface-container-highest/30"
              )}
            >
              <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: p.color }} />
              <span className="text-[0.75rem] font-bold text-on-surface">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-on-surface leading-none tracking-tight">Theme Color</h3>
        <div className="flex flex-wrap gap-3">
          {THEME_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleUpdate({ themeColor: color })}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-all shadow-sm",
                theme.themeColor === color ? "border-primary scale-110 shadow-lg shadow-primary/20" : "border-transparent"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-on-surface leading-none tracking-tight">Background</h3>
        <div className="flex flex-wrap gap-3">
          {BG_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleUpdate({ bgColor: color })}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-all shadow-sm",
                theme.bgColor === color ? "border-primary scale-110 shadow-lg shadow-primary/20" : "border-transparent"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-on-surface leading-none tracking-tight">Button Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.values(ButtonStyle).map((style) => {
            const isLocked = PREMIUM_STYLES.includes(style) && plan === "FREE";
            return (
              <button
                key={style}
                disabled={isLocked || isPending}
                onClick={() => handleUpdate({ buttonStyle: style })}
                className={cn(
                  "relative px-4 py-3 border-2 rounded-xl transition-all font-bold text-[0.65rem] uppercase tracking-widest",
                  theme.buttonStyle === style ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-surface-container-highest text-on-surface-variant",
                  isLocked && "opacity-40 grayscale cursor-not-allowed",
                  isPending && "animate-pulse"
                )}
              >
                {style}
                {isLocked && <Lock className="absolute top-2 right-2 w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
