"use client";

import Link from "next/link";
import { 
  Sparkles, 
  Link as LinkIcon, 
  BarChart3, 
  CheckCircle2, 
  Wand2, 
  ArrowRight,
  LineChart
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const heroTiles = [
  {
    src: "/images/launch_collection.png",
    alt: "Editorial workspace with laptop and creative material",
    label: "Launch collection",
  },
  {
    src: "/images/portfolio_drop.png",
    alt: "Architectural geometric facade used as a visual portfolio tile",
    label: "Portfolio drop",
  },
  {
    src: "/images/design_notes.png",
    alt: "Designer arranging a digital interface on a tablet",
    label: "Design notes",
  },
];

export default function Home() {
  const { t } = useLanguage();

  const layouts = [
    {
      title: t.home.layoutVerticalTitle,
      desc: t.home.layoutVerticalDesc,
      image: "/images/vertical_stack.png",
    },
    {
      title: t.home.layoutGridTitle,
      desc: t.home.layoutGridDesc,
      image: "/images/portfolio_grid.png",
    },
    {
      title: t.home.layoutBentoTitle,
      desc: t.home.layoutBentoDesc,
      image: "/images/bento_master.png",
    },
    {
      title: t.home.layoutStoryTitle,
      desc: t.home.layoutStoryDesc,
      image: "/images/horizontal_story.png",
    },
  ];

  return (
    <main className="bg-surface">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-tertiary/5 blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bfff00]/20 text-[#bfff00] text-[0.6875rem] uppercase tracking-widest font-bold border border-[#bfff00]/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              {t.home.edition}
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-[0.85] text-on-surface">
              {t.home.heroTitle1}<span className="text-[#bfff00]">{t.home.heroTitle2}</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed font-normal">
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="lime-gradient text-black px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#bfff00]/20 text-center">
                {t.home.getStarted}
              </Link>
              <Link href="#showcase" className="bg-surface-container-highest/50 backdrop-blur-xl border border-white/5 text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 text-center">
                {t.home.viewGallery}
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4 transform rotate-3 transition-transform duration-500 hover:rotate-0">
              {/* Preview Bento Grid */}
              <div className="col-span-2 glass-card p-4 rounded-xl aspect-[16/9] flex flex-col justify-end overflow-hidden">
                <div className="w-full h-full rounded-lg mb-4 overflow-hidden relative">
                  <img src={heroTiles[0].src} alt={heroTiles[0].alt} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-sm font-black text-white">{heroTiles[0].label}</div>
                </div>
                <div className="h-4 w-2/3 bg-white/20 rounded-full"></div>
              </div>
              <div className="glass-card p-3 rounded-xl aspect-square flex flex-col justify-between gap-2 overflow-hidden">
                <img src={heroTiles[1].src} alt={heroTiles[1].alt} className="h-full min-h-0 w-full rounded-lg object-cover" />
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#bfff00]/20 flex items-center justify-center border border-[#bfff00]/20 shrink-0">
                  <LinkIcon className="text-[#bfff00] w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-on-surface truncate">{heroTiles[1].label}</span>
                </div>
              </div>
              <div className="glass-card p-3 rounded-xl aspect-square flex flex-col justify-between gap-2 overflow-hidden">
                <img src={heroTiles[2].src} alt={heroTiles[2].alt} className="h-full min-h-0 w-full rounded-lg object-cover" />
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-tertiary/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="text-tertiary w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-on-surface truncate">{heroTiles[2].label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Types Grid */}
      <section id="showcase" className="py-24 bg-surface-container-low scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <p className="text-[0.6875rem] uppercase tracking-widest text-primary font-bold">{t.home.canvas}</p>
              <h2 className="text-4xl font-black tracking-tight text-on-surface">{t.home.infiniteLayouts}</h2>
            </div>
            <p className="text-on-surface-variant max-w-sm font-normal">{t.home.layoutsSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {layouts.map((layout, idx) => (
              <Link href="/login" key={idx} className="bg-surface p-5 rounded-xl flex flex-col gap-6 hover:bg-surface-container-high transition-colors group focus:outline-none focus:ring-2 focus:ring-primary/60">
                <div className="h-36 w-full overflow-hidden rounded-lg bg-surface-container-highest">
                  <img src={layout.image} alt={`${layout.title} preview`} className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-on-surface">{layout.title}</h3>
                  <p className="text-sm text-on-surface-variant font-normal">{layout.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#1a1a1a] border border-white/5 p-12 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-on-surface">{t.home.featuresTitle}</h2>
              <p className="text-on-surface-variant max-w-md font-normal">{t.home.featuresDesc}</p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <CheckCircle2 className="text-[#bfff00] w-5 h-5" />
                  {t.home.heatmap}
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <CheckCircle2 className="text-[#bfff00] w-5 h-5" />
                  {t.home.referral}
                </li>
              </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" alt="Analytics dashboard with charts" className="absolute right-0 top-0 hidden h-full w-1/2 object-cover opacity-20 transition-opacity group-hover:opacity-30 lg:block" />
            <LineChart className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-30 transition-opacity w-32 h-32 text-[#bfff00]" />
          </div>
          
          <div className="bg-[#1a1a1a] border border-white/5 p-12 rounded-2xl flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#bfff00]/20 flex items-center justify-center border border-[#bfff00]/20">
                <Wand2 className="text-[#bfff00] w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-on-surface group-hover:text-[#bfff00] transition-colors">{t.home.bentoAesthetic}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-normal">{t.home.bentoAestheticDesc}</p>
            </div>
            <Link href="/login" className="text-[#bfff00] font-bold text-sm inline-flex items-center gap-2 group mt-8 underline-offset-4 hover:underline">
              {t.home.startCuration}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight text-on-surface">
            {t.home.ctaTitle}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/login" className="lime-gradient text-black px-10 py-5 rounded-xl font-black text-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#bfff00]/20 text-center">
              {t.home.ctaBtn}
            </Link>
            <Link href="#showcase" className="bg-white/5 backdrop-blur-md border border-white/10 text-on-surface px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/10 transition-all duration-300 text-center">
              {t.home.exploreTemplates}
            </Link>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">{t.home.noCreditCard}</p>
        </div>
      </section>
    </main>
  );
}
