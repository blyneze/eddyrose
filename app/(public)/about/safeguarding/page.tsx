"use client";

import PageLayout from "@/components/public/PageLayout";
import { Heart } from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission" },
  { label: "Our Director", href: "/about/director" },
  { label: "Safeguarding", href: "/about/safeguarding" },
  { label: "Careers", href: "/about/careers" },
];

const FAQS = [
  {
    q: "What is the difference between safeguarding and child protection?",
    a: "Safeguarding is the proactive preventative measures we take to keep children safe, while child protection is the specific process of protecting children who are suffering or likely to suffer significant harm.",
  },
  {
    q: "What should I do if I have a safeguarding concern?",
    a: "Please contact our Designated Safeguarding Lead (DSL) immediately. You can find their contact details in the box below.",
  },
  {
    q: "How does the school ensure safe recruitment?",
    a: "We follow international best practices for safer recruitment, including identity checks, reference verification, and criminal record disclosures for all staff and regular volunteers.",
  },
];

export default function SafeguardingPage() {
  return (
    <PageLayout
      title="Safeguarding"
      subtitle="The safety and wellbeing of our students is our absolute priority."
      breadcrumbs={[
        { label: "ABOUT", href: "/about" },
        { label: "SAFEGUARDING", href: "/about/safeguarding" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ABOUT US"
    >
      <div className="space-y-10">
        <section>
          <div className="border-l-4 border-eddyrose-gold pl-6 py-2 mb-10">
            <p className="text-lg md:text-xl font-medium text-zinc-600 leading-relaxed">
              Safeguarding is the highest priority at Eddyrose Academy. Every
              decision, system and policy is designed to ensure that children
              feel safe, secure and supported at all times.
            </p>
            <p className="mt-6 text-zinc-500">
              We operate a whole-school safeguarding culture where every adult
              understands their responsibility to protect and promote the
              welfare of children.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-6">
            Leadership & Accountability
          </h2>
          <div className="space-y-6 text-zinc-600">
            <p>
              Safeguarding at Eddyrose Academy is led by our Designated
              Safeguarding Lead (DSL), ensuring clear oversight and
              accountability at the highest level of the school.
            </p>
            <div className="grid gap-4">
              <div className="p-5 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="font-black text-eddyrose-deep">Ediomo Emmanuel</p>
                <p className="text-xs font-bold text-eddyrose-gold uppercase tracking-widest mt-1">
                  Director & Designated Safeguarding Lead (DSL)
                </p>
              </div>
            </div>
            <p className="text-sm">
              All members of the safeguarding team are appropriately trained and
              work in line with Nigerian educational regulations and
              international safeguarding best practices.
            </p>
          </div>
        </section>

        <section className="grid gap-5 pt-12 border-t border-zinc-100">
          <div>
            <h3 className="text-2xl font-black text-eddyrose-deep mb-4">
              Staff Training & Recruitment
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              All staff at Eddyrose Academy receive specialist training and
              refresher sessions to ensure they remain vigilant and informed.
              Our recruitment process includes rigorous background checks to
              ensure the safety of our students.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black text-eddyrose-deep mb-4">
              Reporting & Response
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              We maintain clear reporting systems to ensure concerns are
              addressed promptly. We work in partnership with parents and
              external agencies to ensure children receive the support they
              need.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black text-eddyrose-deep mb-4">
              Online Safety
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Online safety is embedded throughout our curriculum. Children are
              taught to navigate the digital world responsibly, supported by
              robust filtering and monitoring systems.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black text-eddyrose-deep mb-4">
              Anti-Bullying
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              We promote a culture of respect and kindness. Any concerns
              relating to peer behaviour are addressed swiftly and consistently
              in line with our school behaviour policy.
            </p>
          </div>
        </section>

        <section className="pt-12 border-t border-zinc-100">
          <h2 className="text-3xl font-black text-eddyrose-deep mb-6">
            Parent Partnership
          </h2>
          <p className="text-zinc-600">
            Safeguarding is most effective when school and home work together.
            We encourage parents to communicate concerns openly and to engage
            with school guidance regarding wellbeing and child protection.
          </p>
        </section>

        <section className="pt-12 border-t border-zinc-100">
          <h2 className="text-3xl font-black text-eddyrose-deep mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group border-b border-zinc-100 pb-4">
                <summary className="flex justify-between items-center font-semibold text-eddyrose-deep cursor-pointer list-none py-2">
                  <span className="text-base">{faq.q}</span>
                  <span className="text-eddyrose-gold group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-eddyrose-deep rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Heart size={150} fill="white" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4">
              If You Have a Safeguarding Concern
            </h3>
            <p className="text-white/70 text-sm mb-8 max-w-2xl leading-relaxed">
              If you have any safeguarding concern, however small it may seem,
              please contact our Designated Safeguarding Lead directly. All
              concerns are treated seriously, sensitively, and in line with our
              safeguarding procedures.
            </p>
            <a
              href="mailto:eddyroseintlacademy@gmail.com"
              className="inline-flex items-center gap-3 text-eddyrose-gold font-black hover:text-white transition-colors text-sm"
            >
              eddyroseintlacademy@gmail.com
              <span className="text-2xl">→</span>
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
