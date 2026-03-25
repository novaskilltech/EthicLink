"use client";

import Link from "next/link";
import { 
  Globe, 
  Lock, 
  ShieldCheck, 
  ArrowRight,
  Mail
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-tertiary/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Login Card Container */}
      <div className="w-full max-w-[440px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-2 opacity-60">Welcome Back</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface leading-none">Enter EthicLink</h1>
        </div>

        {/* Main Auth Card */}
        <div className="glass-card rounded-2xl p-8 shadow-2xl border border-white/5">
          {/* Social Logins */}
          <div className="space-y-4 mb-8">
            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl bg-surface-container-highest hover:bg-surface-bright transition-all duration-200 active:scale-95 group border border-white/5"
            >
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold">Continue with Google</span>
            </button>
            <button 
              className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl bg-surface-container-highest/50 cursor-not-allowed opacity-50 border border-white/5"
              disabled
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm font-bold opacity-50">Email coming soon</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-8 opacity-20">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-black">Secure Access</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8">
            <p className="text-xs text-on-surface-variant leading-relaxed text-center">
              Sign in to manage your premium bio-gallery and curate your digital existence.
            </p>
          </div>

          {/* Secondary cta for new users */}
          <div className="text-center">
            <p className="text-sm text-on-surface-variant font-medium">
              Don't have an account? 
              <span className="text-primary font-black ml-2 cursor-pointer hover:underline" onClick={handleGoogleSignIn}>Sign up for free</span>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-6 text-on-surface-variant/30">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[0.6rem] font-black tracking-widest uppercase">E2E Ready</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10"></div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[0.6rem] font-black tracking-widest uppercase">Firestore SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
