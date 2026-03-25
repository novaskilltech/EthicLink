"use client";

import type { LinkItem } from "@/lib/types";
import { LinkCard } from "./LinkCard";
import { useState, useTransition, useEffect } from "react";
import { Link as LinkIcon } from "lucide-react";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { reorderLinks } from "@/app/actions/links";

export function LinkList({ initialLinks }: { initialLinks: LinkItem[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);

      const newLinks = arrayMove(links, oldIndex, newIndex);
      setLinks(newLinks);

      // Save to DB
      startTransition(async () => {
        const updates = newLinks.map((link, index) => ({
          id: link.id,
          order: index, // Changed from sortOrder to order to match Firestore action
        }));
        await reorderLinks(updates);
      });
    }
  }

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-surface-container-low rounded-[2rem] border-2 border-dashed border-white/5">
        <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
          <LinkIcon className="w-8 h-8 text-on-surface-variant opacity-20" />
        </div>
        <p className="text-lg font-bold text-on-surface opacity-40">No links yet.</p>
        <p className="text-sm text-on-surface-variant opacity-40">Start by adding your first exhibition piece above.</p>
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={links.map(l => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
