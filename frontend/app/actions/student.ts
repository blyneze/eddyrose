"use server";

import { auth } from "@/lib/auth";
import { backendStudents } from "@/lib/backend";
import { createStudentSchema, updateStudentSchema } from "@/lib/validation/student.schema";
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
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized");

  const raw = {
    name: formData.get("name") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    classId: formData.get("classId") as string || null,
    image: formData.get("image") as string || null,
    dateOfBirth: formData.get("dateOfBirth") as string || null,
    parentName: formData.get("parentName") as string || null,
    religion: formData.get("religion") as string || null,
    contactNumber: formData.get("contactNumber") as string || null,
    address: formData.get("address") as string || null,
    sex: formData.get("sex") as string || null,
  };

  const parsed = createStudentSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const result = await backendStudents.create(session.user, parsed.data);
  revalidatePath("/portal/students");
  return result;
}

export async function updateStudentAction(id: string, formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized");

  const raw = {
    name: formData.get("name") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    classId: formData.get("classId") as string || null,
    image: formData.get("image") as string || null,
    dateOfBirth: formData.get("dateOfBirth") as string || null,
    parentName: formData.get("parentName") as string || null,
    religion: formData.get("religion") as string || null,
    contactNumber: formData.get("contactNumber") as string || null,
    address: formData.get("address") as string || null,
    sex: formData.get("sex") as string || null,
  };

  const parsed = updateStudentSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  await backendStudents.update(session.user, id, parsed.data);

  revalidatePath("/portal/students");
  revalidatePath(`/portal/students/${id}`);
  redirect("/portal/students");
}

export async function deleteStudentAction(id: string) {
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized");

  await backendStudents.delete(session.user, id);

  revalidatePath("/portal/students");
}
