"use server";

import { auth } from "@/lib/auth";
import { backendStudents } from "@/lib/backend";
import { createStudentSchema } from "@/lib/validation/student.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Server Action: enroll a new student.
 *
 * Security fixes applied:
 * - C2: SUPERADMIN-only auth guard added (was completely unprotected).
 * - Validation via createStudentSchema (enforces lengths and format).
 */
export async function createStudentAction(formData: FormData) {
  // C2 FIX: require SUPERADMIN session
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") {
    throw new Error("Unauthorized");
  }

  const raw = {
    name: formData.get("name") as string,
    registrationNumber: formData.get("registrationNumber") as string,
  };

  const parsed = createStudentSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  await backendStudents.create(session.user, parsed.data);

  revalidatePath("/portal/students");
  redirect("/portal/students");
}
