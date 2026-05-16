import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { generateDefaultPassword } from '../lib/auth-utils'
import { CreateUserInput } from '../validation/user.schema'

const SAFE_USER_SELECT = {
  id: true,
  loginId: true,
  name: true,
  role: true,
  createdAt: true,
} as const

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: SAFE_USER_SELECT,
    take: 500,
  })
}

export async function createUser(data: CreateUserInput) {
  const defaultPassword = generateDefaultPassword()
  const hashedPassword = await bcrypt.hash(defaultPassword, 10)
  
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        loginId: data.loginId,
        password: hashedPassword,
        role: data.role,
        ...(data.role === 'TEACHER' ? { teacherProfile: { create: {} } } : {}),
      },
      select: SAFE_USER_SELECT,
    })
    
    return { ...user, generatedPassword: defaultPassword }
  } catch (error: any) {
    if (error.code === 'P2002') throw new Error('A user with this Login ID already exists.')
    throw new Error('Failed to create user.')
  }
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, loginId: true, role: true },
  })
}

export async function updateUserName(id: string, name: string) {
  if (!name.trim()) throw new Error('Name cannot be empty.')
  if (name.trim().length > 100) throw new Error('Name is too long.')
  return prisma.user.update({
    where: { id },
    data: { name: name.trim() },
    select: { id: true, name: true },
  })
}

export async function updateUserPassword(id: string, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new Error('User not found.')

  const match = await bcrypt.compare(currentPassword, user.password)
  if (!match) throw new Error('Current password is incorrect.')

  if (newPassword.length < 6) throw new Error('New password must be at least 6 characters.')
  if (newPassword.length > 128) throw new Error('New password is too long.')

  const hashed = await bcrypt.hash(newPassword, 10)
  return prisma.user.update({
    where: { id },
    data: { password: hashed },
    select: { id: true },
  })
}

/** Administrative reset: Set a specific password */
export async function resetUserPassword(id: string, newPassword: string) {
  if (newPassword.length < 6) throw new Error('Password must be at least 6 characters.')
  const hashed = await bcrypt.hash(newPassword, 10)
  return prisma.user.update({
    where: { id },
    data: { password: hashed },
    select: { id: true },
  })
}

/** Administrative regeneration: Generate and return a new random password */
export async function regenerateUserPassword(id: string) {
  const newPassword = generateDefaultPassword()
  const hashed = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id },
    data: { password: hashed },
  })
  return newPassword
}

/** Used by the auth route to verify credentials and return safe user fields. */
export async function verifyCredentials(loginId: string, password: string) {
  const user = await prisma.user.findUnique({ where: { loginId } })
  if (!user) return null
  const match = await bcrypt.compare(password, user.password)
  if (!match) return null
  return { id: user.id, name: user.name, role: user.role }
}

