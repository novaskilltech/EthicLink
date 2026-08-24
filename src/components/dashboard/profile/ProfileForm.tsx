"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import { DirectImageUploader } from "@/components/ui/DirectImageUploader";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle, AlertCircle } from "lucide-react";

export function ProfileForm({ initialData }: { initialData: any }) {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    displayName: initialData.displayName || "",
    bio: initialData.bio || "",
    avatarUrl: initialData.avatarUrl || "",
    slug: initialData.slug || "",
    youtubeUrl: initialData.youtubeUrl || "",
    tiktokUrl: initialData.tiktokUrl || "",
    instagramUrl: initialData.instagramUrl || "",
    facebookUrl: initialData.facebookUrl || "",
    whatsappUrl: initialData.whatsappUrl || "",
    linkedinUrl: initialData.linkedinUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    
    startTransition(async () => {
      try {
        const result = await updateProfile({
          ...formData,
          uid: user?.uid // Assurer que le profil contient son UID
        }, user?.uid);
        
        if (result?.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-10 glass-card rounded-[2.5rem] border border-white/5 shadow-2xl">
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-bold">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Modifications enregistrées avec succès !</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-bold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>Erreur lors de la sauvegarde du profil. Veuillez réessayer.</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Nom d'affichage</label>
        <input
          value={formData.displayName}
          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          className="px-6 py-4 rounded-xl bg-surface-container-lowest border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-sm font-medium text-on-surface"
          placeholder="Votre nom"
          required
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Pseudo personnalisé (URL)</label>
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30 text-sm font-bold">ethiclink.bio/</span>
          <input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full pl-36 pr-6 py-4 rounded-xl bg-surface-container-lowest border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-sm font-bold text-primary"
            placeholder="pseudo"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Biographie</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
          className="px-6 py-4 rounded-xl bg-surface-container-lowest border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all resize-none text-sm font-medium text-on-surface"
          placeholder="Décrivez votre univers en quelques mots..."
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Avatar (Photo de profil)</label>
        <DirectImageUploader
          value={formData.avatarUrl}
          onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
          folder="avatar"
          aspectRatio="square"
        />
      </div>

      {/* Social Links Section */}
      <div className="flex flex-col gap-6 p-6 bg-surface-container-lowest rounded-3xl border border-white/5">
        <h3 className="text-xs font-black uppercase tracking-widest text-primary">Réseaux Sociaux</h3>
        <p className="text-[0.7rem] text-on-surface-variant opacity-60">Saisissez l'URL complète ou votre identifiant pour chaque plateforme.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">Instagram</label>
            <input
              type="text"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-surface-container-low border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-xs text-on-surface"
              placeholder="Ex: https://instagram.com/nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">TikTok</label>
            <input
              type="text"
              value={formData.tiktokUrl}
              onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-surface-container-low border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-xs text-on-surface"
              placeholder="Ex: https://tiktok.com/@nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">YouTube</label>
            <input
              type="text"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-surface-container-low border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-xs text-on-surface"
              placeholder="Ex: https://youtube.com/@nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">LinkedIn</label>
            <input
              type="text"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-surface-container-low border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-xs text-on-surface"
              placeholder="Ex: https://linkedin.com/in/nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">Facebook</label>
            <input
              type="text"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-surface-container-low border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-xs text-on-surface"
              placeholder="Ex: https://facebook.com/nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">WhatsApp</label>
            <input
              type="text"
              value={formData.whatsappUrl}
              onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-surface-container-low border border-white/5 focus:ring-1 focus:ring-primary focus:border-primary/50 outline-none transition-all text-xs text-on-surface"
              placeholder="Ex: 33612345678 (sans le +)"
            />
          </div>
        </div>
      </div>

      <button
        disabled={isPending}
        className="mt-6 py-5 primary-gradient text-on-primary-fixed rounded-xl font-black text-sm tracking-wide shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {isPending ? "Synchronisation avec EthicLink..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
