"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Latest News", href: "/parents" },
  { label: "Term Dates", href: "/parents/term-dates" },
  { label: "School Timings", href: "/parents/timings" },
  { label: "Uniform", href: "/parents/uniform" },
];

export default function TimingsPage() {
  return (
    <PageLayout
      title="School Timings"
      subtitle="Ensuring a structured and productive day for all our students."
      breadcrumbs={[
        { label: "PARENTS", href: "/parents" },
        { label: "TIMINGS", href: "/parents/timings" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="PARENTS"
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-8">
            Daily Schedule
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-zinc-100">
              <span className="font-bold text-eddyrose-deep">
                School Starts
              </span>
              <span className="text-zinc-500">8:00 AM</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-zinc-100">
              <span className="font-bold text-eddyrose-deep">Assembly</span>
              <span className="text-zinc-500">8:15 AM - 8:30 AM</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-zinc-100">
              <span className="font-bold text-eddyrose-deep">First Break</span>
              <span className="text-zinc-500">10:30 AM - 11:00 AM</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-zinc-100">
              <span className="font-bold text-eddyrose-deep">
                School Ends (Nursery)
              </span>
              <span className="text-zinc-500">1:30 PM</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-zinc-100">
              <span className="font-bold text-eddyrose-deep">
                School Ends (Primary)
              </span>
              <span className="text-zinc-500">3:00 PM</span>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
