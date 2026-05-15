"use client";

import PageLayout from "@/components/public/PageLayout";

const SIDEBAR_LINKS = [
  { label: "Admissions Process", href: "/admissions" },
  { label: "Book a Tour", href: "/admissions/book-tour" },
  { label: "Apply Now", href: "/admissions/apply" },
];

export default function AdmissionsPage() {
  return (
    <PageLayout
      title="Admissions Process"
      subtitle="Eddyrose International Academy welcomes applications from families seeking an exceptional educational foundation in Uyo."
      breadcrumbs={[{ label: "ADMISSIONS", href: "/admissions" }]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ADMISSIONS"
    >
      <div className="space-y-12">
        <section id="process">
          <p className="text-sm md:text-xl font-medium text-eddyrose-light border-l-4 border-eddyrose-gold pl-4 md:pl-5 my-10 italic">
            Our straightforward 5-step admissions process is designed to make
            joining our school community as smooth and welcoming as possible.
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            How Do I Apply to Eddyrose Academy?
          </h2>
          <p className="mb-12">
            Applying to Eddyrose is a simple, guided process. Whether you are
            local to Uyo or relocating, our admissions team will support you at
            every stage. Here is what to expect:
          </p>

          <div className="space-y-10">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-eddyrose-gold flex items-center justify-center font-bold text-eddyrose-gold shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-eddyrose-deep mb-1 flex flex-col items-start gap-1">
                  Submit Your Application
                  <span className="text-zinc-400 font-normal text-sm md:text-base">
                    Visit us in person to pick up the admissions form.
                  </span>
                </h4>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-eddyrose-gold flex items-center justify-center font-bold text-eddyrose-gold shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-eddyrose-deep mb-1 flex flex-col items-start gap-1">
                  Provide Documentation
                  <span className="text-zinc-400 font-normal text-sm md:text-base">
                    Ensure you have copies of your child’s birth certificate and
                    last school report ready.
                  </span>
                </h4>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-eddyrose-gold flex items-center justify-center font-bold text-eddyrose-gold shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-eddyrose-deep mb-1 flex flex-col items-start gap-1">
                  Pay the Application Fee
                  <span className="text-zinc-400 font-normal text-sm md:text-base">
                    A non-refundable fee covers administrative and assessment
                    costs.
                  </span>
                </h4>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-eddyrose-gold flex items-center justify-center font-bold text-eddyrose-gold shrink-0">
                4
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-eddyrose-deep mb-1 flex flex-col items-start gap-1">
                  Schedule an Assessment
                  <span className="text-zinc-400 font-normal text-sm md:text-base">
                    We&apos;ll invite your child for an age-appropriate
                    interaction.
                  </span>
                </h4>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-eddyrose-gold flex items-center justify-center font-bold text-eddyrose-gold shrink-0">
                5
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-eddyrose-deep mb-1 flex flex-col items-start gap-1">
                  Offer & Enrollment
                  <span className="text-zinc-400 font-normal text-sm md:text-base">
                    Upon successful assessment, an official offer will be made.
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
