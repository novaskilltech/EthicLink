import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { SocialLinks } from "../../public/SocialLinks";
import { 
  ArrowRight, 
  Mail, 
  ExternalLink, 
  Palette, 
  Share2,
  AtSign,
  Globe
} from "lucide-react";

export function BentoRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  // Use 'active' from new schema
  const activeLinks = links.filter(l => l.active).sort((a,b) => (a.order || 0) - (b.order || 0));
  const quickLinks = activeLinks.slice(0, 3);
  const fallbackImages = [
    "/images/launch_collection.png",
    "/images/portfolio_drop.png",
    "/images/design_notes.png",
    "/images/bento_master.png",
  ];

  // Determine light theme status
  const isLightTheme = !!(profile.theme === "LIGHT_GLASS" || (profile.bgColor && ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8"].includes(profile.bgColor.toLowerCase())));

  // Resolve accent color
  const accentColor = profile.themeColor || (profile.theme === "MIDNIGHT_LIME" ? "#bfff00" : "#8083ff");

  // Resolve shape class
  const getShapeClass = (style?: string) => {
    switch (style) {
      case "SOFT": return "rounded-xl";
      case "SHARP": return "rounded-none";
      default: return "rounded-3xl"; // ROUNDED default for premium bento
    }
  };

  const getTileBgClass = (style?: string) => {
    if (style === "GHOST") {
      return isLightTheme
        ? "bg-transparent border border-slate-900/20 hover:border-slate-950 text-slate-900"
        : "bg-transparent border border-white/10 hover:border-white text-on-surface";
    }

    return isLightTheme
      ? "bg-slate-100/70 hover:bg-slate-200/80 text-slate-900 border border-slate-900/5 shadow-sm"
      : "glass-card hover:bg-surface-container-highest/60 text-on-surface";
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Decoration */}
      {!profile.bgColor && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-tertiary/5 blur-[100px]"></div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-24 md:pt-32">
        {/* Profile Header Section */}
        <header className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-16 md:mb-24">
          <div className="relative group">
            <div className="absolute -inset-1 primary-gradient rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div 
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 bg-surface-container-high"
              style={{ borderColor: accentColor }}
            >
              {profile.image && (
                <img 
                  src={profile.image} 
                  alt={profile.displayName || "Avatar"} 
                  className="w-full h-full object-cover" 
                />
              ) || (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black opacity-20">
                  {profile.displayName?.[0]?.toUpperCase() || "E"}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className={cn("text-4xl md:text-6xl font-black tracking-tighter", isLightTheme ? "text-slate-900" : "text-on-surface")}>
                {profile.displayName}
              </h1>
              <p className={cn("text-xs opacity-60 font-semibold md:text-left", isLightTheme ? "text-slate-600" : "text-on-surface-variant")}>
                @{profile.slug}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
                <SocialLinks profile={profile} isLightTheme={isLightTheme} />
              </div>
            </div>
            <p className={cn("max-w-md leading-relaxed font-normal", isLightTheme ? "text-slate-700" : "text-on-surface-variant")}>
              {profile.bio || "Curating high-end digital experiences at the intersection of editorial design and functional technology."}
            </p>
            
            {/* Social Quick Links */}
            {quickLinks.length > 0 && (
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                {quickLinks.map((link, index) => {
                  const Icon = index === 0 ? Share2 : index === 1 ? AtSign : Globe;

                  return (
                    <TrackedLink
                      key={link.id}
                      slug={profile.slug || "user"}
                      linkId={link.id}
                      url={link.url}
                      className={cn(
                        "p-2 rounded-full hover:scale-110 transition-transform",
                        isLightTheme 
                          ? "bg-slate-100 border border-slate-900/5 text-slate-700 hover:text-slate-950" 
                          : "glass-card text-on-surface-variant hover:text-primary"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{link.label}</span>
                    </TrackedLink>
                  );
                })}
              </div>
            )}
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px]">
          {activeLinks.map((link, i) => {
            let spanClass = "md:col-span-1 md:row-span-1";
            if (i === 0) spanClass = "md:col-span-3 md:row-span-2";
            else if (i === 1) spanClass = "md:col-span-1 md:row-span-2";
            else if (i === 2) spanClass = "md:col-span-2 md:row-span-1";
            
            const isFeatured = i === 0;
            const isNewsletter = i === 1;

            return (
              <TrackedLink
                key={link.id}
                slug={profile.slug || "user"}
                linkId={link.id}
                url={link.url}
                className={cn(
                  "flex transition-all duration-300 hover:scale-[1.01] group overflow-hidden relative",
                  spanClass,
                  getShapeClass(profile.buttonStyle),
                  getTileBgClass(profile.buttonStyle),
                  (isFeatured || isNewsletter) ? "p-8" : "p-6"
                )}
              >
                {(isFeatured || link.thumbnailUrl) && (
                  <div 
                    className={cn(
                      "absolute inset-0 transition-opacity z-0",
                      link.thumbnailUrl 
                        ? "opacity-75 group-hover:opacity-90" 
                        : "opacity-25 group-hover:opacity-35"
                    )}
                  >
                    <img src={link.thumbnailUrl || fallbackImages[i % fallbackImages.length]} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col justify-between h-full w-full text-left">
                  {isNewsletter ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4 w-full">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
                          boxShadow: `0 10px 15px -3px ${accentColor}33`
                        }}
                      >
                        <Mail className="w-8 h-8 text-black fill-current" />
                      </div>
                      <div>
                        <h3 className="font-bold">{link.label}</h3>
                        <p className={cn("text-xs mt-1", isLightTheme ? "text-slate-500" : "text-on-surface-variant")}>Weekly insights.</p>
                      </div>
                      <div 
                        className="w-full py-3 px-4 text-xs font-bold rounded-xl text-center text-black"
                        style={{ backgroundColor: accentColor }}
                      >
                        Join Now
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-full">
                        {isFeatured && (
                          <span className="uppercase tracking-widest text-[0.65rem] mb-2 block font-bold text-left" style={{ color: accentColor }}>
                            Featured Work
                          </span>
                        )}
                        <h3 className={cn(
                          "font-bold tracking-tight text-left",
                          isFeatured ? "text-3xl" : "text-lg",
                          (isFeatured || link.thumbnailUrl) ? "text-white" : ""
                        )}>
                          {link.label}
                        </h3>
                        {!isFeatured && link.description && (
                          <p className={cn(
                            "text-[0.7rem] mt-1 text-left opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden", 
                            isLightTheme ? "text-slate-500" : "text-on-surface-variant/80"
                          )}>
                            {link.description}
                          </p>
                        )}
                      </div>
                      
                      <div 
                        className={cn(
                          "flex items-center gap-2 text-sm font-medium transition-colors mt-auto",
                          (isFeatured || link.thumbnailUrl) ? "text-white/80 group-hover:text-white" : "text-on-surface-variant"
                        )}
                        style={!(isFeatured || link.thumbnailUrl) ? { color: accentColor } : {}}
                      >
                        {isFeatured ? "View Project" : <ExternalLink className="w-4 h-4" />}
                        {isFeatured && <ArrowRight className="w-4 h-4" />}
                      </div>
                    </>
                  )}
                </div>
              </TrackedLink>
            );
          })}
        </div>

        {/* Secondary Links Section (Minimalist List) */}
        <section className="mt-16 md:mt-24 space-y-4">
          <h4 className={cn("text-sm font-bold uppercase tracking-[0.2em] mb-8 text-center md:text-left", isLightTheme ? "text-slate-400" : "text-on-surface-variant/40")}>
            Archives & Resources
          </h4>
          <div className="space-y-3">
            {activeLinks[0] ? (
              <TrackedLink
                slug={profile.slug || "user"}
                linkId={activeLinks[0].id}
                url={activeLinks[0].url}
                className={cn(
                  "flex items-center justify-between p-5 transition-colors border shadow-sm",
                  getShapeClass(profile.buttonStyle),
                  getTileBgClass(profile.buttonStyle)
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shadow-inner" style={{ color: accentColor }}>
                    <Palette className="w-5 h-5" />
                  </div>
                  <span className="font-bold">Digital Assets Library</span>
                </div>
                <ArrowRight className="w-5 h-5 transition-all group-hover:translate-x-1" style={{ color: accentColor }} />
              </TrackedLink>
            ) : (
              <div className={cn(
                "p-5 rounded-xl border text-sm font-medium",
                isLightTheme ? "bg-slate-100 border-slate-900/5 text-slate-500" : "bg-surface-container-low border-white/5 text-on-surface-variant"
              )}>
                Add active links to unlock the resource archive.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={cn("w-full py-8 mt-auto border-t", isLightTheme ? "border-slate-900/5 bg-slate-50" : "border-white/5 bg-surface-container-lowest")}>
        <div className="max-w-4xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <div className={isLightTheme ? "text-slate-400" : "text-on-surface-variant/40"}>
            © 2026 novaskilltech | EthicLink
          </div>
          <div className="flex gap-6">
            <a href="mailto:hello@ethiclink.local" className={cn("hover:text-primary transition-colors", isLightTheme ? "text-slate-400" : "text-on-surface-variant/40")}>Contact</a>
            <a href="/" className={cn("hover:text-primary transition-colors", isLightTheme ? "text-slate-400" : "text-on-surface-variant/40")}>EthicLink</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
