"use client";

import { useState, useMemo } from "react";
import { Search, Plus, RefreshCw, Copy, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { regenerateUserPasswordAction } from "@/app/actions/user";

type User = {
  id: string;
  name: string;
  loginId: string;
  role: "SUPERADMIN" | "TEACHER" | "STUDENT";
  createdAt: Date;
};

const ROLE_BADGE: Record<User["role"], string> = {
  SUPERADMIN: "bg-purple-100 text-purple-800",
  TEACHER: "bg-blue-100 text-blue-800",
  STUDENT: "bg-amber-100 text-amber-800",
};

export default function UsersTable({ users }: { users: User[] }) {
  const [query, setQuery] = useState("");
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [newPasswordData, setNewPasswordData] = useState<{
    name: string;
    password: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.loginId.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    );
  }, [users, query]);

  const handleRegenerate = async (user: User) => {
    if (
      !confirm(
        `Are you sure you want to REGENERATE the password for ${user.name}? The old password will stop working immediately.`,
      )
    )
      return;

    setRegeneratingId(user.id);
    try {
      const password = await regenerateUserPasswordAction(user.id);
      setNewPasswordData({ name: user.name, password });
    } catch (err: any) {
      alert(err.message || "Failed to regenerate password.");
    } finally {
      setRegeneratingId(null);
    }
  };

  const copyToClipboard = () => {
    if (newPasswordData?.password) {
      navigator.clipboard.writeText(newPasswordData.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Password Display Modal */}
      {newPasswordData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setNewPasswordData(null)}
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-xl font-black text-zinc-900">
                Password Regenerated
              </h3>
              <p className="text-sm text-zinc-500">
                New credentials for <b>{newPasswordData.name}</b>
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                New Temporary Password
              </span>
              <div className="relative">
                <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 font-mono text-lg font-bold text-eddyrose-deep text-center">
                  {newPasswordData.password}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-lg transition-all"
                >
                  {copied ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setNewPasswordData(null)}
              className="w-full bg-eddyrose-deep text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-eddyrose-light transition-all"
            >
              Close & Go Back
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={16}
          />
          <input
            id="user-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users…"
            className="pl-9 pr-4 py-3 sm:py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-eddyrose-light/50 focus:ring-2 focus:ring-eddyrose-light/10 w-full font-medium transition-all"
          />
        </div>
        <Link
          href="/portal/users/new"
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-6 py-3 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto text-center"
        >
          <Plus size={16} />
          Add User
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Login ID</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4 text-right">Security</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-zinc-400"
                >
                  {query
                    ? `No users match "${query}".`
                    : "No users found in the system."}
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.loginId}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-semibold ${ROLE_BADGE[user.role] || "bg-zinc-100 text-zinc-800"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRegenerate(user)}
                      disabled={regeneratingId === user.id}
                      className="text-amber-600 hover:text-amber-800 font-bold text-xs uppercase tracking-tighter flex items-center gap-1 ml-auto transition-all active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCw
                        size={12}
                        className={
                          regeneratingId === user.id ? "animate-spin" : ""
                        }
                      />
                      {regeneratingId === user.id
                        ? "Resetting..."
                        : "Reset Password"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
