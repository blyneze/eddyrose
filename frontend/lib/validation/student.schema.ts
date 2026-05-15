import { z } from "zod"

/**
 * Schema for enrolling a new student.
 * Used by the Server Action to validate form data before DB insertion.
 *
 * Security notes:
 * - Max lengths prevent unbounded DB storage (M1).
 * - registrationNumber regex is kept restrictive.
 */
export const createStudentSchema = z.object({
  name: z
    .string()
    .min(1, "Student name is required")
    .max(150, "Student name is too long")
    .trim(),
  registrationNumber: z
    .string()
    .min(1, "Registration number is required")
    .max(50, "Registration number is too long")
    .regex(
      /^[A-Z0-9\/\-]+$/i,
      "Registration number should only contain letters, numbers, slashes, or hyphens"
    )
    .trim()
    .toUpperCase(),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>
