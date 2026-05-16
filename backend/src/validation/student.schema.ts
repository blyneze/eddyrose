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
  classId: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(), // Store as ISO string
  parentName: z.string().optional().nullable(),
  religion: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
})

export const updateStudentSchema = createStudentSchema.partial()

export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
