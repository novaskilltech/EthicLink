"use client";

import type { LinkItem } from "@/lib/types";
import { useState, useTransition } from "react";
import { toggleLinkActive, deleteLink, updateLink } from "@/app/actions/links";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ExternalLink, Edit2, X, Check } from "lucide-react";
import { DirectImageUploader } from "@/components/ui/DirectImageUploader";

export function LinkCard({ 
  link, 
  userId, 
  onLinksChanged 
}: { 
  link: LinkItem; 
  userId?: string; 
  onLinksChanged?: () => void; 
}) {
  const [isPending, startTransition] = useTransition();
  const [active, setActive] = useState(link.active);
  const [isEditing, setIsEditing] = useState(false);

  // Editing states
  const [editLabel, setEditLabel] = useState(link.label);
  const [editUrl, setEditUrl] = useState(link.url);
  const [editDescription, setEditDescription] = useState(link.description || "");
  const [editThumbnailUrl, setEditThumbnailUrl] = useState(link.thumbnailUrl || "");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  function handleToggle() {
    const newState = !active;
    setActive(newState);
    startTransition(() => {
      toggleLinkActive(link.id, newState).then(() => {
        if (onLinksChanged) onLinksChanged();
      });
    });
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (confirm("Supprimer ce lien ?")) {
      startTransition(() => {
        deleteLink(link.id).then(() => {
          if (onLinksChanged) onLinksChanged();
        });
      });
    }
  }

  function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      updateLink(link.id, {
        label: editLabel,
        url: editUrl,
        description: editDescription,
        thumbnailUrl: editThumbnailUrl
      }).then((res) => {
        if (res.success) {
          setIsEditing(false);
          if (onLinksChanged) onLinksChanged();
        } else {
          alert(res.error);
        }
      });
    });
  }

  if (isEditing) {
    return (
      <div 
        ref={setNodeRef}
        style={style}
        className="flex flex-col gap-4 p-5 bg-surface-container rounded-2xl border-2 border-primary animate-in fade-in duration-200"
      >
        <div className="flex justify-between items-center">
          <span className="text-[0.65rem] font-black uppercase tracking-widest text-primary">Modifier l'élément</span>
          <button 
            onClick={() => {
              setIsEditing(false);
              setEditLabel(link.label);
              setEditUrl(link.url);
              setEditDescription(link.description || "");
              setEditThumbnailUrl(link.thumbnailUrl || "");
            }}
            className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[0.6rem] font-bold uppercase tracking-widest text-on-surface-variant">Titre</label>
              <input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                required
                className="p-3 text-sm rounded-xl bg-surface-container-low text-on-surface border-none focus:ring-1 ring-primary placeholder:opacity-30"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[0.6rem] font-bold uppercase tracking-widest text-on-surface-variant">URL de destination</label>
              <input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                required
                className="p-3 text-sm rounded-xl bg-surface-container-low text-on-surface border-none focus:ring-1 ring-primary placeholder:opacity-30"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[0.6rem] font-bold uppercase tracking-widest text-on-surface-variant">Description (Optionnelle)</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="p-3 text-sm rounded-xl bg-surface-container-low text-on-surface border-none focus:ring-1 ring-primary placeholder:opacity-30 resize-none font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.6rem] font-bold uppercase tracking-widest text-on-surface-variant">Miniature (Optionnelle)</label>
            <DirectImageUploader
              value={editThumbnailUrl}
              onChange={(url) => setEditThumbnailUrl(url)}
              folder="thumbnails"
              aspectRatio="square"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditLabel(link.label);
                setEditUrl(link.url);
                setEditDescription(link.description || "");
                setEditThumbnailUrl(link.thumbnailUrl || "");
              }}
              className="px-4 py-2 text-xs font-bold bg-surface-container-highest text-on-surface-variant rounded-lg hover:bg-surface-bright transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-xs font-bold primary-gradient text-on-primary rounded-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
            >
              <Check className="w-3.5 h-3.5" />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-4 p-5 bg-surface-container rounded-2xl group transition-all duration-200",
        !active && "opacity-60",
        isDragging && "shadow-2xl scale-[1.02] cursor-grabbing opacity-90 ring-2 ring-primary bg-surface-container-high"
      )}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="p-2 text-on-surface-variant/30 group-hover:text-primary transition-colors cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Miniature Preview if exists */}
      {link.thumbnailUrl && (
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 shadow-inner bg-surface-container-low">
          <img src={link.thumbnailUrl} alt={link.label} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-on-surface truncate">{link.label}</h3>
          {!active && <span className="text-[0.65rem] uppercase tracking-widest bg-surface-container-highest px-1.5 py-0.5 rounded text-on-surface-variant font-bold">Masqué</span>}
        </div>
        {link.description && (
          <p className="text-xs text-on-surface-variant/75 mt-0.5 line-clamp-1 italic">{link.description}</p>
        )}
        <div className="flex items-center gap-1 text-on-surface-variant text-sm mt-0.5">
          <ExternalLink className="w-3 h-3 shrink-0" />
          <p className="truncate opacity-60 font-medium">{link.url.replace(/^https?:\/\//, '')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="p-2.5 text-on-surface-variant/40 hover:text-primary hover:bg-primary/10 transition-all rounded-xl lg:opacity-0 lg:group-hover:opacity-100"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={cn(
            "w-11 h-6 rounded-full p-1 transition-all duration-300 relative",
            active ? "bg-primary shadow-lg shadow-primary/20" : "bg-surface-container-highest"
          )}
        >
          <div className={cn(
            "w-4 h-4 rounded-full transition-transform duration-300",
            active ? "translate-x-5 bg-on-primary scale-110" : "translate-x-0 bg-on-surface-variant/40"
          )} />
        </button>

        {/* Delete Action */}
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="p-2.5 text-on-surface-variant/40 hover:text-error hover:bg-error-container/20 transition-all rounded-xl lg:opacity-0 lg:group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
