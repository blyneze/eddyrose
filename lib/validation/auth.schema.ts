import { z } from "zod"

/**
 * Schema for portal login credentials.
 * Used by NextAuth CredentialsProvider to validate incoming login data.
 *
 * Security notes:
 * - Max lengths prevent bcrypt CPU exhaustion (bcrypt silently truncates at 72 bytes).
 * - Min lengths prevent trivially empty submissions.
 */
export const loginSchema = z.object({
  loginId: z
    .string()
    .min(1, "Login ID is required")
    .max(100, "Login ID is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password is too long"),
})

export type LoginInput = z.infer<typeof loginSchema>
