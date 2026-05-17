import { auth } from "@/lib/auth";
import { backendOverview, backendContent } from "@/lib/backend";
import { Users, GraduationCap, FileText, CalendarDays, Megaphone } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const session = await auth();

  if (!session) return null;

  // Parallel fetch stats and announcements
  const [statsData, contentData] = await Promise.all([
    backendOverview.stats(session.user),
    backendContent.get(session.user).catch(() => ({ announcements: [], events: [] }))
  ]);

  const { studentCount, classCount, draftCount, eventCount } = statsData;
  const announcements = contentData.announcements || [];

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
    <div className="max-w-6xl mx-auto space-y-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 min-h-[250px]">
                <h3 className="font-bold text-lg text-zinc-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-zinc-400" /> Recent Result Submissions
                </h3>
                <div className="flex items-center justify-center h-40 text-sm text-zinc-400 border-2 border-dashed border-zinc-100 rounded-xl bg-zinc-50/50">
                  No submissions pending review.
                </div>
              </div>


            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 h-fit space-y-6">
              <div>
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
                    + Add New Teacher
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
          </div>
        </>
      )}

      {session.user?.role !== "SUPERADMIN" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            {session.user?.role === "TEACHER" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 h-fit">
                <h3 className="font-bold text-lg text-zinc-900 mb-4">My Class</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4 font-medium">
                  You are logged in as a Faculty member. View your assigned students, update their scores, and submit results directly from the menu.
                </p>
                <Link
                  href="/portal/students"
                  className="w-full text-center px-4 py-3 bg-zinc-50 hover:bg-eddyrose-light hover:text-white rounded-lg text-sm font-semibold text-zinc-700 transition-colors block"
                >
                  View My Students
                </Link>
              </div>
            )}

            {session.user?.role === "PARENT" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 h-fit">
                <h3 className="font-bold text-lg text-zinc-900 mb-4">Parent Portal</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4 font-medium">
                  Access academic report cards and published results. Use the sidebar to switch children and download direct PDF reports.
                </p>
                <Link
                  href="/portal/children"
                  className="w-full text-center px-4 py-3 bg-zinc-50 hover:bg-eddyrose-light hover:text-white rounded-lg text-sm font-semibold text-zinc-700 transition-colors block"
                >
                  My Children
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
