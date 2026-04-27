"use client";

import PageLayout from "@/components/public/PageLayout";

export default function PrivacyPolicyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="How Eddyrose International Academy collects, uses, and protects your information."
      breadcrumbs={[{ label: "PRIVACY POLICY", href: "/privacy" }]}
      sidebarLinks={[]}
      sidebarTitle="LEGAL"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            Introduction
          </h2>
          <p>
            At Eddyrose International Academy, we are committed to protecting the privacy and security of our students, parents, staff, and website visitors. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as names, contact details, dates of birth, educational records, and medical information when you apply for admission, enroll your child, or interact with our school.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            How We Use Your Information
          </h2>
          <p>
            Your information is used to provide educational services, communicate with you regarding your child's progress and school events, process admissions, and ensure the safety and well-being of all students.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-eddyrose-deep mb-4">
            Data Protection
          </h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration. We do not sell your personal information to third parties.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
