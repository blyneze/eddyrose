"use client";

import PageLayout from "@/components/public/PageLayout";

export default function TermsOfUsePage() {
  return (
    <PageLayout
      title="Terms of Use"
      subtitle="Terms and conditions for using the Eddyrose International Academy website and services."
      breadcrumbs={[{ label: "TERMS OF USE", href: "/terms" }]}
      sidebarLinks={[]}
      sidebarTitle="LEGAL"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using the Eddyrose International Academy website, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            Use of Website
          </h2>
          <p>
            You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property of Eddyrose International Academy or its content suppliers and is protected by international copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            Limitation of Liability
          </h2>
          <p>
            Eddyrose International Academy will not be liable for any damages arising out of or in connection with the use of this website. This includes, without limitation, direct loss, loss of business or profits, and damage caused to your computer, computer software, systems, and programs.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
