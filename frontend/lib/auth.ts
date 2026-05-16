import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "@/lib/validation/auth.schema"
import { getServerSession } from "next-auth"
import { backendAuth } from "@/lib/backend"

/**
 * NextAuth configuration.
 *
 * Credential verification is now delegated to the Express backend via
 * backendAuth.verify(). The frontend no longer imports Prisma or bcrypt.
 *
 * - H4: session.maxAge set to 8 hours.
 * - M6: signIn page is /portal.
 * - authorize() never returns a password hash — only id, name, role.
 * - loginSchema validates and enforces max-length on credentials before any network call.
 * - Rate limiting is enforced on the backend.
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

        try {
          // Delegate credential verification to the backend.
          // The backend handles rate limiting and bcrypt comparison.
          const user = await backendAuth.verify(loginId, password)
          if (!user) return null
          return {
            id: user.id,
            name: user.name,
            role: user.role as "SUPERADMIN" | "TEACHER" | "STUDENT",
          }
        } catch (err: any) {
          console.error("Authentication error from backend:", err.message)
          // Surface rate-limit errors to the login form
          if (err.message?.includes("Too many")) throw err
          return null
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
    signIn: "/portal",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
}

export const auth = () => getServerSession(authOptions)
