"use client";

import { getLinks } from "@/app/actions/links";
import { LinkList } from "@/components/dashboard/links/LinkList";
import { LinkForm } from "@/components/dashboard/links/LinkForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { LinkItem } from "@/lib/types";

export default function LinksPage() {
  const { user, loading } = useAuth();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [fetching, setFetching] = useState(true);

  async function loadLinks() {
    if (user) {
      try {
        const data = await getLinks(user.uid);
        setLinks(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setFetching(false);
      }
    } else if (!loading) {
      setFetching(false);
    }
  }

  useEffect(() => {
    loadLinks();
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
        <p className="text-on-surface-variant">Veuillez vous connecter pour gérer vos liens.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 p-8 lg:p-12">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">Vos Liens</h1>
          <p className="text-on-surface-variant text-lg">Ajoutez, éditez et organisez votre présence globale.</p>
        </div>
        <LinkForm userId={user.uid} onLinkAdded={loadLinks} />
      </header>

      <div className="flex flex-col gap-8">
        <LinkList initialLinks={links} userId={user.uid} onLinksChanged={loadLinks} />
      </div>
    </div>
  );
}
