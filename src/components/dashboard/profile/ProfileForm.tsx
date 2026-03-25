"use client";

import type { PublicPage } from "@/lib/types";
import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import { UploadButton } from "@/lib/uploadthing";

export function ProfileForm({ initialData }: { initialData: any }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    displayName: initialData.displayName || "",
    bio: initialData.bio || "",
    avatarUrl: initialData.avatarUrl || "",
    slug: initialData.slug || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => updateProfile(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-10 glass-card rounded-[2.5rem] border border-white/5 shadow-2xl">
      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Display Name</label>
        <input
          value={formData.displayName}
          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          className="px-6 py-4 rounded-xl bg-surface-container-lowest border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-sm font-medium"
          placeholder="Your Name"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Custom Slug</label>
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30 text-sm font-bold">ethiclink.bio/</span>
          <input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full pl-36 pr-6 py-4 rounded-xl bg-surface-container-lowest border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-sm font-bold text-primary"
            placeholder="username"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
          className="px-6 py-4 rounded-xl bg-surface-container-lowest border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all resize-none text-sm font-medium"
          placeholder="Tell the world about yourself..."
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Avatar</label>
        <div className="flex items-center gap-6 p-6 bg-surface-container-lowest rounded-2xl border border-white/5 border-dashed">
          {formData.avatarUrl && (
            <img src={formData.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-primary/20" />
          )}
          <UploadButton
            endpoint="avatarUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setFormData({ ...formData, avatarUrl: res[0].url });
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>

      <button
        disabled={isPending}
        className="mt-6 py-5 primary-gradient text-on-primary-fixed rounded-xl font-black text-sm tracking-wide shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {isPending ? "Syncing with EthicLink..." : "Save Changes"}
      </button>
    </form>
  );
}
