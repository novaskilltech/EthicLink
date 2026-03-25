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
import { cn } from "@/lib/utils";

export default function Home() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-[0.6875rem] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              New layouts available
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter leading-[0.95] text-on-surface">
              Your digital identity, <span className="text-primary">simplified.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Multiple 2D layouts for your unique link-in-bio. Treat your online presence as a high-end gallery exhibition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup" className="primary-gradient text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/20 text-center">
                Create your page for free
              </Link>
              <Link href="/demo" className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 text-center">
                View Showcase
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4 transform rotate-3 transition-transform duration-500 hover:rotate-0">
              {/* Preview Bento Grid */}
              <div className="col-span-2 glass-card p-4 rounded-xl aspect-[16/9] flex flex-col justify-end">
                <div className="w-full h-full rounded-lg bg-surface-container mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 primary-gradient opacity-20" />
                </div>
                <div className="h-4 w-2/3 bg-white/20 rounded-full"></div>
              </div>
              <div className="glass-card p-4 rounded-xl aspect-square flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <LinkIcon className="text-primary w-6 h-6" />
                </div>
                <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
              </div>
              <div className="glass-card p-4 rounded-xl aspect-square flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-tertiary/20 flex items-center justify-center">
                  <BarChart3 className="text-tertiary w-6 h-6" />
                </div>
                <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Types Grid */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <p className="text-[0.6875rem] uppercase tracking-widest text-primary font-bold">The Canvas</p>
              <h2 className="text-4xl font-black tracking-tight text-on-surface">One Link. Infinite Layouts.</h2>
            </div>
            <p className="text-on-surface-variant max-w-sm">Ditch the vertical stack. Choose a layout that reflects your professional brand architecture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Vertical Stack", desc: "The classic. Clean, readable, and direct. Perfect for focused call-to-actions." },
              { title: "Portfolio Grid", desc: "Visual-first. Show off your work, products, or photography in a tight 2x2 grid." },
              { title: "Bento Master", desc: "Editorial flow. Combine wide headers with small action tiles for high-impact presence." },
              { title: "Horizontal Story", desc: "Guided journey. Let users swipe through your projects like a digital magazine." }
            ].map((layout, idx) => (
              <div key={idx} className="bg-surface p-8 rounded-xl flex flex-col gap-6 hover:bg-surface-container-high transition-colors cursor-default group">
                <div className="h-32 w-full bg-surface-container-highest rounded-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-on-surface">{layout.title}</h3>
                  <p className="text-sm text-on-surface-variant">{layout.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface-container p-12 rounded-xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-on-surface">Simple Analytics for<br/>Modern Creators</h2>
              <p className="text-on-surface-variant max-w-md">No complicated dashboards. See where your traffic comes from and what they click with one glance. Clear, actionable, and elegant.</p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  Referral source tracking
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  Click-through rate heatmaps
                </li>
              </ul>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            <LineChart className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 group-hover:opacity-20 transition-opacity w-32 h-32 text-primary" />
          </div>
          
          <div className="bg-surface-container p-12 rounded-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center">
                <Wand2 className="text-tertiary w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-on-surface">Premium Aesthetics</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Every LinkSaaS page uses our proprietary Curator engine to ensure your content always looks balanced and professional.</p>
            </div>
            <Link href="/signup" className="text-primary font-bold text-sm inline-flex items-center gap-2 group mt-8">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-on-surface">
            Ready to curate your<br/>digital legacy?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/signup" className="primary-gradient text-on-primary px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-transform duration-200 text-center">
              Create your page for free
            </Link>
            <Link href="/demo" className="bg-surface-container-highest text-on-surface px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-transform duration-200 text-center">
              Explore Templates
            </Link>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">No credit card required. Free forever options available.</p>
        </div>
      </section>
    </main>
  );
}
