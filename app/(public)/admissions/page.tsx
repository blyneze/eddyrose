import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, UserPlus, Calendar, FileText, CheckSquare, GraduationCap, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions | Eddyrose International Academy",
  description: "Join Eddyrose International Academy in Uyo. Learn about our admissions process, requirements, and how to enroll your child today.",
};

export default function AdmissionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-16 md:pt-24 pb-20 md:pb-32 bg-eddyrose-deep overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-eddyrose-gold animate-pulse" />
            <span className="text-xs font-bold text-white tracking-widest uppercase">
              Admissions Open 2025/2026
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Join Our Vibrant School Community
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            We are excited to partner with you in laying a rock-solid foundation for your child. Discover our enrollment process for Crèche, Nursery, and Primary levels.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-eddyrose-gold text-eddyrose-deep font-extrabold px-8 py-4 shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl active:scale-95"
            >
              Enquire Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Classes Open For Admission */}
      <section className="py-20 md:py-28 bg-white" id="classes">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Classes Open for Admission
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We welcome applications across our foundational learning stages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 hover:shadow-lg transition-shadow">
               <h3 className="text-2xl font-bold text-eddyrose-deep mb-2">Crèche</h3>
               <p className="text-zinc-500 mb-6">Ages 3 months - 1.5 Years</p>
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-zinc-600">
                   <CheckCircle2 size={16} className="text-eddyrose-gold" /> Safe, loving care
                 </li>
                 <li className="flex items-center gap-2 text-zinc-600">
                   <CheckCircle2 size={16} className="text-eddyrose-gold" /> Sensory development
                 </li>
               </ul>
             </div>
             <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 hover:shadow-lg transition-shadow">
               <h3 className="text-2xl font-bold text-eddyrose-deep mb-2">Nursery</h3>
               <p className="text-zinc-500 mb-6">Ages 2 - 5 Years</p>
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-zinc-600">
                   <CheckCircle2 size={16} className="text-eddyrose-gold" /> Phonics tracking
                 </li>
                 <li className="flex items-center gap-2 text-zinc-600">
                   <CheckCircle2 size={16} className="text-eddyrose-gold" /> Play-based learning
                 </li>
               </ul>
             </div>
             <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 hover:shadow-lg transition-shadow">
               <h3 className="text-2xl font-bold text-eddyrose-deep mb-2">Primary</h3>
               <p className="text-zinc-500 mb-6">Ages 5 - 11 Years</p>
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-zinc-600">
                   <CheckCircle2 size={16} className="text-eddyrose-gold" /> British & Nigerian Curriculum
                 </li>
                 <li className="flex items-center gap-2 text-zinc-600">
                   <CheckCircle2 size={16} className="text-eddyrose-gold" /> Core Subjects & ICT
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Step-by-step Admissions Process */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Your Enrollment Journey
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Our 5-step process makes joining Eddyrose Academy as simple and transparent as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 relative">
             {/* Decorative connective line for desktop */}
             <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-zinc-200 z-0"/>

             {[
               { icon: UserPlus, title: "1. Enquiry", desc: "Contact us or fill out our online enquiry form." },
               { icon: MapPin, title: "2. School Visit", desc: "Tour the facilities and meet our friendly staff." },
               { icon: FileText, title: "3. Application", desc: "Submit the formal application form." },
               { icon: CheckSquare, title: "4. Assessment", desc: "A brief, friendly placement check for your child." },
               { icon: GraduationCap, title: "5. Enrollment", desc: "Secure your spot and prepare for the first day!" }
             ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none shadow-sm md:shadow-none border border-zinc-100 md:border-none mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-eddyrose-gold flex items-center justify-center text-eddyrose-deep shadow-md mb-6">
                    <step.icon size={24} />
                  </div>
                  <h4 className="font-bold text-zinc-900 mb-2">{step.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* What parents may need */}
      <section className="py-20 bg-white" id="requirements">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-eddyrose-deep/5 border border-eddyrose-deep/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-eddyrose-deep mb-6">
              Application Requirements
            </h2>
            <p className="text-zinc-600 mb-8 leading-relaxed">
              To proceed with formal admission, parents will need to provide the following documentation upon request:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Completed Admission Form",
                "Copy of Child's Birth Certificate",
                "Two Recent Passport Photographs",
                "Immunization Record / Medical Report",
                "Last School Report (If applicable)",
                "Transfer Certificate (Primary transfers)"
              ].map((req, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-zinc-100">
                  <div className="mt-0.5">
                    <CheckCircle2 size={18} className="text-eddyrose-light" />
                  </div>
                  <span className="text-zinc-700 text-sm font-medium">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs & Financials */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-100" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {/* Hardcoded a few plausible realistic FAQs */}
            {[
              {
                q: "What is the admission age for Crèche?",
                a: "We accept infants starting from 3 months old into our safely monitored Crèche facility."
              },
              {
                id: "fees",
                q: "How can I pay school fees?",
                a: "Fees can be paid through designated bank transfers. The account details will be provided along with your admission offer letter. We maintain a flexible payment structure to accommodate our families."
              },
              {
                id: "scholarships",
                q: "Are there scholarship opportunities?",
                a: "Eddyrose Academy occasionally offers merit-based scholarships for exceptionally performing students in our primary section. Please enquire with the administration for more details."
              },
              {
                q: "Do you offer school bus services?",
                a: "Please contact our administrative office to discuss transportation routes and availability for the upcoming term."
              }
            ].map((faq, i) => (
              <div key={i} id={faq.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <h4 className="text-lg font-bold text-zinc-900 mb-2">{faq.q}</h4>
                <p className="text-zinc-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
