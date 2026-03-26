"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmailAuthForm() {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-black ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-[#bfff00] transition-colors" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@ethiclink.bio"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-highest/50 border border-white/5 focus:border-[#bfff00]/50 focus:bg-surface-container-highest transition-all outline-none text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-black ml-1">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-[#bfff00] transition-colors" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-highest/50 border border-white/5 focus:border-[#bfff00]/50 focus:bg-surface-container-highest transition-all outline-none text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in zoom-in-95 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full lime-gradient text-black py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#bfff00]/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            isLogin ? "Enter Gallery" : "Create Account"
          )}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-xs text-on-surface-variant font-medium hover:text-[#bfff00] transition-colors"
        >
          {isLogin ? (
            <>Don't have an account? <span className="text-[#bfff00] font-black">Sign up free</span></>
          ) : (
            <>Already have an account? <span className="text-[#bfff00] font-black">Sign in</span></>
          )}
        </button>
      </div>
    </div>
  );
}
