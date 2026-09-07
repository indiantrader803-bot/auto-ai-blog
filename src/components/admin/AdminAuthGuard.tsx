"use client";

import { useState, useEffect } from "react";
import { Lock, Mail, Key, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("arnab.laha2018@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("auto_ai_admin_session");
    if (session === "authenticated_owner_arnab") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const isEmailPassMatch =
      cleanEmail === "arnab.laha2018@gmail.com" &&
      (cleanPass === "Myjobmail@#1234" || cleanPass === "Myjobmail@1234" || cleanPass === "arnab2026");

    const isPasskeyMatch =
      cleanPass === "arnab2026" ||
      cleanPass === "auto-blog-secure-key-2025" ||
      cleanPass === "Myjobmail@#1234";

    if (isEmailPassMatch || isPasskeyMatch) {
      localStorage.setItem("auto_ai_admin_session", "authenticated_owner_arnab");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid Email or Password. Please check your admin credentials.");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-sans">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <Sparkles className="w-5 h-5 animate-spin" /> Verifying Security Session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans text-slate-100">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/10">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black font-serif text-white tracking-tight">
              Owner Admin Portal
            </h2>
            <p className="text-xs text-slate-400">
              Enter your administrator email &amp; password to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arnab.laha2018@gmail.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors pl-10"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors pl-10"
                />
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-medium text-center bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Sign In to Admin Studio
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <a
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
