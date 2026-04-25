"use client"

import { useState, useTransition } from "react"
import { updateProfileAction, changePasswordAction } from "@/app/actions/settings"
import { User, Lock, CheckCircle, Loader2, AlertCircle } from "lucide-react"

type Tab = "profile" | "password"

export default function SettingsPanel({
  initialName,
  loginId,
}: {
  initialName: string
  loginId: string
}) {
  const [tab, setTab] = useState<Tab>("profile")
  const [isPending, startTransition] = useTransition()

  // Profile state
  const [name, setName] = useState(initialName)
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Password state
  const [passMsg, setPassMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleProfile = (formData: FormData) => {
    setProfileMsg(null)
    startTransition(async () => {
      try {
        await updateProfileAction(formData)
        setName(formData.get("name") as string)
        setProfileMsg({ type: "success", text: "Profile updated successfully." })
      } catch (e: any) {
        setProfileMsg({ type: "error", text: e.message ?? "Failed to update profile." })
      }
    })
  }

  const handlePassword = (formData: FormData) => {
    setPassMsg(null)
    startTransition(async () => {
      try {
        await changePasswordAction(formData)
        setPassMsg({ type: "success", text: "Password changed successfully." })
        // Clear password fields via form reset
        const form = document.getElementById("password-form") as HTMLFormElement | null
        form?.reset()
      } catch (e: any) {
        setPassMsg({ type: "error", text: e.message ?? "Failed to change password." })
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-zinc-200">
        {(["profile", "password"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              tab === t
                ? "border-eddyrose-deep text-eddyrose-deep"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {t === "profile" ? <User size={16} /> : <Lock size={16} />}
            {t === "profile" ? "My Profile" : "Change Password"}
          </button>
        ))}
      </div>

      <div className="p-8">
        {tab === "profile" && (
          <form action={handleProfile} className="max-w-md space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">
                Login ID
              </label>
              <input
                type="text"
                value={loginId}
                disabled
                className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-400 cursor-not-allowed"
              />
              <p className="text-xs text-zinc-400">Login ID cannot be changed.</p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="profile-name"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wide"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                name="name"
                type="text"
                required
                defaultValue={name}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all"
              />
            </div>

            {profileMsg && (
              <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
                profileMsg.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {profileMsg.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {profileMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? "Saving…" : "Save Changes"}
            </button>
          </form>
        )}

        {tab === "password" && (
          <form id="password-form" action={handlePassword} className="max-w-md space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="currentPassword"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wide"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="newPassword"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wide"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-bold text-zinc-700 uppercase tracking-wide"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Repeat new password"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all"
              />
            </div>

            {passMsg && (
              <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
                passMsg.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {passMsg.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {passMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? "Updating…" : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
