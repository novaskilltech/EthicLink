import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "../../public/SocialLinks";

export function MinimalRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  const activeLinks = links.filter(l => l.active).sort((a,b) => (a.order || 0) - (b.order || 0));

  // Determine light theme status
  const isLightTheme = !!(profile.theme === "LIGHT_GLASS" || (profile.bgColor && ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8"].includes(profile.bgColor.toLowerCase())));
  const accentColor = profile.themeColor || (profile.theme === "MIDNIGHT_LIME" ? "#bfff00" : "#8083ff");

  // Determine font classes based on profile settings if any, otherwise elegant serif/sans mix
  const displayFontClass = "font-serif tracking-tight";

  return (
    <div className="min-h-screen text-on-surface selection:bg-primary/30 flex flex-col justify-between relative overflow-hidden">
      <main className="max-w-xl mx-auto w-full px-6 pt-24 pb-24 flex-1 flex flex-col justify-center">
        {/* Minimal Profile Header */}
        <header className="mb-16 text-left">
          <div className="flex items-center gap-4 mb-6">
            {profile.image ? (
              <div 
                className="w-12 h-12 rounded-full overflow-hidden border bg-surface-container-high"
                style={{ borderColor: accentColor }}
              >
                <img src={profile.image} alt={profile.displayName} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border bg-surface-container-high"
                style={{ borderColor: accentColor }}
              >
                {profile.displayName?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <h1 className={cn("text-xl font-bold tracking-tight", isLightTheme ? "text-slate-900" : "text-on-surface")}>
                {profile.displayName}
              </h1>
              <p className={cn("text-xs opacity-60 font-medium")}>
                @{profile.slug}
              </p>
              <div className="flex justify-start pt-1">
                <SocialLinks profile={profile} isLightTheme={isLightTheme} />
              </div>
            </div>
          </div>
          
          {profile.bio && (
            <p className={cn(
              "text-sm leading-relaxed max-w-sm font-light", 
              isLightTheme ? "text-slate-600" : "text-on-surface-variant/90"
            )}>
              {profile.bio}
            </p>
          )}
        </header>

        {/* Minimal Links List */}
        <div className="divide-y divide-current/10 border-t border-b border-current/10">
          {activeLinks.map((link) => (
            <TrackedLink
              key={link.id}
              slug={profile.slug || "user"}
              linkId={link.id}
              url={link.url}
              className="group block py-6 transition-all duration-300 relative text-left"
            >
              {/* Subtle accent hover background glow */}
              <div className="absolute inset-0 bg-current/0 group-hover:bg-current/[0.02] -mx-4 px-4 transition-colors rounded-lg -z-10" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className={cn(
                    "font-medium text-base group-hover:underline decoration-1 underline-offset-4 transition-all flex items-center gap-1.5",
                    isLightTheme ? "text-slate-900" : "text-on-surface"
                  )}>
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </h3>
                  {link.description && (
                    <p className={cn(
                      "text-xs font-light leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden",
                      isLightTheme ? "text-slate-500" : "text-on-surface-variant/75"
                    )}>
                      {link.description}
                    </p>
                  )}
                </div>
              </div>
            </TrackedLink>
          ))}
        </div>

        <footer className="mt-20 text-left">
          <p className={cn("text-[0.6rem] uppercase tracking-widest font-black opacity-30", isLightTheme ? "text-slate-900" : "text-on-surface-variant")}>
            EthicLink / {profile.displayName}
          </p>
        </footer>
      </main>
    </div>
  );
}
