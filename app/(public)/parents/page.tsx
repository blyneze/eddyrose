"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Latest News", href: "/parents" },
  { label: "Term Dates", href: "/parents/term-dates" },
  { label: "School Timings", href: "/parents/timings" },
  { label: "Uniform", href: "/parents/uniform" },
  { label: "Canteen", href: "/parents/canteen" },
];

export default function ParentsPage() {
  return (
    <PageLayout
      title="Latest News"
      subtitle="Stay updated with the latest happenings, events, and announcements from Eddyrose Academy."
      breadcrumbs={[{ label: "PARENTS", href: "/parents" }]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="PARENTS"
    >
      <div className="space-y-12">
        <section>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-zinc-100 rounded-[2rem] overflow-hidden mb-6 relative border border-zinc-100">
                  <div className="absolute top-6 left-6 bg-eddyrose-gold text-eddyrose-deep text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    ANNOUNCEMENT
                  </div>
                </div>
                <p className="text-zinc-400 text-xs font-bold mb-2">OCTOBER {20 + i}, 2023</p>
                <h3 className="text-2xl font-black text-eddyrose-deep group-hover:text-eddyrose-gold transition-colors mb-3">
                  {i === 1 ? "Upcoming Inter-House Sports Competition" : i === 2 ? "New STEAM Lab Inauguration" : "Mid-Term Break Notice"}
                </h3>
                <p className="text-zinc-500 line-clamp-2">
                  {i === 1 
                    ? "Get ready for a day of teamwork, athletics, and school spirit! All houses are invited to participate in our annual sports day."
                    : i === 2 
                    ? "We are excited to announce the opening of our state-of-the-art STEAM lab, providing new opportunities for innovation."
                    : "Please take note of the upcoming mid-term break dates and ensure all school projects are submitted on time."}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
