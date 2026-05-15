import { Router } from 'express'
import { contactFormSchema } from '../validation/contact.schema'
import { rateLimit } from '../lib/rateLimit'

const router = Router()

/** POST /api/contact — public contact form submission */
router.post('/', async (req, res) => {
  const parsed = contactFormSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid form data.', success: false })
    return
  }

  const { email } = parsed.data
  const limited = await rateLimit(email, 'contact', 2, 10 * 60 * 1000)
  if (!limited.success) {
    res.status(429).json({
      error: 'Too many submissions. Please wait 10 minutes before trying again.',
      success: false,
    })
    return
  }

  // Log for now — in production, connect to an email service or save to DB
  console.log('Contact Form Submission:', parsed.data)

  res.json({ success: true, message: 'Thank you! Your message has been received. We will get back to you soon.' })
})

export default router
