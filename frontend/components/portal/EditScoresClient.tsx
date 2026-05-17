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

const AFFECTIVE_TRAITS = [
  { key: "verbalFluency", label: "Verbal Fluency" },
  { key: "handWriting", label: "Free Hand Movement/Hand Writing" },
  { key: "sports", label: "Singing/Games/Sports" },
  { key: "drawing", label: "Drawing & Painting" },
  { key: "toyHandling", label: "Handling Of Toy And Tools" },
  { key: "punctuality", label: "Punctuality" },
  { key: "neatness", label: "Neatness" },
  { key: "stability", label: "Emotional Stability" },
  { key: "politeness", label: "Politeness" },
  { key: "health", label: "Health" },
  { key: "interaction", label: "Interaction" },
  { key: "attentiveness", label: "Attentiveness" },
]

export default function EditScoresClient({
  resultSheetId,
  studentName,
  className,
  status,
  rejectionFeedback,
  initialEntries,
  initialTeacherComment = "",
  initialClosingDate = "",
  initialResumptionDate = "",
  initialAffectiveDomain = {},
}: {
  resultSheetId: string
  studentName: string
  className: string
  status: string
  rejectionFeedback: string | null
  initialEntries: Entry[]
  initialTeacherComment?: string
  initialClosingDate?: string
  initialResumptionDate?: string
  initialAffectiveDomain?: Record<string, boolean>
}) {
  const [entries, setEntries] = useState<Record<string, { test: number | null; exam: number | null }>>(
    initialEntries.reduce((acc, entry) => ({
      ...acc,
      [entry.id]: { test: entry.testScore, exam: entry.examScore }
    }), {})
  )
  const [teacherComment, setTeacherComment] = useState(initialTeacherComment)
  const [closingDate, setClosingDate] = useState(initialClosingDate)
  const [resumptionDate, setResumptionDate] = useState(initialResumptionDate)
  const [affectiveDomain, setAffectiveDomain] = useState<Record<string, boolean>>(initialAffectiveDomain)

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSave = () => {
    setError("")
    startTransition(async () => {
      try {
        const domainScores: Record<string, number> = {}
        Object.entries(affectiveDomain).forEach(([key, val]) => {
          domainScores[key] = val ? 1 : 0
        })

        await updateScoresAction(resultSheetId, entries, {
          teacherComment: teacherComment || null,
          closingDate: closingDate || null,
          resumptionDate: resumptionDate || null,
          affectiveDomain: domainScores,
        })
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

  const handleAffectiveChange = (key: string, checked: boolean) => {
    setAffectiveDomain(prev => ({
      ...prev,
      [key]: checked
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
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Edit Student Result</h1>
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

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
          <h3 className="font-bold text-zinc-900 text-base">Cognitive Domain Scores</h3>
          <p className="text-xs text-zinc-500 mt-1">Enter academic test (30%) and exam (70%) scores below.</p>
        </div>
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
                    className="w-full max-w-[100px] border border-zinc-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light outline-none font-semibold text-zinc-900"
                  />
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="number"
                    min="0"
                    max="70"
                    value={entries[entry.id]?.exam ?? ""}
                    onChange={(e) => handleScoreChange(entry.id, "exam", e.target.value)}
                    className="w-full max-w-[100px] border border-zinc-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light outline-none font-semibold text-zinc-900"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Affective Domain */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight border-b border-zinc-100 pb-2">Affective Domain (End of Term)</h3>
          <p className="text-xs text-zinc-500">Check the traits that apply to this student for this term.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {AFFECTIVE_TRAITS.map(trait => (
              <label key={trait.key} className="flex items-center gap-3 text-sm text-zinc-700 font-medium hover:text-eddyrose-deep transition-colors cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={!!affectiveDomain[trait.key]}
                  onChange={(e) => handleAffectiveChange(trait.key, e.target.checked)}
                  className="rounded text-eddyrose-light focus:ring-eddyrose-light/20 w-4 h-4 border-zinc-300"
                />
                {trait.label}
              </label>
            ))}
          </div>
        </div>

        {/* Remarks & School Calendar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight border-b border-zinc-100 pb-2">School Calendar & Remarks</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Class Teacher's Remark</label>
                <textarea 
                  value={teacherComment}
                  onChange={(e) => setTeacherComment(e.target.value)}
                  placeholder="Enter custom end of term comment for this student..."
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light outline-none resize-none min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Closing Date</label>
                  <input 
                    type="date"
                    value={closingDate}
                    onChange={(e) => setClosingDate(e.target.value)}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Resumption Date</label>
                  <input 
                    type="date"
                    value={resumptionDate}
                    onChange={(e) => setResumptionDate(e.target.value)}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-zinc-200 pt-6">
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
          Save Scores & Details
        </button>
      </div>
    </div>
  )
}
