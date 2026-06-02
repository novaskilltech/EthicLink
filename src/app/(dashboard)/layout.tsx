"use client";

import Link from "next/link";
import { 
  LayoutDashboard, 
  Link2, 
  Palette, 
  Settings,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "@/app/actions/profile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [plan, setPlan] = useState("FREE");
  const [profileSlug, setProfileSlug] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadProfileData() {
      if (user) {
        try {
          const profile = await getProfile(user.uid);
          if (profile) {
            if (profile.plan) {
              setPlan(profile.plan);
            }
            if (profile.slug) {
              setProfileSlug(profile.slug);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    if (user) {
      loadProfileData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container p-6 flex flex-col gap-8 shadow-2xl">
        <div className="text-2xl font-black text-primary tracking-tighter">
          EthicLink
        </div>
        
        <nav className="flex-1 flex flex-col gap-1">
          {[
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "Links", href: "/dashboard/links", icon: Link2 },
            { label: "Appearance", href: "/dashboard/appearance", icon: Palette },
            { label: "Profile", href: "/dashboard/profile", icon: Settings },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  isActive 
                    ? "text-primary bg-surface-container-high font-bold border border-white/5" 
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                )}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-4 h-4 text-primary" />
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-on-surface truncate">{user?.displayName || "Creator"}</span>
              <span className="text-[0.6rem] text-primary-container font-black uppercase tracking-widest">
                {plan} PLAN
              </span>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-error hover:bg-error/10 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            {children}
          </div>
          
          {/* Live Preview Column (Sticky phone mock) */}
          {profileSlug && (
            <div className="hidden lg:block w-[320px] shrink-0">
              <div className="sticky top-6 flex flex-col items-center">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-3">
                  Prévisualisation en direct
                </span>
                {/* Phone Frame wrapper */}
                <div className="w-[320px] h-[640px] rounded-[3rem] border-8 border-slate-900 bg-black shadow-2xl relative overflow-hidden flex items-center justify-center">
                  {/* Speaker notch */}
                  <div className="absolute top-2 w-28 h-5 bg-slate-900 rounded-full z-50 flex items-center justify-center">
                    <div className="w-8 h-1 bg-white/20 rounded-full" />
                  </div>
                  <iframe
                    id="live-profile-preview"
                    src={`/${profileSlug}`}
                    className="w-full h-full border-none z-10"
                    title="Live public profile preview"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
