"use client";

import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  loginId: string;
  role: "SUPERADMIN" | "TEACHER" | "PARENT";
  createdAt: Date;
};

const ROLE_BADGE: Record<User["role"], string> = {
  SUPERADMIN: "bg-purple-100 text-purple-800",
  TEACHER: "bg-blue-100 text-blue-800",
  PARENT: "bg-green-100 text-green-800",
};

export default function UsersTable({ users }: { users: User[] }) {
  const [query, setQuery] = useState("");

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

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={16}
          />
          <input
            id="user-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, or role…"
            className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 w-64"
          />
        </div>
        <Link
          href="/portal/users/new"
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
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
              <th className="px-6 py-4 text-right">Actions</th>
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
                      className={`inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-semibold ${ROLE_BADGE[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-eddyrose-light hover:text-eddyrose-deep font-medium transition-colors">
                      Edit
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
