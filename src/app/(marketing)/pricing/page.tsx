"use client";

import Link from "next/link";
import { Check, Star, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingPage() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t.pricing.plans.free.name,
      price: t.pricing.plans.free.price,
      description: t.pricing.plans.free.desc,
      features: t.pricing.plans.free.features,
      cta: t.pricing.plans.free.cta,
      href: "/sign-up",
      color: "bg-slate-500/10 text-slate-400 border-white/5",
      buttonColor: "bg-surface-container-highest hover:bg-surface-bright text-on-surface border border-white/10",
    },
    {
      name: t.pricing.plans.creator.name,
      price: t.pricing.plans.creator.price,
      description: t.pricing.plans.creator.desc,
      features: t.pricing.plans.creator.features,
      cta: t.pricing.plans.creator.cta,
      href: "/dashboard/billing?plan=creator",
      recommended: true,
      color: "bg-[#bfff00]/20 text-[#bfff00] border-[#bfff00]/30",
      buttonColor: "lime-gradient text-black hover:scale-[1.02] shadow-xl shadow-[#bfff00]/10",
    },
    {
      name: t.pricing.plans.pro.name,
      price: t.pricing.plans.pro.price,
      description: t.pricing.plans.pro.desc,
      features: t.pricing.plans.pro.features,
      cta: t.pricing.plans.pro.cta,
      href: "/dashboard/billing?plan=pro",
      color: "bg-purple-500/10 text-purple-400 border-purple-900/30",
      buttonColor: "bg-surface-container-highest hover:bg-surface-bright text-on-surface border border-white/10",
    },
  ];

  return (
    <div className="min-h-screen bg-surface py-32 px-6 relative overflow-x-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-tertiary/5 blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bfff00]/20 text-[#bfff00] text-[0.6875rem] uppercase tracking-widest font-bold border border-[#bfff00]/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            {t.pricing.badge}
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-[0.85] text-on-surface">
            {t.pricing.heroTitle}
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-normal">
            {t.pricing.heroSubtitle}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col p-8 rounded-[2rem] bg-[#121212]/60 backdrop-blur-xl border-2 transition-all hover:scale-[1.01]",
                plan.recommended 
                  ? "border-[#bfff00] shadow-2xl shadow-[#bfff00]/5 z-10 md:-translate-y-2" 
                  : "border-white/5"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#bfff00] text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-[#bfff00]/20">
                  <Star className="w-3 h-3 fill-current" /> {t.pricing.mostPopular}
                </div>
              )}

              <div className="mb-8">
                <span className={cn("px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest border", plan.color)}>
                  {plan.name}
                </span>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-6xl font-headline font-black text-on-surface">{plan.price}€</span>
                  <span className="text-on-surface-variant/60 font-medium">{t.pricing.perMonth}</span>
                </div>
                <p className="mt-4 text-on-surface-variant text-sm leading-relaxed font-normal">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <div className="mt-0.5 p-0.5 rounded-full bg-white/5 text-primary">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="font-normal">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={cn(
                  "w-full py-4 rounded-xl text-center font-bold transition-all active:scale-95 text-sm",
                  plan.buttonColor
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Stripe Fees Footnote */}
        <p className="text-center text-xs text-on-surface-variant/40 mb-24 max-w-lg mx-auto font-normal">
          {t.pricing.stripeFootnote}
        </p>

        {/* Economic Comparison Block */}
        <div className="bg-[#121212]/80 border border-white/5 rounded-[2.5rem] p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <TrendingUp className="w-4 h-4" /> {t.pricing.comparisonAnalysis}
                </div>
                <h2 className="text-3xl font-headline font-black text-on-surface">{t.pricing.comparisonTitle}</h2>
              </div>
              <div className="bg-[#bfff00]/10 border border-[#bfff00]/20 rounded-2xl px-6 py-4">
                <span className="text-xs text-on-surface-variant font-bold block uppercase tracking-widest">{t.pricing.thresholdLabel}</span>
                <span className="text-2xl font-black text-[#bfff00]">{t.pricing.thresholdValue}</span>
              </div>
            </div>

            <p className="text-on-surface-variant leading-relaxed font-normal">
              {t.pricing.comparisonDesc}
            </p>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-surface p-6 rounded-2xl border border-white/5 space-y-2">
                <span className="text-xs text-on-surface-variant/60 font-bold uppercase tracking-wider block">{t.pricing.optionAFreeTitle}</span>
                <p className="text-on-surface font-medium">{t.pricing.optionAFreeDesc}</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[#bfff00]/85 font-bold text-xs uppercase tracking-wider block">{t.pricing.optionBCreatorTitle}</span>
                <p className="text-on-surface font-medium">{t.pricing.optionBCreatorDesc}</p>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant/60 text-center italic pt-4 font-normal">
              {t.pricing.comparisonConclusion}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
