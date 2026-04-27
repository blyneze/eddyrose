"use client";

import PageLayout from "@/components/public/PageLayout";
import { CheckCircle2, Target, Eye, Heart } from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission" },
  { label: "Our Director", href: "/about/director" },
  { label: "Campus & Facilities", href: "/about/facilities" },
  { label: "Safeguarding", href: "/about/safeguarding" },
  { label: "Careers", href: "/about/careers" },
];

export default function MissionPage() {
  return (
    <PageLayout
      title="Mission & Vision"
      subtitle="The core values and purpose that guide every decision at Eddyrose Academy."
      breadcrumbs={[
        { label: "ABOUT", href: "/about" },
        { label: "MISSION & VISION", href: "/about/mission" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ABOUT US"
    >
      <div className="space-y-16">
        {/* Intro */}
        <section>
          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-6">
            Information About the School
          </h2>
          <div className="prose prose-zinc prose-lg max-w-none text-zinc-600">
            <p>
              Eddyrose Academy is a private, co-educational nursery and primary
              school located in Uyo, Akwa Ibom State, Nigeria. The school was
              established with the aim of providing high-quality education in a
              disciplined, safe, and modern learning environment.
            </p>
            <p>
              We are committed to nurturing young minds and developing
              well-rounded pupils who excel academically and morally. As a day
              school, it offers a structured daily learning program that
              supports both academic and personal growth.
            </p>
          </div>
        </section>

        {/* Vision & Mission Grid */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="bg-zinc-50 p-6 rounded-[1rem] border border-zinc-100 relative overflow-hidden group">
            <p className="text-eddyrose-gold font-bold text-xs tracking-widest uppercase mb-1">
              Our Direction
            </p>
            <h3 className="text-3xl font-black text-eddyrose-deep mb-2">
              Our Vision
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed font-medium">
              To raise well-rounded, confident, and responsible individuals who
              are prepared to make a positive impact in their world through
              excellence in education and character.
            </p>
          </div>

          <div className="bg-eddyrose-deep p-6 rounded-[1rem] text-white relative overflow-hidden group">
            <p className="text-eddyrose-gold font-bold text-xs tracking-widest uppercase mb-1">
              Our Purpose
            </p>
            <h3 className="text-3xl font-black mb-2">Our Mission</h3>
            <p className="text-white/80 text-sm leading-relaxed font-medium">
              To provide high-quality education in a disciplined, safe, and
              modern environment, nurturing young minds to excel academically
              and morally while building strong leadership foundations.
            </p>
          </div>
        </section>

        {/* Qualities / Why Eddyrose */}
        <section className="pt-12 border-t border-zinc-100">
          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-5">
            What Defines Us
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "A child-friendly environment that promotes comfort, safety, and effective learning",
              "Strong academic performance, with pupils consistently achieving excellent results",
              "A well-structured curriculum that meets national educational standards",
              "A strong emphasis on character development and leadership skills",
              "A foundation built on strong Christian values and moral teachings",
            ].map((quality, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-eddyrose-gold/20 flex items-center justify-center text-eddyrose-gold">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  {quality}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="pt-12 border-t border-zinc-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-4">
              Our Core Values
            </h2>
            <p className="text-zinc-500">
              These values guide our behavior and decisions every day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
            {[
              "Respect",
              "Responsibility",
              "Integrity",
              "Compassion",
              "Excellence",
            ].map((quality, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-eddyrose-gold/20 flex items-center justify-center text-eddyrose-gold">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  {quality}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Focus */}
        <section className="bg-zinc-900 -mt-8 rounded-[1rem] p-5 text-center text-white">
          <h3 className="text-2xl font-black mb-4">A Focus on the Future</h3>
          <p className="text-white/60 text-sm max-w-3xl mx-auto leading-relaxed">
            "At Eddyrose Academy, the focus is not only on academic excellence
            but also on raising responsible, confident, and morally upright
            individuals prepared for future challenges."
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
