"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Latest News", href: "/parents" },
  { label: "Term Dates", href: "/parents/term-dates" },
  { label: "School Timings", href: "/parents/timings" },
  { label: "Uniform", href: "/parents/uniform" },
  { label: "Canteen", href: "/parents/canteen" },
];

export default function UniformPage() {
  return (
    <PageLayout
      title="School Uniform"
      subtitle="Wear your Eddyrose pride with our high-quality, distinctive school uniform."
      breadcrumbs={[{ label: "PARENTS", href: "/parents" }, { label: "UNIFORM", href: "/parents/uniform" }]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="PARENTS"
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-4xl font-black text-eddyrose-deep mb-8">Our Standards</h2>
          <p className="text-lg text-zinc-600 mb-8">
            The Eddyrose uniform is a symbol of our community and our commitment to excellence. All students are expected to wear the correct uniform at all times.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                <h4 className="font-bold text-eddyrose-deep mb-2">Uniform Shop</h4>
                <p className="text-sm text-zinc-500">Uniforms can be purchased directly from our on-campus shop during school hours.</p>
             </div>
             <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                <h4 className="font-bold text-eddyrose-deep mb-2">Dress Code</h4>
                <p className="text-sm text-zinc-500">Please refer to our handbook for the detailed dress code for each stage of the school.</p>
             </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
