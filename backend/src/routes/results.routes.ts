import { Router } from 'express'
import { requireApiSecret, requireRole, getActingUser } from '../middleware/apiAuth'
import {
  getAdminResults,
  getTeacherResults,
  getParentResults,
  publishResult,
  rejectResult,
  submitClassDrafts,
  getResultForEdit,
  updateResultScores,
  getResultSheetByStudentSessionTerm,
} from '../services/result.service'
import { ResultCalculator } from '../services/result-calculator'
import { PDFService } from '../services/pdf.service'
import { idSchema } from '../validation/content.schema'
import { rateLimit } from '../lib/rateLimit'
import prisma from '../lib/prisma'

const router = Router()
router.use(requireApiSecret)

/** GET /api/results/admin */
router.get('/admin', requireRole('SUPERADMIN'), async (_req, res) => {
  const results = await getAdminResults()
  res.json(results)
})

/** GET /api/results/teacher */
router.get('/teacher', requireRole('TEACHER'), async (req, res) => {
  const actor = getActingUser(req)!
  const data = await getTeacherResults(actor.id)
  res.json(data)
})

/** GET /api/results/parent */
router.get('/parent', requireRole('PARENT'), async (req, res) => {
  const actor = getActingUser(req)!
  const data = await getParentResults(actor.id)
  res.json(data)
})

/** GET /api/results/:id — get a single sheet for editing */
router.get('/:id', async (req, res) => {
  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }
  const sheet = await getResultForEdit(parsed.data)
  if (!sheet) { res.status(404).json({ error: 'Result sheet not found.' }); return }
  res.json(sheet)
})

/** GET /api/results/:id/pdf — generate and stream PDF */
router.get('/:id/pdf', async (req, res) => {
  const actor = getActingUser(req)
  if (!actor) { res.status(401).json({ error: 'Unauthorized.' }); return }

  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }

  // Rate limit: 5 PDF downloads per minute per user
  const limited = await rateLimit(actor.id, 'pdf_download', 5, 60 * 1000)
  if (!limited.success) {
    res.status(429).json({ error: 'Too many requests. Please wait a minute.' })
    return
  }

  try {
    const sheet = await getResultForEdit(parsed.data)
    if (!sheet) { res.status(404).json({ error: 'Result not found.' }); return }

    if (sheet.status !== 'PUBLISHED' && actor.role !== 'SUPERADMIN') {
      res.status(403).json({ error: 'This result has not been published yet.' })
      return
    }

    const calculatedData = await ResultCalculator.calculate(parsed.data)
    const pdfBuffer = await PDFService.generatePDF(calculatedData)
    const filename = `Report_Card_${calculatedData.studentName.replace(/\s+/g, '_')}_${calculatedData.term}_${calculatedData.session}.pdf`

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length,
    })
    res.send(pdfBuffer)
  } catch (err: any) {
    console.error('PDF generation error:', err)
    res.status(500).json({ error: 'Failed to generate PDF.' })
  }
})

/**
 * GET /api/results/:id/review
 * Returns the fully-calculated result data for the admin review page.
 * Validates that the sheet is SUBMITTED or REJECTED before calculating.
 */
router.get('/:id/review', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }

  try {
    const sheet = await getResultForEdit(parsed.data)
    if (!sheet) { res.status(404).json({ error: 'Result not found.' }); return }
    if (sheet.status !== 'SUBMITTED' && sheet.status !== 'REJECTED') {
      res.status(403).json({ error: 'Result is not available for review.' }); return
    }
    const calculatedData = await ResultCalculator.calculate(parsed.data)
    res.json(calculatedData)
  } catch (err: any) {
    console.error('Review result error:', err)
    res.status(500).json({ error: 'Failed to calculate result data.' })
  }
})

/**
 * GET /api/results/download/:studentId/:sessionId/:termId
 * Access-controlled PDF download (called from the Next.js API route).
 */
