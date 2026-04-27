"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Our Director", href: "/about/director" },
  { label: "Safeguarding", href: "/about/safeguarding" },
  { label: "Careers", href: "/about/careers" },
];

export default function GovernancePage() {
  return (
    <PageLayout
      title="Governance"
      subtitle="Ensuring accountability, strategic leadership, and long-term excellence."
      breadcrumbs={[
        { label: "ABOUT", href: "/about" },
        { label: "GOVERNANCE", href: "/about/governance" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ABOUT US"
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-4xl font-black text-eddyrose-deep mb-8">
            Board of Governors
          </h2>
          <p className="text-lg text-zinc-600 mb-8">
            The Eddyrose International Academy Board of Governors provides
            strategic oversight and guidance to the school's leadership team.
            Comprised of professionals with expertise in education, business,
            and law, the board ensures that the school remains true to its
            mission.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
