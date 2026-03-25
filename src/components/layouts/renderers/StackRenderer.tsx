import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { ExternalLink, ArrowRight } from "lucide-react";

export function StackRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  const activeLinks = links.filter(l => l.active).sort((a,b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="min-h-screen text-on-surface bg-surface selection:bg-primary/30">
      <main className="max-w-xl mx-auto px-6 pt-20 pb-24">
        {/* Simplified Header for Stack */}
        <header className="text-center mb-12 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-6 bg-surface-container-high">
            {profile.image && (
              <img src={profile.image} alt="" className="w-full h-full object-cover" />
            ) || (
              <div className="w-full h-full flex items-center justify-center text-2xl font-black text-on-surface-variant opacity-20">
                {profile.displayName?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-black text-on-surface mb-2">{profile.displayName}</h1>
          <p className="text-on-surface-variant text-sm max-w-sm mx-auto">{profile.bio}</p>
        </header>

        <div className="space-y-4">
          {activeLinks.map((link) => (
            <TrackedLink
              key={link.id}
              slug={profile.slug || "user"}
              linkId={link.id}
              url={link.url}
              className="group block w-full p-4 bg-surface-container hover:bg-surface-container-high rounded-2xl border border-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <span className="font-bold text-on-surface">{link.label}</span>
                  {link.description && <p className="text-xs text-on-surface-variant mt-1">{link.description}</p>}
                </div>
                <ArrowRight className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </TrackedLink>
          ))}
        </div>

        <footer className="mt-20 text-center">
           <p className="text-[0.6rem] uppercase tracking-widest font-black text-on-surface-variant opacity-30">
             Made with EthicLink
           </p>
        </footer>
      </main>
    </div>
  );
}
