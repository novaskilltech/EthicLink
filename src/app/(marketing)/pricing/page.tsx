import Link from "next/link";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "FREE",
    price: "0",
    description: "Parfait pour commencer",
    features: [
      "Liens illimités",
      "1 page publique",
      "Layouts : vertical, grille, bento",
      "Intégration musique & vidéos",
      "Code QR",
      "Statistiques de base",
      "Thèmes simples",
    ],
    cta: "Commencer gratuitement",
    href: "/sign-up",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    name: "CREATOR",
    price: "9",
    description: "Pour les créateurs qui veulent se démarquer",
    features: [
      "Tout dans Free",
      "Tous les layouts (horizontal + carrousel)",
      "Suppression du branding",
      "Analytics avancées (CTR, sources)",
      "Thumbnails personnalisés",
      "Sections & groupes de liens",
      "3 à 5 pages",
      "Thèmes premium",
    ],
    cta: "Passer à Creator",
    href: "/dashboard/billing?plan=creator",
    recommended: true,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "PRO",
    price: "19",
    description: "Pour ceux qui veulent monétiser",
    features: [
      "Tout dans Creator",
      "Vente de produits digitaux",
      "Paiements (Stripe)",
      "Prise de rendez-vous (booking)",
      "Domaine personnalisé",
      "Capture d’emails / newsletter",
      "Pixels & tracking avancé",
      "Export des analytics",
    ],
    cta: "Passer à Pro",
    href: "/dashboard/billing?plan=pro",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    name: "BUSINESS",
    price: "49",
    description: "Pour les agences et créateurs avancés",
    features: [
      "Tout dans Pro",
      "Multi-comptes / gestion d’équipe",
      "White label (logo + marque)",
      "API développeur",
      "Analytics stratégiques",
      "Priorité support",
      "Accès anticipé aux features",
    ],
    cta: "Contacter Sales",
    href: "/contact",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6">
            Crée ta page, développe ton audience,<br/> 
            <span className="text-blue-600">monétise ton contenu</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une plateforme tout-en-un pour partager tes liens, présenter ton univers et générer des revenus.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col p-8 rounded-[2.5rem] bg-white border-2 transition-all hover:shadow-2xl hover:-translate-y-2",
                plan.recommended ? "border-blue-600 shadow-xl scale-105 z-10" : "border-slate-100"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Le plus populaire
                </div>
              )}

              <div className="mb-8">
                <span className={cn("px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest", plan.color)}>
                  {plan.name}
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-900">{plan.price}€</span>
                  <span className="text-slate-500 font-medium">/mois</span>
                </div>
                <p className="mt-2 text-slate-600 text-sm font-medium">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="mt-0.5 p-0.5 rounded-full bg-slate-100 text-slate-900">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={cn(
                  "w-full py-4 rounded-2xl text-center font-bold transition-all active:scale-95 text-white shadow-lg",
                  plan.buttonColor
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Why Us Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-black mb-8">Pourquoi choisir notre plateforme ?</h2>
                    <ul className="space-y-6">
                         {[
                            { t: "Layouts uniques", d: "Pas juste une liste de liens, un vrai mini-site." },
                            { t: "Ultra rapide", d: "Optimisé mobile pour un chargement instantané." },
                            { t: "Conçu pour la vente", d: "Intégration Stripe native pour monétiser vos fans." },
                            { t: "Évolutif", d: "Nouvelles features chaque semaine (IA, Marketplace)." }
                         ].map(item => (
                             <li key={item.t} className="flex gap-4">
                                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                     <Check className="text-blue-400" />
                                 </div>
                                 <div className="flex flex-col">
                                     <span className="font-bold text-lg">{item.t}</span>
                                     <span className="text-slate-400">{item.d}</span>
                                 </div>
                             </li>
                         ))}
                    </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                     <h3 className="text-xl font-bold mb-6 text-center">Comparatif express</h3>
                     <table className="w-full text-sm">
                        <thead className="border-b border-white/10">
                            <tr>
                                <th className="py-4 text-left font-medium opacity-50">Fonction</th>
                                <th className="py-4 text-center font-bold">Free</th>
                                <th className="py-4 text-center font-bold text-blue-400">Pro</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                ["Liens illimités", "✅", "✅"],
                                ["Layouts avancés", "❌", "✅"],
                                ["Vente produits", "❌", "✅"],
                                ["Domaine custom", "❌", "✅"]
                            ].map(([f, fr, pr]) => (
                                <tr key={f}>
                                    <td className="py-4 font-medium">{f}</td>
                                    <td className="py-4 text-center">{fr}</td>
                                    <td className="py-4 text-center">{pr}</td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
