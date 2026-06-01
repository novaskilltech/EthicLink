"use client";

import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function CarouselRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  const activeLinks = links.filter(l => l.active).sort((a,b) => (a.order || 0) - (b.order || 0));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll positions to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Run once on load
      checkScroll();
      // Handle window resize
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [activeLinks.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Determine light theme status
  const isLightTheme = profile.theme === "LIGHT_GLASS" || (profile.bgColor && ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8"].includes(profile.bgColor.toLowerCase()));

  // Resolve shape class for card and buttons
  const getCardShapeClass = (style?: string) => {
    switch (style) {
      case "SOFT": return "rounded-2xl";
      case "SHARP": return "rounded-none";
      default: return "rounded-3xl"; // ROUNDED default for premium layout
    }
  };

  const getCardBgClass = (style?: string) => {
    if (style === "GHOST") {
      return isLightTheme
        ? "bg-transparent border border-slate-900/20 hover:border-slate-950 text-slate-900"
        : "bg-transparent border border-white/10 hover:border-white text-on-surface";
    }

    return isLightTheme
      ? "bg-slate-100/70 hover:bg-slate-200/90 text-slate-900 border border-slate-900/5 shadow-sm"
      : "glass-card hover:bg-surface-container-highest/60 text-on-surface";
  };

  const accentColor = profile.themeColor || (profile.theme === "MIDNIGHT_LIME" ? "#bfff00" : "#8083ff");

  return (
    <div className="min-h-screen text-on-surface selection:bg-primary/30 flex flex-col justify-between relative overflow-hidden">
      {/* Background Decoration */}
      {!profile.bgColor && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[130px]"></div>
          <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-tertiary/5 blur-[120px]"></div>
        </div>
      )}

      <main className="max-w-6xl mx-auto w-full px-6 pt-20 pb-24 flex-1 flex flex-col justify-center">
        {/* Profile Header */}
        <header className="text-center mb-12 flex flex-col items-center">
          <div 
            className="w-24 h-24 rounded-full overflow-hidden mb-6 bg-surface-container-high border-2 shadow-lg"
            style={{ borderColor: accentColor }}
          >
            {profile.image && (
              <img src={profile.image} alt={profile.displayName} className="w-full h-full object-cover" />
            ) || (
              <div className="w-full h-full flex items-center justify-center text-2xl font-black opacity-30">
                {profile.displayName?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <h1 className={cn("text-3xl font-black mb-2 tracking-tight", isLightTheme ? "text-slate-900" : "text-on-surface")}>
            {profile.displayName}
          </h1>
          <p className={cn("text-sm max-w-sm mx-auto font-medium", isLightTheme ? "text-slate-600" : "text-on-surface-variant")}>
            {profile.bio}
          </p>
        </header>

        {/* Carousel Container */}
        <div className="relative w-full group/carousel my-4">
          {/* Left Arrow Button */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border",
                isLightTheme 
                  ? "bg-white/90 border-slate-900/10 text-slate-900 hover:bg-white" 
                  : "bg-surface-container/90 border-white/10 text-on-surface hover:bg-surface-container-high"
              )}
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border",
                isLightTheme 
                  ? "bg-white/90 border-slate-900/10 text-slate-900 hover:bg-white" 
                  : "bg-surface-container/90 border-white/10 text-on-surface hover:bg-surface-container-high"
              )}
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* Horizontal Scroller */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-6 px-4 -mx-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {activeLinks.map((link) => (
              <div 
                key={link.id}
                className="snap-center shrink-0 w-[280px] sm:w-[320px]"
              >
                <TrackedLink
                  slug={profile.slug || "user"}
                  linkId={link.id}
                  url={link.url}
                  className={cn(
                    "flex flex-col h-[380px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl overflow-hidden group text-left border relative",
                    getCardShapeClass(profile.buttonStyle),
                    getCardBgClass(profile.buttonStyle)
                  )}
                >
                  {/* Card Image Container serving as full card background */}
                  <div className="absolute inset-0 z-0">
                    {link.thumbnailUrl ? (
                      <img 
                        src={link.thumbnailUrl} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-container-high opacity-20">
                        <Globe className="w-12 h-12" />
                      </div>
                    )}
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300" />
                  </div>

                  {/* Card Body - Content overlay showing on hover */}
                  <div className="relative z-10 p-6 flex flex-col justify-end h-full w-full">
                    {/* Label is always visible at the bottom or transitioning */}
                    <div className="space-y-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-lg leading-tight text-white drop-shadow-md">
                        {link.label}
                      </h3>
                      {link.description && (
                        <p className="text-xs leading-relaxed text-white/90 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-500 overflow-hidden">
                          {link.description}
                        </p>
                      )}
                      
                      <div 
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: accentColor }}
                      >
                        <span>Visiter le lien</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className={cn("text-[0.6rem] uppercase tracking-widest font-black opacity-30", isLightTheme ? "text-slate-900" : "text-on-surface-variant")}>
            Made with EthicLink
          </p>
        </footer>
      </main>
    </div>
  );
}
