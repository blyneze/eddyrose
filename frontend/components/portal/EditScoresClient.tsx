"use client"

import { useState, useTransition } from "react"
import { updateScoresAction } from "@/app/actions/result"
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Entry = {
  id: string
  subjectName: string
  testScore: number | null
  examScore: number | null
}

export default function EditScoresClient({
  resultSheetId,
  studentName,
  className,
  status,
  rejectionFeedback,
  initialEntries,
}: {
  resultSheetId: string
  studentName: string
  className: string
  status: string
  rejectionFeedback: string | null
  initialEntries: Entry[]
}) {
  const [entries, setEntries] = useState<Record<string, { test: number | null; exam: number | null }>>(
    initialEntries.reduce((acc, entry) => ({
      ...acc,
      [entry.id]: { test: entry.testScore, exam: entry.examScore }
    }), {})
  )
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSave = () => {
    setError("")
    startTransition(async () => {
      try {
        await updateScoresAction(resultSheetId, entries)
        router.push("/portal/results")
        router.refresh()
      } catch (e: any) {
        setError(e.message ?? "Failed to save scores.")
      }
    })
  }

  const handleScoreChange = (entryId: string, type: "test" | "exam", value: string) => {
    let numVal: number | null = value === "" ? null : parseFloat(value)
    if (numVal !== null && isNaN(numVal)) return

    if (numVal !== null) {
      if (type === "test" && numVal > 30) numVal = 30
      if (type === "exam" && numVal > 70) numVal = 70
      if (numVal < 0) numVal = 0
    }

    setEntries(prev => ({
      ...prev,
      [entryId]: { ...prev[entryId], [type]: numVal }
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/portal/results" 
          className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-eddyrose-deep transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Edit Scores</h1>
          <p className="text-zinc-500 text-sm">{studentName} — {className}</p>
        </div>
      </div>

      {status === "REJECTED" && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex gap-3 text-red-800">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm">Result Rejected</h3>
            <p className="text-xs mt-1">Admin Feedback: {rejectionFeedback}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex gap-3 text-red-800">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 w-1/2">Subject</th>
              <th className="px-6 py-4 w-1/4">Test (Max 30)</th>
              <th className="px-6 py-4 w-1/4">Exam (Max 70)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {initialEntries.map(entry => (
              <tr key={entry.id}>
                <td className="px-6 py-4 font-medium text-zinc-900">{entry.subjectName}</td>
                <td className="px-6 py-4">
                  <input 
                    type="number"
                    min="0"
                    max="30"
                    value={entries[entry.id]?.test ?? ""}
                    onChange={(e) => handleScoreChange(entry.id, "test", e.target.value)}
                    className="w-full max-w-[100px] border border-zinc-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light outline-none"
                  />
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="number"
                    min="0"
                    max="70"
                    value={entries[entry.id]?.exam ?? ""}
                    onChange={(e) => handleScoreChange(entry.id, "exam", e.target.value)}
                    className="w-full max-w-[100px] border border-zinc-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3">
        <Link 
          href="/portal/results"
          className="px-6 py-3 rounded-xl text-sm font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2 shadow-md shadow-eddyrose-deep/10"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Scores
        </button>
      </div>
    </div>
  )
}
