"use client";

import { useState } from "react";
import { createReport } from "@/app/actions/moderation";
import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportButtonProps {
  targetUid: string;
  targetSlug: string;
  isLightTheme?: boolean;
}

export function ReportButton({ targetUid, targetSlug, isLightTheme }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("non_ethic");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await createReport({
        targetUid,
        targetSlug,
        reason,
        details
      });

      if (res.success) {
        setStatus("success");
        setDetails("");
        // Close modal after delay
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "text-[0.6rem] uppercase tracking-widest font-black transition-opacity hover:opacity-100 flex items-center gap-1",
          isLightTheme ? "text-slate-900/40" : "text-white/40"
        )}
      >
        <AlertTriangle className="w-2.5 h-2.5" />
        Signaler ce profil
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div 
            className={cn(
              "w-full max-w-md p-8 rounded-3xl border shadow-2xl relative transition-all duration-300",
              isLightTheme 
                ? "bg-white border-slate-900/10 text-slate-900" 
                : "bg-slate-950 border-white/5 text-white"
            )}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className={cn(
                "absolute top-6 right-6 p-1.5 rounded-full transition-colors",
                isLightTheme ? "hover:bg-slate-100 text-slate-500" : "hover:bg-white/10 text-white/50"
              )}
            >
              <X className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h3 className="text-lg font-black uppercase tracking-wider">Signalement Envoyé</h3>
                <p className="text-xs opacity-75 max-w-xs">
                  Merci de nous aider à maintenir EthicLink éthique et sûr. Votre signalement sera examiné dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                    Signaler ce profil
                  </h3>
                  <p className="text-[0.7rem] opacity-60">
                    Aidez-nous à préserver la charte éthique d'EthicLink.
                  </p>
                </div>

                {status === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold text-center">
                    Une erreur est survenue lors de la soumission du signalement.
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest opacity-60">Motif du signalement</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={cn(
                      "px-4 py-3 rounded-xl outline-none border transition-all text-xs font-semibold",
                      isLightTheme 
                        ? "bg-slate-100 border-slate-900/10 focus:ring-1 focus:ring-slate-950" 
                        : "bg-surface-container-lowest border-white/5 focus:ring-1 focus:ring-primary"
                    )}
                  >
                    <option value="non_ethic">Contenu non conforme à l'éthique musulmane</option>
                    <option value="fraude">Fraude, Arnaque ou Usurpation</option>
                    <option value="inapproprie">Contenu inapproprié ou offensant</option>
                    <option value="autre">Autre motif</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest opacity-60">Détails (facultatif)</label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    className={cn(
                      "px-4 py-3 rounded-xl outline-none border transition-all text-xs font-medium resize-none",
                      isLightTheme 
                        ? "bg-slate-100 border-slate-900/10 focus:ring-1 focus:ring-slate-950" 
                        : "bg-surface-container-lowest border-white/5 focus:ring-1 focus:ring-primary"
                    )}
                    placeholder="Veuillez décrire brièvement ce qui pose problème sur ce profil..."
                  />
                </div>

                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all",
                      isLightTheme ? "bg-slate-100 hover:bg-slate-200" : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 primary-gradient text-on-primary-fixed rounded-xl font-black text-xs uppercase shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Envoi..." : "Signaler"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
