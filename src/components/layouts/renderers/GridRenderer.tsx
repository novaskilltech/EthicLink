import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { Globe } from "lucide-react";

export function GridRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  const activeLinks = links.filter(l => l.active).sort((a,b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="min-h-screen text-on-surface bg-surface-container-lowest">
       <main className="max-w-2xl mx-auto px-6 pt-16 pb-24">
         <header className="mb-12 text-center">
            <div className="w-20 h-20 rounded-2xl primary-gradient mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary/20">
              {profile.displayName?.[0]?.toUpperCase()}
            </div>
            <h1 className="text-3xl font-black tracking-tight">{profile.displayName}</h1>
            <p className="text-on-surface-variant mt-3 text-sm font-medium tracking-wide">@{profile.slug}</p>
         </header>

         <div className="grid grid-cols-2 gap-4">
            {activeLinks.map((link) => (
              <TrackedLink
                key={link.id}
                slug={profile.slug || "user"}
                linkId={link.id}
                url={link.url}
                className="aspect-square flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-[2rem] border border-white/5 hover:bg-primary/5 hover:border-primary/20 transition-all hover:scale-[1.05]"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 text-primary">
                  {link.thumbnailUrl ? <img src={link.thumbnailUrl} className="w-full h-full object-cover rounded-full" /> : <Globe className="w-6 h-6" />}
                </div>
                <span className="font-bold text-sm text-center line-clamp-2">{link.label}</span>
              </TrackedLink>
            ))}
         </div>

          <footer className="mt-24 text-center border-t border-white/5 pt-8">
             <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">EthicLink Professional</p>
          </footer>
       </main>
    </div>
  );
}
