"use client"

import { useState, useTransition } from "react"
import { publishResultAction } from "@/app/actions/result"
import { CheckCircle, Loader2 } from "lucide-react"

export default function PublishButton({ resultSheetId }: { resultSheetId: string }) {
  const [isPending, startTransition] = useTransition()
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const handlePublish = () => {
    setError("")
    startTransition(async () => {
      try {
        await publishResultAction(resultSheetId)
        setDone(true)
      } catch (e: any) {
        setError(e.message ?? "Failed to publish.")
      }
    })
  }

  if (done) {
    return (
      <span className="inline-flex items-center gap-1 text-green-700 text-xs font-semibold">
        <CheckCircle size={14} /> Published
      </span>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handlePublish}
        disabled={isPending}
        className="bg-eddyrose-deep text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-eddyrose-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
      >
        {isPending && <Loader2 size={12} className="animate-spin" />}
        {isPending ? "Publishing…" : "Review & Publish"}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
