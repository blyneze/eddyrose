"use server"

import { auth } from "@/lib/auth"
import { updateUserName, updateUserPassword } from "@/lib/services/user.service"
import { revalidatePath } from "next/cache"

export async function updateProfileAction(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  const name = (formData.get("name") as string | null)?.trim()
  if (!name) throw new Error("Name cannot be empty.")

  await updateUserName(session.user.id, name)
  revalidatePath("/portal/settings")
}

export async function changePasswordAction(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All password fields are required.")
  }
  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match.")
  }

  await updateUserPassword(session.user.id, currentPassword, newPassword)
}
