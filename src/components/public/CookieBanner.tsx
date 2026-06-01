"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck } from "lucide-react";

export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ethiclink_cookie_consent");
    if (!consent) {
      // Small delay before showing banner for visual comfort
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ethiclink_cookie_consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ethiclink_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="glass-card p-6 rounded-2xl border border-white/10 bg-surface-container-high/90 backdrop-blur-2xl shadow-2xl flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#bfff00]/20 text-[#bfff00] shrink-0 border border-[#bfff00]/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-on-surface">Confidentialité & Cookies</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {t.cookie.text}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 justify-end pt-2">
          <button 
            onClick={handleDecline} 
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-on-surface text-xs font-bold transition-all border border-white/5"
          >
            {t.cookie.decline}
          </button>
          <button 
            onClick={handleAccept} 
            className="px-4 py-2 rounded-xl lime-gradient text-black text-xs font-black transition-all hover:scale-[1.02] shadow-lg shadow-[#bfff00]/10"
          >
            {t.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
