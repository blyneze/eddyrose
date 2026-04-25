"use server";

import { auth } from "@/lib/auth";
import { createUser } from "@/lib/services/user.service";
import { createUserSchema } from "@/lib/validation/user.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Server Action: create a new portal user.
 *
 * Security fixes applied:
 * - C1: SUPERADMIN-only auth guard added (was completely unprotected).
 * - Validation via createUserSchema (rejects bad roles, enforces lengths).
 */
export async function createUserAction(formData: FormData) {
  // C1 FIX: require SUPERADMIN session
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

  await createUser(parsed.data);

  revalidatePath("/portal/users");
  redirect("/portal/users");
}
