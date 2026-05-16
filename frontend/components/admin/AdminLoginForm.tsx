"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginForm() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        loginId,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid administrative credentials.");
        setLoading(false);
      } else {
        // Verification on the client side: Ensure role is SUPERADMIN
        // This is just a UI convenience; middleware handles the real protection
        router.push("/portal/overview");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-xs font-bold border border-red-100">
          <AlertCircle size={18} className="flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
          Admin ID / Email
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            required
            disabled={loading}
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-deep/20 focus:border-eddyrose-deep transition-all text-sm font-bold"
            placeholder="admin@eddyrose.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
          Security Key / Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-deep/20 focus:border-eddyrose-deep transition-all text-sm font-bold"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors p-1"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-zinc-900 text-white font-black rounded-2xl px-6 py-4 shadow-xl hover:bg-black transition-all active:scale-[0.98] text-xs uppercase tracking-widest disabled:opacity-70 mt-4"
      >
        {loading ? "Verifying Authority..." : "Access Administrator Dashboard"}
      </button>
    </form>
  );
}
