"use server"

import { auth } from "@/lib/auth"
import { backendAcademic } from "@/lib/backend"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const nameSchema = z.string().min(1, "Name is required").max(100, "Name is too long").trim()

export async function createClassAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const name = nameSchema.parse(formData.get("name"))
  
  await backendAcademic.createClass(session.user, name)
  revalidatePath("/portal/classes")
}

export async function createSessionAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const name = nameSchema.parse(formData.get("name"))
  
  await backendAcademic.createSession(session.user, name)
  revalidatePath("/portal/classes")
}

export async function createTermAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const name = nameSchema.parse(formData.get("name"))
  
  await backendAcademic.createTerm(session.user, name)
  revalidatePath("/portal/classes")
}

export async function createSubjectAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const name = nameSchema.parse(formData.get("name"))
  
  await backendAcademic.createSubject(session.user, name)
  revalidatePath("/portal/classes")
}

export async function setAsCurrentAction(id: string, type: "SESSION" | "TERM") {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  await backendAcademic.setCurrent(session.user, id, type)
  revalidatePath("/portal/classes")
}

export async function assignTeacherAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const classId = z.string().parse(formData.get("classId"))
  const teacherId = z.string().parse(formData.get("teacherId"))

  await backendAcademic.assignTeacher(session.user, classId, teacherId)
  revalidatePath("/portal/classes")
}

export async function linkSubjectToClassAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const classId = z.string().parse(formData.get("classId"))
  const subjectId = z.string().parse(formData.get("subjectId"))

  await backendAcademic.linkSubject(session.user, classId, subjectId)
  revalidatePath("/portal/classes")
}
