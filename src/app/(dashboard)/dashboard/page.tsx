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
import { getProfile, getProfileAnalytics, resetProfileAnalytics } from "@/app/actions/profile";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { LinkItem, PublicPage } from "@/lib/types";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({ views: 0, clicks: 0, ctr: "0.0%", dailyClicks: [0, 0, 0, 0, 0, 0, 0] });
  const [dataLoading, setDataLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showSpinner = false) => {
    if (!user) return;
    if (showSpinner) setRefreshing(true);
    try {
      const profileData = await getProfile(user.uid);
      setProfile(profileData || {});
      
      if (profileData?.slug) {
        const [linksData, analyticsData] = await Promise.all([
          getLinks(user.uid),
          getProfileAnalytics(profileData.slug)
        ]);
        setLinks(linksData || []);
        setAnalytics(analyticsData || { views: 0, clicks: 0, ctr: "0.0%", dailyClicks: [0, 0, 0, 0, 0, 0, 0] });
      } else {
        const linksData = await getLinks(user.uid);
        setLinks(linksData || []);
      }
    } catch (error) {
      console.error("Fetch Data Error:", error);
    } finally {
      setDataLoading(false);
      setRefreshing(false);
    }
  };

  const handleResetStats = async () => {
    if (!profile?.slug) return;
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques ? Cette action est irréversible.")) {
      setRefreshing(true);
      try {
        const res = await resetProfileAnalytics(profile.slug);
        if (res.success) {
          setAnalytics({ views: 0, clicks: 0, ctr: "0.0%", dailyClicks: [0, 0, 0, 0, 0, 0, 0] });
          alert("Statistiques réinitialisées avec succès !");
        } else {
          alert("Erreur lors de la réinitialisation.");
        }
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la réinitialisation.");
      } finally {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
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

  const stats = [
    { label: "Total Views", value: analytics.views.toString(), icon: Eye, color: "text-primary" },
    { label: "Total Clicks", value: analytics.clicks.toString(), icon: MousePointer2, color: "text-secondary" },
    { label: "Avg. CTR", value: analytics.ctr, icon: TrendingUp, color: "text-tertiary" },
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
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-xl font-bold text-on-surface">Engagement Trends</h4>
                <p className="text-on-surface-variant text-sm mt-1 opacity-60">Activity across all curated links over the last 7 days.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleResetStats}
                  disabled={refreshing}
                  className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-all text-xs font-bold active:scale-95 disabled:opacity-50"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => fetchData(true)}
                  disabled={refreshing}
                  className="p-3 bg-surface-container-highest text-on-surface hover:text-primary rounded-xl border border-white/5 transition-all flex items-center gap-2 text-xs font-bold active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
                  Rafraîchir
                </button>
              </div>
            </div>
            
            <div className="h-64 flex items-end gap-3 px-4">
              {analytics.dailyClicks.map((clicksVal: number, i: number) => {
                const maxVal = Math.max(...analytics.dailyClicks, 1);
                const heightPercent = Math.max(5, (clicksVal / maxVal) * 100);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 rounded-t-xl transition-all duration-500 hover:scale-x-105 relative group/bar cursor-pointer",
                      i === 5 ? "primary-gradient shadow-lg shadow-primary/20" : "bg-surface-container-highest hover:bg-surface-bright"
                    )}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[0.6rem] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-bold pointer-events-none whitespace-nowrap">
                      {clicksVal} clic{clicksVal > 1 ? 's' : ''}
                    </div>
                  </div>
                );
              })}
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
            {profile?.slug ? (
              <div className="w-[320px] h-[640px] rounded-[3rem] border-8 border-slate-900 bg-black shadow-2xl relative overflow-hidden flex items-center justify-center">
                {/* Speaker notch */}
                <div className="absolute top-2 w-28 h-5 bg-slate-900 rounded-full z-50 flex items-center justify-center">
                  <div className="w-8 h-1 bg-white/20 rounded-full" />
                </div>
                <iframe
                  id="live-profile-preview"
                  src={`/${profile.slug}`}
                  className="w-full h-full border-none z-10"
                  title="Live public profile preview"
                />
              </div>
            ) : (
              <div className="bg-surface-container-lowest p-6 rounded-[3rem] border-[10px] border-surface-container aspect-[9/19] relative overflow-hidden shadow-2xl flex flex-col items-center justify-center h-[540px]">
                <p className="text-xs text-on-surface-variant opacity-60 text-center">Créez un pseudo pour activer l'aperçu en direct</p>
              </div>
            )}
            <p className="text-center mt-6 text-on-surface-variant text-[0.65rem] uppercase tracking-widest font-black opacity-40">Prévisualisation en direct</p>
          </div>
        </div>
      </div>
    </div>
  );
}
