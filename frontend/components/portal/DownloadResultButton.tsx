"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"

type Props = {
  studentId: string
  sessionId: string
  termId: string
  studentName: string
  variant?: "primary" | "secondary"
}

export default function DownloadResultButton({
  studentId,
  sessionId,
  termId,
  studentName,
  variant = "primary",
}: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/results/${studentId}/${sessionId}/${termId}/download`)
      
      if (!res.ok) {
        const error = await res.text()
        alert(error || "Failed to download result.")
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Report_Card_${studentName.replace(/\s+/g, "_")}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error(err)
      alert("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  if (variant === "secondary") {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className="text-eddyrose-light font-medium hover:text-eddyrose-deep flex items-center gap-1.5 transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        Download PDF
      </button>
    )
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="w-full bg-eddyrose-deep text-white py-2.5 rounded-lg font-semibold hover:bg-eddyrose-light transition-all flex items-center justify-center gap-2 disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Preparing Report...
        </>
      ) : (
        <>
          <Download size={18} />
          Download Report Card
        </>
      )}
    </button>
  )
}
