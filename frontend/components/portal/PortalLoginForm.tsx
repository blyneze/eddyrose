"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, HelpCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function PortalLoginForm() {
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
        setError("Invalid login credentials. Please try again.");
        setLoading(false);
      } else {
        router.push("/portal/overview");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-[1rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-zinc-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-zinc-900 mb-2">Student & Teacher Portal</h2>
        <p className="text-sm text-zinc-500">
          Enter your credentials to access your records.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-[1rem] flex items-center gap-3 text-xs font-bold border border-red-100">
          <AlertCircle size={18} className="flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
            Registration Number / Teacher ID
          </label>
          <input
            type="text"
            required
            disabled={loading}
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-deep/20 focus:border-eddyrose-deep focus:bg-white transition-all text-sm font-bold"
            placeholder="e.g. ERA/2024/001 or TCH-101"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Access Password / PIN
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-eddyrose-deep/20 focus:border-eddyrose-deep focus:bg-white transition-all text-sm font-bold"
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


        {/* Notice indicator */}
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mt-2">
          <HelpCircle
            size={18}
            className="text-blue-500 mt-0.5 flex-shrink-0"
          />
          <p className="text-xs font-medium text-blue-800/80 leading-relaxed">
            Our portal backend is currently being upgraded. If you experience
            login issues, please contact the administrative office.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-eddyrose-deep text-white font-bold rounded-2xl px-6 py-4 shadow-md hover:bg-eddyrose-light hover:shadow-lg transition-all active:scale-[0.98] text-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Authenticating..." : "Sign In Securely"}
        </button>
      </form>
    </div>
  );
}
