import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createStudentAction } from "@/app/actions/student";
import { backendAcademic } from "@/lib/backend";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StudentForm from "@/components/students/StudentForm";

export default async function NewStudentPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") redirect("/");

  const { classes } = await backendAcademic.getData(session.user);

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
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Enroll New Student</h1>
          <p className="text-zinc-500 text-sm">Register a new student in the academy database.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 p-8 md:p-12">
        <StudentForm 
          classes={classes} 
          action={createStudentAction} 
          buttonText="Complete Enrollment"
        />
      </div>
    </div>
  );
}
