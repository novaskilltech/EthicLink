import { LayoutPreset } from "@/lib/types";
import type { LinkItem, PublicPage } from "@/lib/types";
import { StackRenderer } from "./renderers/StackRenderer";
// import { GridRenderer } from "./renderers/GridRenderer"; // If exists
import { BentoRenderer } from "./renderers/BentoRenderer";
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
      default:
        return <StackRenderer links={links} profile={profile} />;
    }
  };

  const getThemeClass = () => {
    switch (page.theme) {
      case "MIDNIGHT_LIME": return "bg-midnight-lime";
      case "INDIGO_ETHEREAL": return "bg-indigo-ethereal";
      case "DARK_MINIMAL": return "bg-black";
      case "LIGHT_GLASS": return "bg-white text-black";
      default: return "bg-indigo-ethereal";
    }
  };

  return (
    <div className={cn("min-h-screen w-full font-sans selection:bg-white/20", getThemeClass())}>
      <div className="max-w-2xl mx-auto py-16 px-6">
        {renderLayout()}
      </div>
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Link 
          href="/" 
          className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all group"
        >
          <span className="opacity-40 group-hover:opacity-60 transition-opacity whitespace-nowrap">Powered by</span>
          <span className="text-primary tracking-tighter text-sm font-black">EthicLink</span>
        </Link>
      </div>
    </div>
  );
}
