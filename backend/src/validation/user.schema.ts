import { z } from 'zod'

export const roleEnum = z.enum(['SUPERADMIN', 'TEACHER', 'STUDENT'])

export const createUserSchema = z.object({
  name: z.string().min(1, 'Full name is required').max(100, 'Full name is too long').trim(),
  loginId: z
    .string()
    .min(3, 'Login ID must be at least 3 characters')
    .max(100, 'Login ID is too long')
    .trim()
    .toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters').max(128, 'Password is too long'),
  role: roleEnum,
})

export type CreateUserInput = z.infer<typeof createUserSchema>
