"use server"

import { contactFormSchema } from "@/lib/validation/contact.schema"
import { backendContact } from "@/lib/backend"

/**
 * Server Action: Handle public contact form submissions.
 * 
 * Security:
 * - Rate limiting is now enforced on the backend.
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

  // 2. Delegate to the backend (handles rate limiting and actual logic)
  try {
    const result = await backendContact.submit(parsed.data)
    return result
  } catch (err: any) {
    // Surface rate-limit or other backend errors
    return {
      error: err.message || "An error occurred while submitting the form.",
      success: false
    }
  }
}
