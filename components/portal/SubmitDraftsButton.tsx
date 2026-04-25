"use client"

import { useState, useTransition } from "react"
import { submitDraftsAction } from "@/app/actions/result"
import { Send, Loader2, CheckCircle } from "lucide-react"

export default function SubmitDraftsButton({ classId }: { classId: string }) {
  const [isPending, startTransition] = useTransition()
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    setError("")
    startTransition(async () => {
      try {
        await submitDraftsAction(classId)
        setDone(true)
      } catch (e: any) {
        setError(e.message ?? "Failed to submit.")
      }
    })
  }

  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
        <CheckCircle size={16} /> Submitted for Review
      </span>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-eddyrose-deep hover:bg-eddyrose-light text-white text-sm px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {isPending ? "Submitting…" : "Submit All Drafts for Approval"}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
