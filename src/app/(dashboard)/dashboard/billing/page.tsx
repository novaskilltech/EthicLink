"use client";

import { UpgradeCard } from "@/components/dashboard/billing/UpgradeCard";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getProfile } from "@/app/actions/profile";
import { Plan } from "@/lib/types";

export default function BillingPage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const data = await getProfile(user.uid);
          setProfile(data);
        } catch (error) {
          console.error("Fetch Profile Error:", error);
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

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <div className="mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-2 opacity-60">Plan & Subscription</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface leading-none">
          Choose Your Path.
        </h1>
        <p className="text-on-surface-variant text-lg mt-6 max-w-2xl opacity-60">
          Scale your digital workspace with professional tools and detailed analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UpgradeCard 
          plan="PRO"
          currentPlan={profile?.plan}
          price="9"
          color="bg-primary/10 text-primary"
          buttonClass="primary-gradient text-on-primary-fixed shadow-lg shadow-primary/20"
          features={[
            "Remove EthicLink Branding",
            "Advanced Analytics (Sources)",
            "Unlimited Premium Themes",
            "Custom Styles & CSS",
            "Priority Support"
          ]}
        />

        <div className="flex flex-col p-8 rounded-3xl border-2 border-white/5 bg-surface-container-low opacity-60">
           <div className="mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-surface-container-highest">
              Enterprise
            </span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black">Custom</span>
            </div>
          </div>
          <p className="text-sm font-medium mb-8">For large teams and agencies requiring dedicated support and custom domains.</p>
          <button disabled className="mt-auto w-full py-4 rounded-xl font-bold bg-surface-container-highest text-on-surface-variant cursor-not-allowed">
            Contact Sales
          </button>
        </div>
      </div>

      <div className="mt-12 p-8 glass-card rounded-3xl border border-white/5 text-center">
        <p className="text-on-surface-variant italic text-sm">
          You are currently on the <strong className="text-on-surface">{profile?.plan || "FREE"}</strong> plan.
        </p>
      </div>
    </div>
  );
}
