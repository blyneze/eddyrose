import { z } from "zod"

/**
 * Validation schema for public contact form submissions.
 * 
 * Security:
 * - Strict length limits to prevent DB abuse.
 * - Email format validation.
 * - Sanitized string content.
 */
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email is too long")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number is too long")
    .trim(),
  inquiryType: z
    .enum(["admissions", "tour", "general"], {
      message: "Please select a valid enquiry type",
    }),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long")
    .trim(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
