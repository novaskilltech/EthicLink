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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bfff00]/20 text-[#bfff00] text-[0.6875rem] uppercase tracking-widest font-bold border border-[#bfff00]/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Midnight Lime Edition
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-[0.85] text-on-surface">
              Curate your <span className="text-[#bfff00]">digital existence.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Ditch the link-in-bio. Own a **Digital Gallery**. EthicLink transforms your social presence into a high-end exhibition with Bento architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup" className="lime-gradient text-black px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#bfff00]/20 text-center">
                Get Started — It's Free
              </Link>
              <Link href="/demo" className="bg-surface-container-highest/50 backdrop-blur-xl border border-white/5 text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 text-center">
                View Gallery
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4 transform rotate-3 transition-transform duration-500 hover:rotate-0">
              {/* Preview Bento Grid */}
              <div className="col-span-2 glass-card p-4 rounded-xl aspect-[16/9] flex flex-col justify-end">
                <div className="w-full h-full rounded-lg bg-surface-container mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 lime-gradient opacity-30" />
                </div>
                <div className="h-4 w-2/3 bg-white/20 rounded-full"></div>
              </div>
              <div className="glass-card p-4 rounded-xl aspect-square flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#bfff00]/20 flex items-center justify-center border border-[#bfff00]/20">
                  <LinkIcon className="text-[#bfff00] w-6 h-6" />
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
          <div className="md:col-span-2 bg-[#1a1a1a] border border-white/5 p-12 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-on-surface">Precision Analytics for<br/>Digital Curators</h2>
              <p className="text-on-surface-variant max-w-md">No noise. Just high-fidelity data. See exactly how your gallery performs with real-time tracking and conversion insights.</p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <CheckCircle2 className="text-[#bfff00] w-5 h-5" />
                  Visual heatmap of link clicks
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <CheckCircle2 className="text-[#bfff00] w-5 h-5" />
                  Referral source authentication
                </li>
              </ul>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#bfff00]/5 rounded-full blur-3xl group-hover:bg-[#bfff00]/10 transition-colors"></div>
            <LineChart className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 group-hover:opacity-30 transition-opacity w-32 h-32 text-[#bfff00]" />
          </div>
          
          <div className="bg-[#1a1a1a] border border-white/5 p-12 rounded-2xl flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#bfff00]/20 flex items-center justify-center border border-[#bfff00]/20">
                <Wand2 className="text-[#bfff00] w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-on-surface group-hover:text-[#bfff00] transition-colors">Bento Aesthetic</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Every page is balanced by our Curator engine. It's not just a link; it's a statement of professionalism.</p>
            </div>
            <Link href="/signup" className="text-[#bfff00] font-bold text-sm inline-flex items-center gap-2 group mt-8 underline-offset-4 hover:underline">
              Start Curation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight text-on-surface">
            The era of the vertical<br/>list is <span className="text-red-500 line-through decoration-4">over.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/signup" className="lime-gradient text-black px-10 py-5 rounded-xl font-black text-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#bfff00]/20 text-center">
              Create your Gallery for free
            </Link>
            <Link href="/demo" className="bg-white/5 backdrop-blur-md border border-white/10 text-on-surface px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/10 transition-all duration-300 text-center">
              Explore Templates
            </Link>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">Join 10,000+ creators curating their legacy. No credit card required.</p>
        </div>
      </section>
    </main>
  );
}
