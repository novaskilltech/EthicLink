import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
            Digital Curator
          </Link>
          <div className="hidden md:flex items-center gap-8 font-inter tracking-tight text-sm font-medium">
            <a href="#features" className="text-on-surface-variant hover:text-on-surface transition-colors">Features</a>
            <a href="#showcase" className="text-on-surface-variant hover:text-on-surface transition-colors">Showcase</a>
            <a href="#pricing" className="text-on-surface-variant hover:text-on-surface transition-colors">Pricing</a>
            <Link href="/login" className="text-on-surface-variant hover:text-on-surface transition-colors">Sign In</Link>
            <Link href="/signup" className="primary-gradient text-on-primary px-5 py-2 rounded-xl font-bold hover:scale-105 transition-transform duration-200">
              Sign Up
            </Link>
          </div>
          <button className="md:hidden text-on-surface">
            {/* Menu Icon could be added here */}
            <span className="font-bold">Menu</span>
          </button>
        </div>
      </nav>

      <div className="flex-1">{children}</div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-surface border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-4 md:space-y-0 text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">
          <div>© 2024 Digital Curator</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
