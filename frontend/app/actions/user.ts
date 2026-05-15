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
    password: formData.get("password") as string,
    role: formData.get("role") as string,
  };

  const parsed = createUserSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  await backendUsers.create(session.user, parsed.data);

  revalidatePath("/portal/users");
  redirect("/portal/users");
}
