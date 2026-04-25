import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { CreateUserInput } from "@/lib/validation/user.schema"

/**
 * Safe user fields — never include password or any sensitive column.
 * Used as a Prisma `select` across all user-returning functions.
 */
const SAFE_USER_SELECT = {
  id: true,
  loginId: true,
  name: true,
  role: true,
  createdAt: true,
} as const

/**
 * Fetch all portal users, ordered newest-first.
 * Returns only safe, non-sensitive fields — password is never included.
 */
export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: SAFE_USER_SELECT,
    take: 500, // H5: prevent unbounded response on large datasets
  })
}

/**
 * Create a new portal user (SUPERADMIN / TEACHER / PARENT).
 * Automatically creates the corresponding profile record for TEACHER and PARENT roles.
 * Throws a typed error if the loginId already exists (Prisma P2002).
 *
 * Security: C5 FIX — returns only safe fields, never the password hash.
 */
export async function createUser(data: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        loginId: data.loginId,
        password: hashedPassword,
        role: data.role,
        ...(data.role === "TEACHER" ? { teacherProfile: { create: {} } } : {}),
        ...(data.role === "PARENT" ? { parentProfile: { create: {} } } : {}),
      },
      // C5 FIX: explicitly select only safe fields — never return password hash
      select: SAFE_USER_SELECT,
    })
    return user
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("A user with this Login ID already exists.")
    }
    throw new Error("Failed to create user.")
  }
}

/**
 * Fetch a single user by ID (for settings / profile display).
 * Returns only safe, non-sensitive fields.
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, loginId: true, role: true },
  })
}

/**
 * Update a user's display name.
 * Returns only safe fields — no password in response.
 */
export async function updateUserName(id: string, name: string) {
  if (!name.trim()) throw new Error("Name cannot be empty.")
  if (name.trim().length > 100) throw new Error("Name is too long.")
  return prisma.user.update({
    where: { id },
    data: { name: name.trim() },
    select: { id: true, name: true },
  })
}

/**
 * Change a user's password. Verifies current password before updating.
 * Returns only safe fields — no password hash in response.
 */
export async function updateUserPassword(
  id: string,
  currentPassword: string,
  newPassword: string
) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new Error("User not found.")

  const match = await bcrypt.compare(currentPassword, user.password)
  if (!match) throw new Error("Current password is incorrect.")

  if (newPassword.length < 6) throw new Error("New password must be at least 6 characters.")
  if (newPassword.length > 128) throw new Error("New password is too long.")

  const hashed = await bcrypt.hash(newPassword, 10)
  return prisma.user.update({
    where: { id },
    data: { password: hashed },
    select: { id: true },
  })
}
