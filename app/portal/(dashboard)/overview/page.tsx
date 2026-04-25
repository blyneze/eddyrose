import { auth } from "@/lib/auth";
import { getDashboardStats } from "@/lib/services/overview.service";
import { Users, GraduationCap, FileText, CalendarDays } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const session = await auth();

  if (!session) return null;

  const { studentCount, classCount, draftCount, eventCount } =
    await getDashboardStats();

  const stats = [
    {
      label: "Total Students",
      value: studentCount.toString(),
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Active Classes",
      value: classCount.toString(),
      icon: GraduationCap,
      color: "text-eddyrose-gold",
      bg: "bg-eddyrose-gold/10",
    },
    {
      label: "Draft Results",
      value: draftCount.toString(),
      icon: FileText,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Upcoming Events",
      value: eventCount.toString(),
      icon: CalendarDays,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-zinc-500 mt-1">
          Here is what's happening at Eddyrose Academy today.
        </p>
      </div>

      {session.user?.role === "SUPERADMIN" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-3 rounded-[1rem] shadow-sm border border-zinc-100 flex items-center gap-3 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-500">
                      {stat.label}
                    </div>
                    <div className="text-xl font-bold text-zinc-900">
                      {stat.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 min-h-[300px]">
              <h3 className="font-bold text-lg text-zinc-900 mb-4">
                Recent Result Submissions
              </h3>
              <div className="flex items-center justify-center h-48 text-sm text-zinc-400 border-2 border-dashed border-zinc-100 rounded-xl bg-zinc-50/50">
                No submissions pending review.
              </div>
            </div>

            <div className="bg-white p-4 rounded-[1rem] shadow-sm border border-zinc-100 min-h-[300px]">
              <h3 className="font-bold text-lg text-zinc-900 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/portal/students/new"
                  className="text-left px-4 py-3 bg-zinc-50 hover:bg-eddyrose-light hover:text-white rounded-lg text-sm font-semibold text-zinc-700 transition-colors"
                >
                  + Add New Student
                </Link>
                <Link
                  href="/portal/users/new"
                  className="text-left px-4 py-3 bg-zinc-50 hover:bg-eddyrose-light hover:text-white rounded-lg text-sm font-semibold text-zinc-700 transition-colors"
                >
                  + Add New Teacher / Parent
                </Link>
                <Link
                  href="/portal/classes"
                  className="text-left px-4 py-3 bg-zinc-50 hover:bg-eddyrose-light hover:text-white rounded-lg text-sm font-semibold text-zinc-700 transition-colors"
                >
                  Configure Academic Session
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {session.user?.role === "TEACHER" && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
          You have no pending results to submit for your assigned class.
        </div>
      )}

      {session.user?.role === "PARENT" && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
          Select a child from the menu to view their published results.
        </div>
      )}
    </div>
  );
}
