"use client";

import { getAppearance, updateAppearance } from "@/app/actions/appearance";
import { getProfile } from "@/app/actions/profile";
import { updateTheme } from "@/app/actions/theme";
import { LayoutSelector } from "@/components/dashboard/appearance/LayoutSelector";
import { ThemeSelector } from "@/components/dashboard/appearance/ThemeSelector";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useTransition } from "react";
import { LayoutPreset } from "@/lib/types";
import { Save, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppearancePage() {
  const { user, loading } = useAuth();
  const [isPending, startTransition] = useTransition();

  // Local Form States
  const [currentPreset, setCurrentPreset] = useState<LayoutPreset>(LayoutPreset.STACK_VERTICAL);
  const [themeData, setThemeData] = useState<any>(null);
  
  const [fetching, setFetching] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Get slug to display preview
  const [profileSlug, setProfileSlug] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          const [preset, profileData] = await Promise.all([
            getAppearance(user.uid),
            getProfile(user.uid)
          ]);
          setCurrentPreset(preset);
          if (profileData) {
            setProfileSlug(profileData.slug || "");
            setThemeData(profileData);
          } else {
            setThemeData({
              theme: "INDIGO_ETHEREAL",
              themeColor: "#8083ff",
              bgColor: "#ffffff",
              buttonStyle: "ROUNDED",
              plan: "FREE"
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          setFetching(false);
        }
      } else if (!loading) {
        setFetching(false);
      }
    }
    loadData();
  }, [user, loading]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    startTransition(async () => {
      try {
        const [resAppearance, resTheme] = await Promise.all([
          updateAppearance({ layoutPreset: currentPreset }, user.uid),
          updateTheme(themeData, user.uid)
        ]);

        if (resAppearance.success && resTheme.success) {
          setSaveSuccess(true);
          // Reload iframe preview to match newly saved database state
          const iframe = document.getElementById("live-profile-preview") as HTMLIFrameElement;
          if (iframe) {
            iframe.src = iframe.src;
          }
          setTimeout(() => setSaveSuccess(false), 3000);
        } else {
          alert(`Erreur lors de la sauvegarde : ${resAppearance.error || resTheme.error}`);
        }
      } catch (error: any) {
        alert(`Erreur réseau : ${error.message}`);
      }
    });
  };

  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-10">
        <p className="text-on-surface-variant">Veuillez vous connecter pour voir l'apparence.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl pb-32">
      {/* Configuration Column */}
      <div className="flex-1 flex flex-col gap-10">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Apparence</h1>
          <p className="text-on-surface-variant mt-2 text-lg">Personnalisez la façon dont le monde voit votre identité numérique.</p>
        </header>

        {/* Success Notification */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center gap-3 animate-in fade-in duration-300">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">✓</div>
            <div>
              <p className="font-bold text-sm">Modifications enregistrées !</p>
              <p className="text-xs opacity-85">Votre profil public EthicLink a été mis à jour instantanément.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-10">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-on-surface">Dispositions de la page</h2>
            <LayoutSelector 
              activePreset={currentPreset} 
              onChange={setCurrentPreset} 
              plan={themeData?.plan} 
            />
          </section>

          {themeData && (
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-on-surface">Thème et Styles</h2>
              <ThemeSelector 
                theme={themeData} 
                onChange={(update) => setThemeData({ ...themeData, ...update })} 
                plan={themeData.plan || "FREE"} 
              />
            </section>
          )}

          {/* Action Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "px-8 py-4 text-sm font-bold rounded-2xl shadow-xl flex items-center gap-2 hover:scale-[1.03] transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer border border-white/5",
                saveSuccess 
                  ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                  : "primary-gradient text-on-primary shadow-primary/20"
              )}
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : saveSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Enregistré
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
