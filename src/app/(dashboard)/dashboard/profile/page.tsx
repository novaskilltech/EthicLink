"use client";

import { getProfile } from "@/app/actions/profile";
import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (user) {
        try {
          const data = await getProfile(user.uid);
          setProfile(data || {
            displayName: user.displayName || "",
            email: user.email || "",
            uid: user.uid,
          });
        } catch (e) {
          console.error(e);
        } finally {
          setFetching(false);
        }
      } else if (!loading) {
        setFetching(false);
      }
    }
    loadProfile();
  }, [user, loading]);

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
        <p className="text-on-surface-variant">Veuillez vous connecter pour voir votre profil.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 p-10 max-w-2xl mx-auto">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Profil Public</h1>
        <p className="text-on-surface-variant mt-2 text-lg">Gérez votre identité et la façon dont vous apparaissez pour les autres.</p>
      </header>

      <ProfileForm initialData={profile} />
    </div>
  );
}
