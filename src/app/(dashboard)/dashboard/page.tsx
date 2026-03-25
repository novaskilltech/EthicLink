"use client";

import { 
  BarChart3, 
  TrendingUp, 
  MousePointer2, 
  Eye, 
  Plus, 
  Settings2,
  ChevronRight,
  Share2,
  Mail,
  Globe,
  RefreshCw,
  Link2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getLinks } from "@/app/actions/links";
import { getProfile } from "@/app/actions/profile";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { LinkItem, PublicPage } from "@/lib/types";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const [profileData, linksData] = await Promise.all([
            getProfile(user.uid),
            getLinks(user.uid)
          ]);
          setProfile(profileData || {});
          setLinks(linksData || []);
        } catch (error) {
          console.error("Fetch Data Error:", error);
        } finally {
          setDataLoading(false);
        }
      }
    }

    if (!authLoading && user) {
      fetchData();
    } else if (!authLoading && !user) {
       setDataLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || dataLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Mock stats for now as Analytics is P2
  const stats = [
    { label: "Total Views", value: "0", icon: Eye, color: "text-primary" },
    { label: "Total Clicks", value: "0", icon: MousePointer2, color: "text-secondary" },
    { label: "Avg. CTR", value: "0%", icon: TrendingUp, color: "text-tertiary" },
  ];

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-2 opacity-60">Workspace Overview</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface leading-none">
            {profile?.displayName || user?.displayName || "Mon Portfolio"}
          </h2>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/appearance" className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 hover:scale-[1.02] transition-transform active:opacity-80 border border-white/5">
            <Settings2 className="w-4 h-4" />
            Design
          </Link>
          <Link href="/dashboard/links" className="primary-gradient text-on-primary-fixed px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-transform active:opacity-80 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Add Link
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Stats & Chart */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface-container-low p-8 rounded-2xl flex flex-col justify-between group hover:bg-surface-container transition-colors border border-white/5">
                <stat.icon className={cn("w-6 h-6 mb-4 transition-transform group-hover:scale-110", stat.color)} />
                <div>
                  <p className="text-on-surface-variant text-[0.65rem] font-bold uppercase tracking-widest leading-none">{stat.label}</p>
                  <h3 className="text-3xl font-black text-on-surface mt-2 tracking-tight">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-surface-container p-8 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h4 className="text-xl font-bold text-on-surface">Engagement Trends</h4>
                <p className="text-on-surface-variant text-sm mt-1 opacity-60">Activity across all curated links over the last 30 days.</p>
              </div>
            </div>
            
            <div className="h-64 flex items-end gap-3 px-4">
              {[10, 15, 10, 20, 15, 25, 20].map((height, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex-1 rounded-t-xl transition-all duration-500 hover:scale-x-105",
                    i === 5 ? "primary-gradient shadow-lg shadow-primary/20" : "bg-surface-container-highest hover:bg-surface-bright"
                  )}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[0.65rem] text-on-surface-variant font-bold px-4 tracking-widest opacity-40">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(day => <span key={day}>{day}</span>)}
            </div>
          </div>

          {/* Links Preview */}
          <div>
            <h4 className="text-xl font-bold text-on-surface mb-6">Your Links</h4>
            <div className="space-y-4">
              {links.length === 0 ? (
                <div className="text-center p-12 bg-surface-container-low rounded-2xl border-2 border-dashed border-white/5 opacity-40">
                  <p className="text-sm font-medium">No links created yet.</p>
                </div>
              ) : (
                links.slice(0, 3).map((link: any) => (
                  <div key={link.id} className="bg-surface-container-low hover:bg-surface-container-high transition-all p-5 rounded-2xl flex items-center justify-between group cursor-pointer border border-white/5 shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center text-primary shadow-inner">
                        <Link2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-on-surface text-lg leading-none">{link.label}</h5>
                        <p className="text-on-surface-variant text-xs mt-2 font-medium opacity-50 truncate max-w-[200px]">{link.url}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Mobile Preview */}
        <div className="col-span-12 lg:col-span-4 flex flex-col items-center">
          <div className="sticky top-8 w-full max-w-[320px]">
             {/* Preview Mockup simplified for MVP dashboard */}
            <div className="bg-surface-container-lowest p-3 rounded-[3rem] border-[10px] border-surface-container aspect-[9/19] relative overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-surface flex-1 rounded-[2.2rem] overflow-hidden flex flex-col items-center p-6 space-y-6">
                 <div className="w-16 h-16 rounded-full primary-gradient flex items-center justify-center text-white text-xl font-black mt-4">
                   {(profile?.displayName?.[0] || user?.displayName?.[0] || "E").toUpperCase()}
                 </div>
                 <div className="text-center space-y-2">
                   <h6 className="font-black text-on-surface text-sm">{profile?.displayName || user?.displayName || "EthicUser"}</h6>
                   <p className="text-[0.6rem] text-on-surface-variant uppercase tracking-widest font-bold opacity-60">@{profile?.slug || "username"}</p>
                 </div>
                 <div className="w-full space-y-2">
                   {links.slice(0, 3).map((l: any) => (
                     <div key={l.id} className="w-full p-3 rounded-lg bg-surface-container-highest border border-white/5 text-[0.6rem] font-bold text-center">
                       {l.label}
                     </div>
                   ))}
                 </div>
              </div>
            </div>
            <p className="text-center mt-6 text-on-surface-variant text-[0.65rem] uppercase tracking-widest font-black opacity-40">Live Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}
