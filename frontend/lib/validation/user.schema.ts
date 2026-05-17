import { z } from "zod"

/**
 * Valid roles in the system.
 * Enumerated — any value outside this list is rejected by Zod at parse time.
 */
export const roleEnum = z.enum(["SUPERADMIN", "TEACHER", "PARENT"])

/**
 * Schema for creating a new portal user (teacher, parent, or admin).
 * Used by both the Server Action and the REST API route.
 *
 * Security notes:
 * - Max lengths prevent unbounded DB storage (H3).
 * - role is a strict enum — no privilege escalation via free-text role field.
 * - loginId is trimmed and normalised to lowercase to prevent duplicate
 *   accounts created with different cases.
 */
export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name is too long")
    .trim(),
  loginId: z
    .string()
    .min(3, "Login ID must be at least 3 characters")
    .max(100, "Login ID is too long")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password is too long")
    .optional(),
  role: roleEnum,
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
