import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { backendResults } from "@/lib/backend"

/**
 * GET /api/results/[studentId]/[sessionId]/[termId]/download
 * 
 * Secure Result Download Endpoint.
 * 
 * Proxies the request to the Express backend where PDF generation
 * happens via Puppeteer.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ studentId: string; sessionId: string; termId: string }> }
) {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  const { studentId, sessionId, termId } = await params

  try {
    const backendResponse = await backendResults.downloadPDF(
      session.user,
      studentId,
      sessionId,
      termId
    )

    // Pass through the exact headers (Content-Type, Content-Disposition, etc.)
    const headers = new Headers()
    backendResponse.headers.forEach((value: string, key: string) => {
      headers.set(key, value)
    })

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers,
    })
  } catch (error: any) {
    console.error("PDF Download Proxy Error:", error)
    return new NextResponse(error.message || "An internal error occurred during PDF generation.", {
      status: error.message?.includes("Forbidden") ? 403 : 
              error.message?.includes("Too many") ? 429 : 500,
    })
  }
}
