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
  name: z.string().min(1, "Student name is required").max(150, "Student name is too long").trim(),
  registrationNumber: z
    .string()
    .min(1, "Registration number is required")
    .max(50, "Registration number is too long")
    .regex(/^[A-Z0-9\/\-]+$/i, "Registration number should only contain letters, numbers, slashes, or hyphens")
    .trim()
    .toUpperCase(),
  classId: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  parentName: z.string().optional().nullable(),
  religion: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
})

export const updateStudentSchema = createStudentSchema.partial()

export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
