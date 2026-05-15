"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission" },
  { label: "Our Director", href: "/about/director" },
  { label: "Safeguarding", href: "/about/safeguarding" },
  { label: "Careers", href: "/about/careers" },
];

export default function CareersPage() {
  return (
    <PageLayout
      title="Careers"
      subtitle="Join our team of passionate educators and dedicated professionals."
      breadcrumbs={[
        { label: "ABOUT", href: "/about" },
        { label: "CAREERS", href: "/about/careers" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ABOUT US"
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-4xl font-black text-eddyrose-deep mb-4">
            Work With Us
          </h2>
          <p className="text-sm md:text-lg text-zinc-600 mb-8">
            At Eddyrose, we are always looking for talented individuals who
            share our passion for excellence in education. We offer a supportive
            and dynamic work environment where you can grow and make a real
            difference.
          </p>
          <div className="bg-zinc-50 text-sm md:text-base p-5 rounded-[1rem] border border-zinc-100 italic text-zinc-500">
            There are currently no open positions. Please check back later or
            send your CV to our HR department.
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
