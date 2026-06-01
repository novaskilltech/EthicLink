import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { ArrowRight } from "lucide-react";

export function StackRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  const activeLinks = links.filter(l => l.active).sort((a,b) => (a.order || 0) - (b.order || 0));

  // Determine light theme status
  const isLightTheme = profile.theme === "LIGHT_GLASS" || (profile.bgColor && ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8"].includes(profile.bgColor.toLowerCase()));

  // Resolve button shapes
  const getButtonShapeClass = (style?: string) => {
    switch (style) {
      case "SOFT": return "rounded-2xl";
      case "SHARP": return "rounded-none";
      case "GHOST": return "rounded-2xl border-2";
      default: return "rounded-full"; // ROUNDED
    }
  };

  const getButtonBgClass = (style?: string) => {
    if (style === "GHOST") {
      return isLightTheme 
        ? "bg-transparent border-slate-900/20 hover:border-slate-950 text-slate-900" 
        : "bg-transparent border-white/20 hover:border-primary text-on-surface";
    }
    
    return isLightTheme
      ? "bg-slate-100 hover:bg-slate-200/80 text-slate-900 border border-slate-900/5 shadow-sm"
      : "bg-surface-container hover:bg-surface-container-high text-on-surface border border-white/5";
  };

  const accentColor = profile.themeColor || (profile.theme === "MIDNIGHT_LIME" ? "#bfff00" : "#8083ff");

  return (
    <div className={cn("min-h-screen text-on-surface selection:bg-primary/30")}>
      <main className="max-w-xl mx-auto px-6 pt-20 pb-24">
        {/* Profile Header */}
        <header className="text-center mb-12 flex flex-col items-center">
          <div 
            className="w-24 h-24 rounded-full overflow-hidden mb-6 bg-surface-container-high border-2"
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
          <h1 className={cn("text-2xl font-black mb-2", isLightTheme ? "text-slate-900" : "text-on-surface")}>
            {profile.displayName}
          </h1>
          <p className={cn("text-sm max-w-sm mx-auto font-medium", isLightTheme ? "text-slate-600" : "text-on-surface-variant")}>
            {profile.bio}
          </p>
        </header>

        {/* Links List */}
        <div className="space-y-4">
          {activeLinks.map((link) => (
            <TrackedLink
              key={link.id}
              slug={profile.slug || "user"}
              linkId={link.id}
              url={link.url}
              className={cn(
                "group block w-full p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                getButtonShapeClass(profile.buttonStyle),
                getButtonBgClass(profile.buttonStyle)
              )}
            >
              <div className="flex items-center justify-between">
                {/* Thumbnail Preview on Public profile if exists */}
                {link.thumbnailUrl && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/5 shrink-0 mr-4 shadow-sm">
                    <img src={link.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex-1 text-center">
                  <span className="font-bold text-base">{link.label}</span>
                  {link.description && (
                    <p className={cn("text-xs mt-1 font-medium opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden", isLightTheme ? "text-slate-500" : "text-on-surface-variant/75")}>
                      {link.description}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-current opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </TrackedLink>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <p className={cn("text-[0.6rem] uppercase tracking-widest font-black opacity-30", isLightTheme ? "text-slate-900" : "text-on-surface-variant")}>
            Made with EthicLink
          </p>
        </footer>
      </main>
    </div>
  );
}
