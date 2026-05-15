"use client";

import PageLayout from "@/components/public/PageLayout";
import Image from "next/image";

const SIDEBAR_LINKS = [
  { label: "Latest News", href: "/parents" },
  { label: "Term Dates", href: "/parents/term-dates" },
  { label: "School Timings", href: "/parents/timings" },
  { label: "Uniform", href: "/parents/uniform" },
  { label: "Canteen", href: "/parents/canteen" },
];

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Upcoming Inter-House Sports Competition",
    date: "OCTOBER 21, 2026",
    description:
      "Get ready for a day of teamwork, athletics, and school spirit! All houses are invited to participate in our annual sports day.",
    image: "/inter.jpg",
  },
  {
    id: 2,
    title: "Mid-Term Break Notice",
    date: "OCTOBER 23, 2026",
    description:
      "Please take note of the upcoming mid-term break dates and ensure all school projects are submitted on time.",
    image: "/s2.jpg",
  },
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
            {ANNOUNCEMENTS.map((announcement) => (
              <div key={announcement.id} className="group cursor-pointer">
                <div className="aspect-video bg-zinc-100 rounded-[1rem] overflow-hidden mb-6 relative border border-zinc-100">
                  <Image
                    src={announcement.image}
                    alt={announcement.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-eddyrose-gold text-eddyrose-deep text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10">
                    ANNOUNCEMENT
                  </div>
                </div>
                <p className="text-zinc-400 text-xs font-bold mb-2">
                  {announcement.date}
                </p>
                <h3 className="text-2xl font-black text-eddyrose-deep group-hover:text-eddyrose-gold transition-colors mb-3">
                  {announcement.title}
                </h3>
                <p className="text-zinc-500 line-clamp-2">
                  {announcement.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
