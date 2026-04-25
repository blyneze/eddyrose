/**
 * NextAuth type augmentation.
 *
 * Extends the default NextAuth Session and JWT types to include
 * the `role` and `id` fields that are added in auth.ts callbacks.
 *
 * This file must be present so that all code using `session.user.role`
 * and `session.user.id` type-checks correctly throughout the project.
 */

import type { DefaultSession, DefaultUser } from "next-auth"
import type { DefaultJWT } from "next-auth/jwt"

type UserRole = "SUPERADMIN" | "TEACHER" | "PARENT"

declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRole
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string
    role?: UserRole
  }
}
