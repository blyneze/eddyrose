"use server";

import { auth } from "@/lib/auth";
import { backendUsers } from "@/lib/backend";
import { createUserSchema } from "@/lib/validation/user.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Server Action: create a new portal user.
 *
 * Security:
 * - SUPERADMIN-only auth guard.
 * - Validation via createUserSchema (rejects bad roles, enforces lengths).
 * - Creation delegated to the Express backend (no direct DB access here).
 */
export async function createUserAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") {
    throw new Error("Unauthorized");
  }

  const raw = {
    name: formData.get("name") as string,
    loginId: formData.get("loginId") as string,
    role: formData.get("role") as string,
    email: formData.get("email") as string || undefined,
    phoneNumber: formData.get("phoneNumber") as string || undefined,
  };

  // Password is auto-generated in backend
  const parsed = createUserSchema.partial({ password: true }).safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const result = await backendUsers.create(session.user, parsed.data as any);

  revalidatePath("/portal/users");
  return result;
}

export async function regenerateUserPasswordAction(userId: string) {
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") {
    throw new Error("Unauthorized");
  }

  const newPassword = await backendUsers.regeneratePassword(session.user, userId);
  revalidatePath("/portal/users");
  return newPassword;
}
