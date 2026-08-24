"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { UploadCloud, X, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DirectImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: "thumbnails" | "avatar";
  aspectRatio?: "square" | "cover";
  className?: string;
}

export function DirectImageUploader({
  value,
  onChange,
  folder = "thumbnails",
  aspectRatio = "square",
  className,
}: DirectImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 10 Mo.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur serveur HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Échec de l'enregistrement de l'image.");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Une erreur est survenue lors de l'upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={onInputChange}
        className="hidden"
      />

      {value ? (
        <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-surface-container-highest/30 p-3 flex items-center gap-4">
          <div className={cn(
            "relative overflow-hidden rounded-xl border border-white/10 shrink-0 bg-black/20",
            aspectRatio === "square" ? "w-16 h-16" : "w-24 h-16"
          )}>
            <img src={value} alt="Aperçu miniature" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none flex items-center justify-center">
              <span className="bg-emerald-500 text-black p-1 rounded-full text-[10px]"><Check className="w-3 h-3" /></span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center min-w-0">
            <p className="text-xs font-semibold text-on-surface truncate">Image prête</p>
            <p className="text-[10px] text-on-surface-variant opacity-60 truncate">{value.split("/").pop()}</p>
          </div>

          <div className="flex items-center gap-2 pr-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-bold bg-surface-container-highest hover:bg-surface-bright text-on-surface rounded-lg transition-colors border border-white/5"
            >
              Changer
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
              title="Supprimer l'image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 text-center",
            isDragOver 
              ? "border-primary bg-primary/10 scale-[1.01]" 
              : "border-white/10 bg-surface-container-low hover:bg-surface-container-highest/40 hover:border-primary/40",
            isUploading && "opacity-60 cursor-wait pointer-events-none"
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-xs font-bold text-on-surface">Téléversement de l'image...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">
                  Cliquez ou glissez-déposez votre image ici
                </p>
                <p className="text-[10px] text-on-surface-variant opacity-60 mt-0.5">
                  PNG, JPG, WebP, GIF (Max 10 Mo)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-400 mt-1 pl-1">{error}</p>
      )}
    </div>
  );
}