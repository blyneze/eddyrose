"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Admissions Process", href: "/admissions" },
  { label: "Book a Tour", href: "/admissions/book-tour" },
  { label: "Apply Now", href: "/admissions/apply" },
];

export default function BookTourPage() {
  return (
    <PageLayout
      title="Book a Tour"
      subtitle="Experience the Eddyrose spirit firsthand. We'd love to show you around."
      breadcrumbs={[
        { label: "ADMISSIONS", href: "/admissions" },
        { label: "BOOK A TOUR", href: "/admissions/book-tour" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ADMISSIONS"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4 md:text-4xl">
            Visit Us
          </h2>
          <p className="text-sm md:text-base text-zinc-600 mb-4">
            The best way to understand the Eddyrose difference is to see it in
            action. During your tour, you will have the opportunity to see our
            classrooms, meet our teachers, and experience our vibrant school
            community.
          </p>
          <a
            href="https://wa.me/2347045762841?text=Hi%20Eddyrose%20Academy%2C%20I%20would%20like%20to%20book%20a%20tour"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-eddyrose-deep text-white font-black px-8 py-4 rounded-[1rem] hover:bg-eddyrose-gold mb-5 md:mb-0 transition-all shadow-xl"
          >
            SCHEDULE A VISIT NOW
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
