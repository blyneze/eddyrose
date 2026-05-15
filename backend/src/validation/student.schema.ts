import { z } from 'zod'

export const createStudentSchema = z.object({
  name: z.string().min(1, 'Student name is required').max(150, 'Student name is too long').trim(),
  registrationNumber: z
    .string()
    .min(1, 'Registration number is required')
    .max(50, 'Registration number is too long')
    .regex(/^[A-Z0-9\/\-]+$/i, 'Registration number should only contain letters, numbers, slashes, or hyphens')
    .trim()
    .toUpperCase(),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>
