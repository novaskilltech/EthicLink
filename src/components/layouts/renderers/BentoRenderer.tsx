import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
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
  
  return (
    <div className="min-h-screen text-on-surface selection:bg-primary/30 relative overflow-x-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-tertiary/5 blur-[100px]"></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-24 md:pt-32">
        {/* Profile Header Section */}
        <header className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-16 md:mb-24">
          <div className="relative group">
            <div className="absolute -inset-1 primary-gradient rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-container bg-surface-container-high">
              {profile.image && (
                <img 
                  src={profile.image} 
                  alt={profile.displayName || "Avatar"} 
                  className="w-full h-full object-cover" 
                />
              ) || (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-on-surface-variant opacity-20">
                  {profile.displayName?.[0]?.toUpperCase() || "E"}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface">
                {profile.displayName}
              </h1>
              <p className="text-primary font-medium tracking-wide uppercase text-xs md:text-sm">
                Digital Curator & Visual Strategist
              </p>
            </div>
            <p className="text-on-surface-variant max-w-md leading-relaxed font-normal">
              {profile.bio || "Curating high-end digital experiences at the intersection of editorial design and functional technology."}
            </p>
            
            {/* Social Quick Links */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <button className="p-2 glass-card rounded-full hover:scale-110 transition-transform text-on-surface-variant hover:text-primary">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 glass-card rounded-full hover:scale-110 transition-transform text-on-surface-variant hover:text-primary">
                <AtSign className="w-5 h-5" />
              </button>
              <button className="p-2 glass-card rounded-full hover:scale-110 transition-transform text-on-surface-variant hover:text-primary">
                <Globe className="w-5 h-5" />
              </button>
            </div>
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
                  "glass-card rounded-xl flex transition-all duration-300 hover:scale-[1.01] group overflow-hidden relative",
                  spanClass,
                  (isFeatured || isNewsletter) ? "p-8" : "p-6",
                  !isFeatured && !isNewsletter && "hover:bg-surface-container-highest/60"
                )}
              >
                {isFeatured && link.thumbnailUrl && (
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <img src={link.thumbnailUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col justify-between h-full w-full text-left">
                  {isNewsletter ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                      <div className="w-16 h-16 rounded-2xl primary-gradient flex items-center justify-center shadow-lg shadow-primary/20">
                        <Mail className="w-8 h-8 text-on-primary fill-current" />
                      </div>
                      <div>
                        <h3 className="font-bold">{link.label}</h3>
                        <p className="text-xs text-on-surface-variant mt-1">Weekly insights.</p>
                      </div>
                      <div className="w-full py-3 px-4 primary-gradient text-on-primary-fixed text-xs font-bold rounded-xl text-center">
                        Join Now
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        {isFeatured && (
                          <span className="uppercase tracking-widest text-[0.65rem] text-primary mb-2 block font-bold text-left">
                            Featured Work
                          </span>
                        )}
                        <h3 className={cn(
                          "font-bold tracking-tight text-left",
                          isFeatured ? "text-3xl" : "text-lg"
                        )}>
                          {link.label}
                        </h3>
                        {!isFeatured && link.description && (
                          <p className="text-xs text-on-surface-variant mt-1 text-left">{link.description}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors mt-auto">
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
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-8 text-center md:text-left">
            Archives & Resources
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors cursor-pointer border border-white/5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shadow-inner">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="font-bold text-on-surface">Digital Assets Library</span>
              </div>
              <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 mt-auto border-t border-white/5 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-on-surface-variant/40 text-[0.65rem] uppercase tracking-widest font-bold">
            © 2024 EthicLink | Your Bio Gallery
          </div>
          <div className="flex gap-6">
            <span className="text-on-surface-variant/40 text-[0.65rem] uppercase tracking-widest font-bold hover:text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="text-on-surface-variant/40 text-[0.65rem] uppercase tracking-widest font-bold hover:text-primary cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
