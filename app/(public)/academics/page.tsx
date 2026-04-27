"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Our Curriculum", href: "/academics" },
  { label: "Campus & Facilities", href: "/academics#facilities" },
  { label: "Extracurriculars", href: "/academics#extra" },
];

export default function AcademicsPage() {
  return (
    <PageLayout
      title="Academics"
      subtitle="A balanced, global curriculum that prepares students for excellence in a changing world."
      breadcrumbs={[{ label: "ACADEMICS", href: "/academics" }]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ACADEMICS"
    >
      <div className="space-y-12">
        <section id="curriculum">
          <p className="text-sm md:text-xl font-medium text-eddyrose-light border-l-4 border-eddyrose-gold pl-4 md:pl-5 my-10 italic">
            At Eddyrose, we believe that education should be as broad as it is
            deep. Our academic programme is designed to challenge students while
            providing the support they need to thrive.
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            A Hybrid Framework
          </h2>
          <p>
            We blend the analytical depth of the British National Curriculum
            with the rich, contextual relevance of the Nigerian National
            Curriculum. This dual approach ensures our students are globally
            competitive while remaining deeply rooted in their national
            identity.
          </p>
          <p>
            Our focus in the early years is on Phonics, Numeracy, and social
            development, transitioning into a more rigorous academic core in the
            primary years.
          </p>
        </section>

        <section id="facilities" className="pt-12 border-t border-zinc-100">
          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            Campus & Facilities
          </h2>
          <p>
            Our facilities are designed to inspire learning. From modern
            classrooms equipped with smart technology to specialized labs for
            STEAM and creative arts, we provide a stimulating environment for
            discovery.
          </p>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-zinc-50 aspect-video rounded-2xl border border-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400">
              SCIENCE LAB
            </div>
            <div className="bg-zinc-50 aspect-video rounded-2xl border border-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400">
              ICT SUITE
            </div>
            <div className="bg-zinc-50 aspect-video rounded-2xl border border-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400">
              ART STUDIO
            </div>
          </div> */}
        </section>

        <section id="extra" className="pt-12 border-t border-zinc-100">
          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            Beyond the Classroom
          </h2>
          <p>
            Learning doesn't stop when the bell rings. Our extracurricular
            programme includes sports, coding, mental maths, mega maths,
            scrabble, chess and various interest-based clubs that allow students
            to explore their passions.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
