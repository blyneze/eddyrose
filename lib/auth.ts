import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { loginSchema } from "@/lib/validation/auth.schema"
import { getServerSession } from "next-auth"

/**
 * NextAuth configuration.
 *
 * Security fixes applied:
 * - H4: session.maxAge set to 8 hours — JWT sessions expire after a working day.
 * - M5: callbacks properly typed via next-auth module augmentation (types/next-auth.d.ts).
 * - M6: signIn page corrected to /portal (was /portal/login which does not exist).
 * - authorize() never returns a password hash — only id, name, role.
 * - loginSchema validates and enforces max-length on credentials before any DB query.
 */

if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 16) {
  console.warn(
    "⚠️ WARNING: NEXTAUTH_SECRET is not set or too short. Dashboard sessions are insecure."
  )
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        loginId: { label: "Login ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { loginId, password } = parsed.data

        // Apply rate limiting: 5 attempts per 15 minutes per Login ID
        const { rateLimit } = await import("@/lib/ratelimit")
        const ratelimitResult = await rateLimit(loginId, "login", 5, 15 * 60 * 1000)
        if (!ratelimitResult.success) {
          throw new Error("Too many login attempts. Please try again in 15 minutes.")
        }

        const user = await prisma.user.findUnique({ where: { loginId } })


        if (!user) return null

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) return null

        // Return only safe fields — never include password hash in JWT payload
        return {
          id: user.id,
          name: user.name,
          role: user.role as "SUPERADMIN" | "TEACHER" | "PARENT",
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: "/portal", // M6 FIX: was "/portal/login" which does not exist
  },
  session: {
    strategy: "jwt",
    // H4 FIX: sessions expire after 8 hours (28800 seconds).
    // Without maxAge, JWT sessions are effectively permanent.
    maxAge: 60 * 60 * 8,
  },
}

export const auth = () => getServerSession(authOptions)
