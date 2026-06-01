"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";
import { Globe, ChevronDown } from "lucide-react";
import { CookieBanner } from "@/components/public/CookieBanner";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

function NavbarAndFooter({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="flex min-h-screen flex-col bg-surface overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md px-6 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
            EthicLink
          </Link>
          <div className="hidden md:flex items-center gap-8 font-inter tracking-tight text-sm font-medium">
            <a href="#features" className="text-on-surface-variant hover:text-on-surface transition-colors">{t.nav.features}</a>
            <a href="#showcase" className="text-on-surface-variant hover:text-on-surface transition-colors">{t.nav.showcase}</a>
            <Link href="/pricing" className="text-on-surface-variant hover:text-on-surface transition-colors">{t.nav.pricing}</Link>
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-all text-xs font-bold border border-white/10"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLangObj.flag} {currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl bg-surface-container-high border border-white/10 shadow-2xl p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2 text-on-surface-variant hover:text-on-surface"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/login" className="text-on-surface-variant hover:text-on-surface transition-colors">{t.nav.signIn}</Link>
            <Link href="/login" className="primary-gradient text-on-primary px-5 py-2 rounded-xl font-bold hover:scale-105 transition-transform duration-200">
              {t.nav.signUp}
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-4">
            {/* Small screen language switcher */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="p-2 rounded-lg bg-white/5 text-on-surface border border-white/10"
              >
                <Globe className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-surface-container-high border border-white/10 shadow-xl p-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2 text-on-surface-variant hover:text-on-surface"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/login" className="text-on-surface font-bold text-sm">
              {t.nav.signIn}
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1">{children}</div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-surface border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-4 md:space-y-0 text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">
          <div>© 2026 novaskilltech</div>
          <div className="flex gap-8">
            <Link href="/pricing" className="hover:text-primary transition-colors">{t.nav.pricing}</Link>
            <a href="mailto:hello@ethiclink.local" className="hover:text-primary transition-colors">{t.nav.contact}</a>
            <a href="#features" className="hover:text-primary transition-colors">{t.nav.status}</a>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <NavbarAndFooter>{children}</NavbarAndFooter>
    </LanguageProvider>
  );
}
