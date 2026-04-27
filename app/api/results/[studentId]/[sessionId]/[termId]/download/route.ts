import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { ResultCalculator } from "@/lib/services/result-calculator"
import { PDFService } from "@/lib/services/pdf.service"
import prisma from "@/lib/prisma"
import { rateLimit } from "@/lib/ratelimit"

/**
 * GET /api/results/[studentId]/[sessionId]/[termId]/download
 * 
 * Secure Result Download Endpoint.
 * 
 * Logic:
 * 1. Auth check
 * 2. Permission check (RBAC)
 * 3. Fetch & Compute results
 * 4. PDF Generation
 * 5. Stream response
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ studentId: string; sessionId: string; termId: string }> }
) {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  const { studentId, sessionId, termId } = await params

  // 1. Rate Limiting (prevent scraping)
  const ratelimitResult = await rateLimit(session.user.id, "pdf_download", 5, 60 * 1000) // 5 per minute
  if (!ratelimitResult.success) {
    return new NextResponse("Too many requests. Please wait a minute.", { status: 429 })
  }

  try {
    // 2. Authorization Check
    let hasAccess = false

    if (session.user.role === "SUPERADMIN") {
      hasAccess = true
    } else if (session.user.role === "TEACHER") {
      // Check if teacher is assigned to the class of this student result
      const enrollment = await prisma.studentEnrollment.findFirst({
        where: { studentId, sessionId, termId },
      })
      if (enrollment) {
        const assignment = await prisma.teacherClassAssignment.findFirst({
          where: { 
            classId: enrollment.classId, 
            teacherProfile: { userId: session.user.id } 
          }
        })
        if (assignment) hasAccess = true
      }
    } else if (session.user.role === "PARENT") {
      // Check if student is linked to this parent
      const link = await prisma.parentStudentLink.findFirst({
        where: { 
          studentId, 
          parentProfile: { userId: session.user.id } 
        }
      })
      if (link) hasAccess = true
    } else if (session.user.id === studentId) {
      // Student accessing their own result (if they have a user account)
      // Note: In this system, students usually don't have separate portal logins, 
      // they use the Parent login, but we check just in case.
      hasAccess = true
    }

    if (!hasAccess) {
      return new NextResponse("Forbidden: You do not have permission to view this result.", { status: 403 })
    }

    // 3. Find the Result Sheet
    const resultSheet = await prisma.resultSheet.findFirst({
      where: { studentId, sessionId, termId },
    })

    if (!resultSheet) {
      return new NextResponse("Result not found for the selected session and term.", { status: 404 })
    }

    // 4. Approval Check
    if (resultSheet.status !== "PUBLISHED" && session.user.role !== "SUPERADMIN") {
      return new NextResponse("This result has not been published yet.", { status: 403 })
    }

    // 5. Compute Academic Data
    const calculatedData = await ResultCalculator.calculate(resultSheet.id)

    // 6. Generate PDF
    const pdfBuffer = await PDFService.generatePDF(calculatedData)

    // 7. Return PDF
    const filename = `Report_Card_${calculatedData.studentName.replace(/\s+/g, "_")}_${calculatedData.term}_${calculatedData.session}.pdf`
    
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })

  } catch (error: any) {
    console.error("PDF Download Error:", error)
    return new NextResponse("An internal error occurred during PDF generation.", { status: 500 })
  }
}
