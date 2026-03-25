"use client";

import type { LinkItem } from "@/lib/types";
import { useState, useTransition } from "react";
import { toggleLinkActive, deleteLink } from "@/app/actions/links";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ExternalLink } from "lucide-react";

export function LinkCard({ link }: { link: LinkItem }) {
  const [isPending, startTransition] = useTransition();
  const [active, setActive] = useState(link.active);

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
    startTransition(() => toggleLinkActive(link.id, newState));
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (confirm("Delete this link?")) {
      startTransition(() => deleteLink(link.id));
    }
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

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-on-surface truncate">{link.label}</h3>
          {!active && <span className="text-[0.65rem] uppercase tracking-widest bg-surface-container-highest px-1.5 py-0.5 rounded text-on-surface-variant font-bold">Hidden</span>}
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant text-sm mt-0.5">
          <ExternalLink className="w-3 h-3 shrink-0" />
          <p className="truncate opacity-60 font-medium">{link.url.replace(/^https?:\/\//, '')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
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
