"use client";

import { useState } from "react";
import { Save, User, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface UserFormProps {
  action: (formData: FormData) => Promise<any>;
}

export default function UserForm({ action }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; name: string; loginId: string; generatedPassword?: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [role, setRole] = useState("TEACHER");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await action(formData);
      
      if (result?.generatedPassword) {
        setSuccessData(result);
      } else {
        window.location.href = "/portal/users";
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (successData?.generatedPassword) {
      navigator.clipboard.writeText(successData.generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (successData) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-8">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">User Account Created!</h2>
          <p className="text-zinc-500 text-sm mt-1">Credentials for <b>{successData.name}</b> are ready.</p>
        </div>

        <div className="w-full max-w-sm bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-4 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Login ID</span>
            <div className="bg-white border border-zinc-100 rounded-lg px-3 py-2 text-sm font-bold text-zinc-700">
              {successData.loginId}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Temporary Password</span>
            <div className="relative group">
              <div className="bg-white border border-zinc-200 rounded-xl px-4 py-4 font-mono text-xl font-bold tracking-wider text-eddyrose-deep text-center shadow-sm">
                {successData.generatedPassword}
              </div>
              <button 
                type="button"
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-lg transition-all"
              >
                {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed italic text-center">
            <b>Important:</b> This password will not be shown again.
          </p>
        </div>

        <Link 
          href="/portal/users"
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-xl shadow-eddyrose-deep/20"
        >
          Go to User List <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-xs font-bold flex items-center gap-3">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">!</div>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
            Full Name
          </label>
          <input 
            name="name"
            type="text" 
            required
            disabled={loading}
            placeholder="e.g. John Doe"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
            Role
          </label>
          <select 
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          >
            <option value="TEACHER">Teacher</option>
            <option value="SUPERADMIN">Super Admin</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
            Login ID (ID or Email)
          </label>
          <input 
            name="loginId"
            type="text" 
            required
            disabled={loading}
            placeholder="e.g. teacher.john or john@example.com"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          />
          <p className="text-[10px] text-zinc-400 ml-1">A secure password will be generated automatically.</p>
        </div>

        {role === "TEACHER" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
                Teacher's Email Address
              </label>
              <input 
                name="email"
                type="email" 
                required
                disabled={loading}
                placeholder="e.g. teacher.john@eddyrose.com"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
                Teacher's Phone Number
              </label>
              <input 
                name="phoneNumber"
                type="tel" 
                required
                disabled={loading}
                placeholder="e.g. +234 80 1234 5678"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
              />
            </div>
          </>
        )}
      </div>

      <div className="pt-6 border-t border-zinc-100 flex justify-end">
        <button 
          type="submit"
          disabled={loading}
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-xl shadow-eddyrose-deep/20 active:scale-[0.95] disabled:opacity-50"
        >
          {loading ? <span className="animate-spin">🌀</span> : <Save size={18} />}
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </form>
  );
}
