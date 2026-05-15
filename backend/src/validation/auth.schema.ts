import { z } from 'zod'

export const loginSchema = z.object({
  loginId: z.string().min(1, 'Login ID is required').max(100, 'Login ID is too long'),
  password: z.string().min(1, 'Password is required').max(128, 'Password is too long'),
})

export type LoginInput = z.infer<typeof loginSchema>
