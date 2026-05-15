"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Latest News", href: "/parents" },
  { label: "Term Dates", href: "/parents/term-dates" },
  { label: "School Timings", href: "/parents/timings" },
  { label: "Uniform", href: "/parents/uniform" },
];

export default function TermDatesPage() {
  return (
    <PageLayout
      title="Term Dates"
      subtitle="Plan ahead with our academic calendar for the current and upcoming school years."
      breadcrumbs={[
        { label: "PARENTS", href: "/parents" },
        { label: "TERM DATES", href: "/parents/term-dates" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="PARENTS"
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-black text-eddyrose-deep mb-8">
            Academic Calendar 2025/26
          </h2>

          <div className="space-y-10">
            <div>
              <h4 className="text-xl font-bold text-eddyrose-deep border-b border-zinc-100 pb-2 mb-4">
                First Term (Autumn)
              </h4>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="font-bold">Term Starts</span>
                  <span className="text-zinc-500">
                    Monday, 15th September 2025
                  </span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="font-bold">Mid-Term Break</span>
                  <span className="text-zinc-500">
                    23rd - 27th October 2025
                  </span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="font-bold">Term Ends</span>
                  <span className="text-zinc-500">
                    Friday, 15th December 2025
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-eddyrose-deep border-b border-zinc-100 pb-2 mb-4">
                Second Term (Spring)
              </h4>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="font-bold">Term Starts</span>
                  <span className="text-zinc-500">
                    Monday, 8th January 2026
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
