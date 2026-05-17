import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { updateStudentAction } from "@/app/actions/student";
import { backendStudents, backendAcademic } from "@/lib/backend";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StudentForm from "@/components/students/StudentForm";

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") redirect("/");

  const { id } = await params;

  const [student, { classes }] = await Promise.all([
    backendStudents.getById(session.user, id),
    backendAcademic.getData(session.user),
  ]);

  if (!student) notFound();

  // Create a bound action for the form
  const boundUpdateAction = updateStudentAction.bind(null, id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/portal/students" 
          className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-eddyrose-deep transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Edit Student Profile</h1>
          <p className="text-zinc-500 text-sm">Update records for {student.name}.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 p-8 md:p-12">
        <StudentForm 
          initialData={student}
          classes={classes} 
          action={boundUpdateAction} 
          buttonText="Update Records"
        />
      </div>
    </div>
  );
}
