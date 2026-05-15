"use client";

import PageLayout from "@/components/public/PageLayout";
import { Phone, Mail, PhoneCall } from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Admissions Process", href: "/admissions" },
  { label: "Book a Tour", href: "/admissions/book-tour" },
  { label: "Apply Now", href: "/admissions/apply" },
];

export default function ApplyPage() {
  return (
    <PageLayout
      title="Apply Now"
      subtitle="Take the first step toward your child's extraordinary future."
      breadcrumbs={[
        { label: "ADMISSIONS", href: "/admissions" },
        { label: "APPLY NOW", href: "/admissions/apply" },
      ]}
      sidebarLinks={SIDEBAR_LINKS}
      sidebarTitle="ADMISSIONS"
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-4 md:mb-6">
            Start Your Application
          </h2>
          <p className="text-base md:text-lg text-zinc-600 mb-8">
            To begin your application process, please reach out to our
            admissions team. You can contact us via WhatsApp, call our
            admissions line directly, or send us an email.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            <a
              href="https://wa.me/2347045762841?text=Hi%20Eddyrose%20Academy%2C%20I%20would%20like%20to%20start%20an%20application"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-[1rem] border border-zinc-100 flex flex-row items-start sm:items-center gap-2 hover:border-eddyrose-gold hover:shadow-xl transition-all shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-eddyrose-deep/5 text-eddyrose-deep flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-eddyrose-deep">
                  WhatsApp
                </h4>
                <p className="text-zinc-500 text-sm">
                  Message our admissions team directly
                </p>
              </div>
            </a>

            <a
              href="tel:+2347045762841"
              className="bg-white p-4 rounded-[1rem] border border-zinc-100 flex flex-row items-start sm:items-center gap-2 hover:border-eddyrose-gold hover:shadow-xl transition-all shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-eddyrose-deep/5 text-eddyrose-deep flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-eddyrose-deep">
                  Call Us
                </h4>
                <p className="text-zinc-500 text-sm">+234 704 576 2841</p>
              </div>
            </a>

            <a
              href="mailto:eddyroseintlacademy@gmail.com"
              className="bg-white p-4 rounded-[1rem] border border-zinc-100 flex flex-row items-start sm:items-center gap-2 hover:border-eddyrose-gold hover:shadow-xl transition-all shadow-sm md:col-span-2"
            >
              <div className="w-10 h-10 rounded-full bg-eddyrose-deep/5 text-eddyrose-deep flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-eddyrose-deep">
                  Email
                </h4>
                <p className="text-zinc-500 text-sm break-all">
                  eddyroseintlacademy@gmail.com
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
