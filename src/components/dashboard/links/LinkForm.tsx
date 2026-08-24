"use client";

import { useState, useTransition } from "react";
import { addLink } from "@/app/actions/links";
import { cn } from "@/lib/utils";
import { Plus, X, Save } from "lucide-react";
import { DirectImageUploader } from "@/components/ui/DirectImageUploader";

export function LinkForm({ userId, onLinkAdded }: { userId?: string; onLinkAdded?: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(formData: FormData) {
    const label = formData.get("label") as string;
    const url = formData.get("url") as string;

    startTransition(() => {
      addLink({ 
        label, 
        url, 
        description, 
        thumbnailUrl 
      }, userId).then((result) => {
        if (result.success) {
          setIsOpen(false);
          setThumbnailUrl("");
          setDescription("");
          if (onLinkAdded) onLinkAdded();
        } else {
          alert(result.error);
        }
      });
    });
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 primary-gradient text-on-primary rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Link
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface/80 backdrop-blur-sm animate-in fade-in duration-300">
      <form 
        action={handleSubmit} 
        className="w-full max-w-lg flex flex-col gap-6 p-8 rounded-[2rem] bg-surface-container shadow-2xl border border-white/5 animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-black text-on-surface tracking-tight">New Piece</h2>
          <button 
            type="button" 
            onClick={() => {
              setIsOpen(false);
              setThumbnailUrl("");
              setDescription("");
            }}
            className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary ml-1">Title</label>
            <input
              name="label"
              placeholder="e.g. My Latest Exhibition"
              required
              autoFocus
              className="p-4 rounded-xl bg-surface-container-low text-on-surface border-none focus:ring-2 ring-primary transition-all placeholder:opacity-30"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary ml-1">Destination URL</label>
            <input
              name="url"
              type="url"
              placeholder="https://behance.net/..."
              required
              className="p-4 rounded-xl bg-surface-container-low text-on-surface border-none focus:ring-2 ring-primary transition-all placeholder:opacity-30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary ml-1">Description (Optional)</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give details about this project..."
              rows={2}
              className="p-4 rounded-xl bg-surface-container-low text-on-surface border-none focus:ring-2 ring-primary transition-all placeholder:opacity-30 resize-none font-sans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary ml-1">Miniature (Optionnel)</label>
            <DirectImageUploader
              value={thumbnailUrl}
              onChange={(url) => setThumbnailUrl(url)}
              folder="thumbnails"
              aspectRatio="square"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 p-4 primary-gradient text-on-primary rounded-xl font-bold disabled:opacity-50 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            {isPending ? "Adding to gallery..." : (
              <>
                <Save className="w-5 h-5" />
                Add to Collection
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
