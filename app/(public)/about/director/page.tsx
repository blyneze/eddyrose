"use client";

import PageLayout from "@/components/public/PageLayout";
import Image from "next/image";

const SIDEBAR_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission" },
  { label: "Our Director", href: "/about/director" },
  { label: "Safeguarding", href: "/about/safeguarding" },
  { label: "Careers", href: "/about/careers" },
];

export default function TeamPage() {
  return (
    <PageLayout
      title="Director's Note"
      subtitle="Leadership with Vision and Care"
      breadcrumbs={[
        { label: "ABOUT", href: "/about" },
        { label: "DIRECTOR", href: "/about/director" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ABOUT US"
    >
      <div className="space-y-12">
        <section>
          <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl font-black text-eddyrose-deep">
            Director&apos;s Note
          </h2>

          <div className="group">
            <h3 className="text-xl text-eddyrose-gold font-black leading-tight italic font-serif mb-8">
              "Raising well-rounded, confident, and responsible individuals
              prepared to make a positive impact."
            </h3>

            <div className="mt-6 space-y-6 text-sm md:text-base leading-relaxed text-zinc-600">
              <p>
                It is my pleasure to welcome you to Eddyrose Academy, a place
                where every child is nurtured to grow, learn, and thrive in a
                supportive and inspiring environment.
              </p>

              <p>
                At Eddyrose, we are committed to providing a balanced education
                that combines strong academic foundations with creativity,
                critical thinking, and character development. We believe that
                education goes beyond the classroom, shaping not only what
                children know, but who they become.
              </p>

              <p>
                In a rapidly changing world, it is essential to prepare our
                children with the skills, confidence, and adaptability they need
                for the future. At Eddyrose Academy, we create a safe and
                engaging environment where students are encouraged to ask
                questions, explore ideas, and discover their unique potential.
              </p>

              <p>
                Our dedicated teachers work closely with each child, ensuring
                personalized attention and a learning experience that builds
                both competence and confidence. Alongside academic excellence,
                we place strong emphasis on values such as respect,
                responsibility, integrity, and compassion.
              </p>

              <p>
                We also recognize the vital role parents play in a child’s
                development. By fostering a strong partnership between home and
                school, we ensure that every child receives the support they
                need to succeed.
              </p>

              <p>
                At Eddyrose Academy, our goal is simple: to raise well-rounded,
                confident, and responsible individuals who are prepared to make
                a positive impact in their world.
              </p>

              <p>
                I warmly invite you to visit our school, meet our team, and
                experience the nurturing environment that makes Eddyrose truly
                special.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-zinc-100">
              <p className="font-black text-eddyrose-deep text-lg">
                Ediomi Emmanuel
              </p>
              <p className="text-sm font-bold text-eddyrose-gold tracking-widest uppercase">
                Director, Eddyrose International Academy
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
