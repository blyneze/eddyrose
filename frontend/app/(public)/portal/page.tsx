import { Metadata } from "next";
import {
  Lock,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import PortalLoginForm from "@/components/portal/PortalLoginForm";

export const metadata: Metadata = {
  title: "Result Portal | Eddyrose International Academy",
  description:
    "Access your Eddyrose International Academy results and student records securely through our student portal.",
};

export default function PortalLandingPage() {
  return (
    <>
      <section className="min-h-[85vh] flex flex-col md:flex-row bg-[#f8f9fa]">
        {/* Left: Info Side */}
        <div className="flex-1 text-white p-8 md:px-16 md:pb-10 mt:pt-16 flex flex-col justify-between relative overflow-hidden bg-eddyrose-deep">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 2px, transparent 2px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-4xl mt-8 md:mt-0">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/20 backdrop-blur-sm shadow-sm">
              <ShieldCheck className="text-eddyrose-gold" size={24} />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-3">
              Eddyrose International <br className="hidden md:block" /> Result
              Portal
            </h1>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              Welcome to the Eddyrose International Academy result portal. Our
              secure platform ensures that student progress, termly results, and
              continuous assessment records are accessible to parents anytime,
              anywhere.
            </p>

            {/* Trust features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/10 p-2 rounded-full">
                  <Lock size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">End-to-End Encryption</h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Your child's academic records are strictly confidential and
                    protected using industry-standard security.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/10 p-2 rounded-full">
                  <UserCircle size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Parent & Student Access</h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Dedicated dashboards for easy navigation of academic
                    progress reports.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-16 md:mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
            <p className="text-white/40 text-sm">Need Help?</p>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-medium hover:text-eddyrose-gold transition-colors"
            >
              Contact Admin Support <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right: Login Card Side */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative">
          <PortalLoginForm />
        </div>
      </section>
    </>
  );
}
