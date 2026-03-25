import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface overflow-x-hidden">
      {/* Simplified Auth NavBar */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-indigo-400 tracking-tighter">
            Digital Curator
          </Link>
          <div className="hidden md:flex items-center gap-8 font-inter tracking-tight text-sm font-medium">
            <Link href="/login" className="text-indigo-400 font-bold border-b-2 border-indigo-400">Sign In</Link>
            <Link href="/signup" className="text-on-surface-variant hover:text-white transition-all">Sign Up</Link>
          </div>
          <button className="md:hidden text-indigo-400">
            <span className="font-bold">Menu</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center">{children}</div>

      {/* Auth Footer */}
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
