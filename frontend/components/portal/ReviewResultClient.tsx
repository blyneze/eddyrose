"use client"

import { useState, useTransition } from "react"
import { publishResultAction, rejectResultAction } from "@/app/actions/result"
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
export type CalculatedSubjectEntry = {
  subjectName: string
  testScore: number
  examScore: number
  totalScore: number
  grade: string
  remark: string
  classAverage: number
  highestInClass: number
  lowestInClass: number
}

export type FullCalculatedResult = {
  studentName: string
  registrationNumber: string
  className: string
  classSize: number
  session: string
  term: string
  entries: CalculatedSubjectEntry[]
  totalScore: number
  average: number
  classAverage: number
  position: string
  status: string
  passStatus: 'PASS' | 'FAIL'
  overallRating: number
  affectiveDomain: Record<string, number>
  teacherComment: string
  principalComment: string
  closingDate?: Date
  resumptionDate?: Date
}

export default function ReviewResultClient({
  resultSheetId,
  result,
}: {
  resultSheetId: string
  result: FullCalculatedResult
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [rejectMode, setRejectMode] = useState(false)
  const [feedback, setFeedback] = useState("")
  const router = useRouter()

  const handlePublish = () => {
    setError("")
    startTransition(async () => {
      try {
        await publishResultAction(resultSheetId)
        router.push("/portal/results")
        router.refresh()
      } catch (e: any) {
        setError(e.message ?? "Failed to publish result.")
      }
    })
  }

  const handleReject = () => {
    if (!feedback.trim()) {
      setError("Please provide rejection feedback.")
      return
    }
    setError("")
    startTransition(async () => {
      try {
        await rejectResultAction(resultSheetId, feedback)
        router.push("/portal/results")
        router.refresh()
      } catch (e: any) {
        setError(e.message ?? "Failed to reject result.")
      }
    })
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
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Review Result</h1>
          <p className="text-zinc-500 text-sm">{result.studentName} — {result.className}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Preview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div><span className="block text-zinc-500 mb-1">Session</span><span className="font-bold text-zinc-900">{result.session}</span></div>
          <div><span className="block text-zinc-500 mb-1">Term</span><span className="font-bold text-zinc-900">{result.term}</span></div>
          <div><span className="block text-zinc-500 mb-1">Average</span><span className="font-bold text-zinc-900">{result.average.toFixed(2)}%</span></div>
          <div><span className="block text-zinc-500 mb-1">Position</span><span className="font-bold text-zinc-900">{result.position}</span></div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3 text-right">Test</th>
                <th className="px-4 py-3 text-right">Exam</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Grade</th>
                <th className="px-4 py-3">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {result.entries.map((e, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50">
                  <td className="px-4 py-3 font-medium text-zinc-900">{e.subjectName}</td>
                  <td className="px-4 py-3 text-right">{e.testScore}</td>
                  <td className="px-4 py-3 text-right">{e.examScore}</td>
                  <td className="px-4 py-3 text-right font-bold">{e.totalScore}</td>
                  <td className="px-4 py-3 text-center font-bold text-eddyrose-deep">{e.grade}</td>
                  <td className="px-4 py-3 text-xs">{e.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!rejectMode ? (
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
            <button 
              onClick={() => setRejectMode(true)}
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              Reject Submission
            </button>
            <button
              onClick={handlePublish}
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2 shadow-md shadow-green-600/20"
            >
              {isPending ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
              Approve & Publish
            </button>
          </div>
        ) : (
          <div className="bg-red-50/50 border border-red-100 rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-red-800 text-sm">Reject Result Submission</h3>
            <textarea
              placeholder="Explain to the teacher why this result is being rejected..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none min-h-[100px]"
            />
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setRejectMode(false)}
                disabled={isPending}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-600 hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2 shadow-md shadow-red-600/20"
              >
                {isPending ? <Loader2 size={18} className="animate-spin" /> : <XCircle size={18} />}
                Confirm Rejection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
