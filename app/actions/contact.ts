"use server"

import { contactFormSchema } from "@/lib/validation/contact.schema"
import { rateLimit } from "@/lib/ratelimit"

/**
 * Server Action: Handle public contact form submissions.
 * 
 * Security:
 * - Rate limiting by email (2 attempts per 10 minutes).
 * - Strict Zod validation.
 * - No sensitive data returned to client.
 */
export async function submitContactFormAction(formData: FormData) {
  const raw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    inquiryType: formData.get("inquiryType") as string,
    message: formData.get("message") as string,
  }

  // 1. Validate input
  const parsed = contactFormSchema.safeParse(raw)
  if (!parsed.success) {
    return { 
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
      success: false 
    }
  }

  const { email } = parsed.data

  // 2. Apply rate limiting (2 submissions per 10 minutes per email)
  const ratelimitResult = await rateLimit(email, "contact", 2, 10 * 60 * 1000)
  if (!ratelimitResult.success) {
    return { 
      error: "Too many submissions. Please wait 10 minutes before trying again.",
      success: false 
    }
  }

  // 3. Process the submission (e.g., save to DB or send email)
  // For now, we simulate a successful save.
  console.log("Contact Form Submission:", parsed.data)

  // NOTE: In a real app, you'd use a service here:
  // await createContactEnquiry(parsed.data)

  return { 
    success: true, 
    message: "Thank you! Your message has been received. We will get back to you soon." 
  }
}
