import { LayoutPreset } from "@/lib/types";
import type { LinkItem, PublicPage } from "@/lib/types";
import { StackRenderer } from "./renderers/StackRenderer";
import { BentoRenderer } from "./renderers/BentoRenderer";
import { CarouselRenderer } from "./renderers/CarouselRenderer";
import { MinimalRenderer } from "./renderers/MinimalRenderer";
import { OrbitRenderer } from "./renderers/OrbitRenderer";
import { CylinderRenderer } from "./renderers/CylinderRenderer";
import { ReportButton } from "../public/ReportButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PublicPageRendererProps {
  profile: any;
  page: any;
}

export function PublicPageRenderer({ profile, page }: PublicPageRendererProps) {
  const { layoutPreset, links = [] } = page;

  // Intercept if profile is suspended
  if (page.isSuspended) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-black text-white text-center font-sans">
        <div className="max-w-md p-8 glass-card border border-white/5 bg-slate-950/80 rounded-3xl flex flex-col items-center gap-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <span className="text-2xl text-red-500 font-bold">⚠️</span>
          </div>
          <h2 className="text-xl font-black uppercase tracking-wider text-red-400">Profil Non Conforme</h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
            Cette page n'est plus accessible car son contenu a été signalé comme non conforme à la charte d'utilisation éthique d'EthicLink.
          </p>
          <Link href="/" className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold transition-all uppercase tracking-wider">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const renderLayout = () => {
    switch (layoutPreset) {
      case LayoutPreset.STACK_VERTICAL:
        return <StackRenderer links={links} profile={profile} />;
      case LayoutPreset.BENTO_GRID:
        return <BentoRenderer links={links} profile={profile} />;
      case LayoutPreset.CAROUSEL:
        return <CarouselRenderer links={links} profile={profile} />;
      case LayoutPreset.MINIMAL:
        return <MinimalRenderer links={links} profile={profile} />;
      case LayoutPreset.ORBIT:
        return <OrbitRenderer links={links} profile={profile} />;
      case LayoutPreset.CAROUSEL_CYLINDER:
        return <CylinderRenderer links={links} profile={profile} />;
      default:
        return <StackRenderer links={links} profile={profile} />;
    }
  };

  const getThemeClass = () => {
    switch (page.theme) {
      case "MIDNIGHT_LIME": return "bg-midnight-lime text-on-surface";
      case "INDIGO_ETHEREAL": return "bg-indigo-ethereal text-on-surface";
      case "DARK_MINIMAL": return "bg-black text-white";
      case "LIGHT_GLASS": return "bg-white text-slate-900";
      default: return "bg-indigo-ethereal text-on-surface";
    }
  };

  // Determine if it is a light theme
  const isLightTheme = page.theme === "LIGHT_GLASS" || (page.bgColor && ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8"].includes(page.bgColor.toLowerCase()));

  const inlineStyles: React.CSSProperties = {};
  // Only override background styles if not custom starred space background
  if (page.bgColor && page.bgColor !== "SPACE_STARRED") {
    inlineStyles.backgroundColor = page.bgColor;
    // Clear background-image if custom bgColor is applied
    inlineStyles.backgroundImage = "none";
  }

  const showSpaceBackground = page.bgColor === "SPACE_STARRED" || 
    ((layoutPreset === LayoutPreset.ORBIT || layoutPreset === LayoutPreset.CAROUSEL_CYLINDER) && (!page.bgColor || page.bgColor === "SPACE_STARRED"));

  return (
    <div 
      className={cn(
        "min-h-screen w-full font-sans selection:bg-primary/30 relative",
        showSpaceBackground ? "bg-black text-white" : "",
        (!showSpaceBackground && (layoutPreset === LayoutPreset.ORBIT || layoutPreset === LayoutPreset.CAROUSEL_CYLINDER))
          ? (page.bgColor && page.bgColor !== "SPACE_STARRED" ? "" : "bg-black text-white")
          : getThemeClass(),
        isLightTheme && !showSpaceBackground ? "text-slate-900" : "text-on-surface"
      )}
      style={inlineStyles}
    >
      {showSpaceBackground && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-screen"
            style={{
              backgroundImage: `url("/images/milky_way_bg.png")`
            }}
          />
          <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vh] rounded-full bg-teal-500/10 blur-[130px] opacity-40" />
          <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vh] rounded-full bg-sky-500/10 blur-[150px] opacity-30" />
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='97' viewBox='0 0 56 97'%3E%3Cpath d='M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z M28 97 L56 80.84 L56 48.5 L28 64.66 L0 48.5 L0 80.84 Z' fill='none' stroke='%2338bdf8' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "56px 97px"
            }}
          />
        </div>
      )}
      
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {renderLayout()}
      </div>
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
        <Link 
          href="/" 
          className={cn(
            "px-4 py-2 backdrop-blur-md border rounded-full text-xs font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all group",
            isLightTheme && !showSpaceBackground
              ? "bg-slate-900/5 border-slate-900/10 text-slate-900" 
              : "bg-white/5 border-white/10 text-white"
          )}
        >
          <span className="opacity-40 group-hover:opacity-60 transition-opacity whitespace-nowrap">Powered by</span>
          <span className="text-primary tracking-tighter text-sm font-black">EthicLink</span>
        </Link>
        <ReportButton targetUid={page.uid} targetSlug={page.slug} isLightTheme={isLightTheme && !showSpaceBackground} />
      </div>
    </div>
  );
}
