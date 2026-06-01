import { LayoutPreset } from "@/lib/types";
import type { LinkItem, PublicPage } from "@/lib/types";
import { StackRenderer } from "./renderers/StackRenderer";
import { BentoRenderer } from "./renderers/BentoRenderer";
import { CarouselRenderer } from "./renderers/CarouselRenderer";
import { MinimalRenderer } from "./renderers/MinimalRenderer";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PublicPageRendererProps {
  profile: any;
  page: any;
}

export function PublicPageRenderer({ profile, page }: PublicPageRendererProps) {
  const { layoutPreset, links = [] } = page;

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
  if (page.bgColor) {
    inlineStyles.backgroundColor = page.bgColor;
    // Clear background-image if custom bgColor is applied
    inlineStyles.backgroundImage = "none";
  }

  return (
    <div 
      className={cn(
        "min-h-screen w-full font-sans selection:bg-primary/30 relative",
        getThemeClass(),
        isLightTheme ? "text-slate-900" : "text-on-surface"
      )}
      style={inlineStyles}
    >
      {renderLayout()}
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Link 
          href="/" 
          className={cn(
            "px-4 py-2 backdrop-blur-md border rounded-full text-xs font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all group",
            isLightTheme 
              ? "bg-slate-900/5 border-slate-900/10 text-slate-900" 
              : "bg-white/5 border-white/10 text-white"
          )}
        >
          <span className="opacity-40 group-hover:opacity-60 transition-opacity whitespace-nowrap">Powered by</span>
          <span className="text-primary tracking-tighter text-sm font-black">EthicLink</span>
        </Link>
      </div>
    </div>
  );
}