router.get('/download/:studentId/:sessionId/:termId', async (req, res) => {
  const actor = getActingUser(req)
  if (!actor) { res.status(401).json({ error: 'Unauthorized.' }); return }

  const { studentId, sessionId, termId } = req.params

  // Rate limit: 5 per minute per user
  const limited = await rateLimit(actor.id, 'pdf_download', 5, 60 * 1000)
  if (!limited.success) {
    res.status(429).json({ error: 'Too many requests. Please wait a minute.' })
    return
  }

  try {
    // RBAC check
    let hasAccess = false
    if (actor.role === 'SUPERADMIN') {
      hasAccess = true
    } else if (actor.role === 'TEACHER') {
      const enrollment = await prisma.studentEnrollment.findFirst({ where: { studentId, sessionId, termId } })
      if (enrollment) {
        const assignment = await prisma.teacherClassAssignment.findFirst({
          where: { classId: enrollment.classId, teacherProfile: { userId: actor.id } },
        })
        if (assignment) hasAccess = true
      }
    } else if (actor.role === 'PARENT') {
      const link = await prisma.parentStudentLink.findFirst({
        where: { studentId, parentProfile: { userId: actor.id } },
      })
      if (link) hasAccess = true
    }

    if (!hasAccess) { res.status(403).json({ error: 'Forbidden.' }); return }

    const resultSheet = await getResultSheetByStudentSessionTerm(studentId, sessionId, termId)
    if (!resultSheet) { res.status(404).json({ error: 'Result not found.' }); return }
    if (resultSheet.status !== 'PUBLISHED' && actor.role !== 'SUPERADMIN') {
      res.status(403).json({ error: 'This result has not been published yet.' })
      return
    }

    const calculatedData = await ResultCalculator.calculate(resultSheet.id)
    const pdfBuffer = await PDFService.generatePDF(calculatedData)
    const filename = `Report_Card_${calculatedData.studentName.replace(/\s+/g, '_')}_${calculatedData.term}_${calculatedData.session}.pdf`

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length,
    })
    res.send(pdfBuffer)
  } catch (err: any) {
    console.error('PDF Download Error:', err)
    res.status(500).json({ error: 'An internal error occurred during PDF generation.' })
  }
})

/** POST /api/results/:id/publish */
router.post('/:id/publish', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }
  try {
    const result = await publishResult(parsed.data)
    res.json(result)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

/** POST /api/results/:id/reject */
router.post('/:id/reject', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }
  const { feedback } = req.body
  if (!feedback?.trim()) { res.status(400).json({ error: 'Feedback is required.' }); return }
  try {
    const result = await rejectResult(parsed.data, feedback)
    res.json(result)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

/** PUT /api/results/:id/scores */
router.put('/:id/scores', requireRole('TEACHER'), async (req, res) => {
  const actor = getActingUser(req)!
  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }

  const sheet = await getResultForEdit(parsed.data)
  if (!sheet) { res.status(404).json({ error: 'Result sheet not found.' }); return }

  // Verify teacher owns this class
  const { assignedClass } = await getTeacherResults(actor.id)
  if (!assignedClass || assignedClass.id !== sheet.classId) {
    res.status(403).json({ error: 'Forbidden: you are not assigned to this class.' })
    return
  }

  try {
    await updateResultScores(parsed.data, req.body.scores)
    res.json({ success: true })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

/** POST /api/results/class/:classId/submit */
router.post('/class/:classId/submit', requireRole('TEACHER'), async (req, res) => {
  const actor = getActingUser(req)!
  const parsed = idSchema.safeParse(req.params.classId)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid class ID.' }); return }

  const { assignedClass } = await getTeacherResults(actor.id)
  if (!assignedClass || assignedClass.id !== parsed.data) {
    res.status(403).json({ error: 'Forbidden: you are not assigned to this class.' })
    return
  }
  await submitClassDrafts(parsed.data)
  res.json({ success: true })
})

export default router
