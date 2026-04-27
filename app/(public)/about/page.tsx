"use client";

import PageLayout from "@/components/public/PageLayout";
import Image from "next/image";

const SIDEBAR_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission" },
  { label: "Meet Our Principal", href: "/about/team" },
  { label: "Campus & Facilities", href: "/about/facilities" },
  { label: "Safeguarding", href: "/about/safeguarding" },
  { label: "Careers", href: "/about/careers" },
];

export default function AboutPage() {
  return (
    <PageLayout
      title="Our Story"
      subtitle="A school built on the belief that every child deserves to be known, valued, and inspired."
      breadcrumbs={[{ label: "ABOUT", href: "/about" }]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ABOUT US"
    >
      <div className="space-y-12">
        <section id="story">
          <p className="text-sm md:text-xl font-medium text-eddyrose-light border-l-4 border-eddyrose-gold pl-4 md:pl-5 my-10 italic">
            Eddyrose International Academy was founded on a simple yet powerful
            belief: children thrive when they are truly known. Not as numbers or
            averages, but as individuals, each with a unique story, distinct
            strengths, and a potential waiting to be nurtured.
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            A School Like No Other
          </h2>
          <p>
            Nestled in the heart of Uyo, Akwa Ibom State, our campus is designed
            to offer something larger schools often cannot, a place where every
            child is truly known. With small class sizes and thoughtfully
            created spaces, we nurture curiosity, build confidence, and foster a
            strong sense of belonging.
          </p>
          <p className="pt-2">
            From the beginning, we set out to be intentional. Our approach is
            guided by what matters most: strong relationships, high
            expectations, and a learning environment where every child grows
            with confidence and purpose.
          </p>
        </section>

        <section id="leadership" className="pt-12 border-t border-zinc-100">
          <h2 className="text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            Leadership
          </h2>
          <p>
            Our leadership team is dedicated to maintaining the highest
            standards of education and care. Led by visionary educators with
            decades of international and national experience, we ensure that the
            Eddyrose mission is lived out in every classroom, every day.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-100">
              <h4 className="font-black text-eddyrose-deep text-xl mb-2">
                Academic Excellence
              </h4>
              <p className="text-sm">
                Our curriculum is overseen by experts in early childhood and
                primary education.
              </p>
            </div>
            <div className="bg-zinc-50 p-8 rounded-[1rem] border border-zinc-100">
              <h4 className="font-black text-eddyrose-deep text-xl mb-2">
                Character First
              </h4>
              <p className="text-sm">
                We believe that education without character is incomplete.
                Leadership is in our DNA.
              </p>
            </div>
          </div>
        </section>

        <section id="location" className="pt-12 border-t border-zinc-100">
          <h2 className="text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            Our Location
          </h2>
          <p>
            Located at No. 3 IBB Avenue, Uyo, Akwa Ibom State, Eddyrose
            International Academy offers a safe and serene environment where
            focused learning and discovery can thrive.
          </p>
          <div className="w-full mt-5 aspect-video bg-zinc-100 rounded-[1rem] border border-zinc-200 overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.4850361794993!2d7.9069933!3d5.0247892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d563057b02507%3A0x1a23f4944c7755e9!2s2WF4%2BWQG%2C%203%20IBB%20Ave%2C%20opposite%20Idongesit%20Nkanga%20Secretariat%2C%20Uyo%20520102%2C%20Akwa%20Ibom!5e0!3m2!1sen!2sng!4v1777196820526!5m2!1sen!2sng"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
        <section id="gallery" className="pt-12 border-t border-zinc-100">
          <h2 className="text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            Our Gallery
          </h2>

          <div className="grid grid-cols-2 gap-2 h-[800px] md:h-[800px]">
            {/* Main Featured Image */}
            <div className="col-span-2 row-span-2 relative rounded-[1rem] overflow-hidden group">
              <Image
                src="/building.png"
                alt="School life"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Top Right */}
            <div className="relative rounded-[1rem] overflow-hidden group">
              <Image
                src="/s1.jpg"
                alt="Learning"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Bottom Right of Top Row */}
            <div className="relative rounded-[1rem] overflow-hidden group">
              <Image
                src="/s2.jpg"
                alt="Activities"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Bottom Row - Left */}
            <div className="relative rounded-[1rem] overflow-hidden group col-span-1 md:col-span-1">
              <Image
                src="/s3.jpg"
                alt="Students"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Bottom Row - Right */}
            <div className="relative rounded-[1rem] overflow-hidden group col-span-1 md:col-span-1">
              <Image
                src="/s4.jpg"
                alt="Campus"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          </div>
        </section>

        <section id="fast-facts" className="py-12 border-t border-zinc-100">
          <h2 className="text-4xl font-black text-eddyrose-deep mb-8">
            Fast Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                value: "2015",
                title: "Year Founded",
                desc: "Providing excellence for nearly a decade.",
              },
              {
                value: "20",
                title: "Max Class Size",
                desc: "Ensuring every child is known and supported.",
              },
              {
                value: "100%",
                title: "Commitment",
                desc: "To the safety and growth of your child.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition hover:shadow-md"
              >
                {/* subtle accent line */}
                <div className="absolute left-0 top-0 h-full w-1 bg-eddyrose-gold opacity-70"></div>

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-black text-eddyrose-gold leading-none">
                      {item.value}
                    </p>
                    <p className="mt-1 font-semibold text-eddyrose-deep text-base">
                      {item.title}
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
