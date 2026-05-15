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
      <section className="min-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        {/* Left: Premium Info Side */}
        <div className="relative flex-1 bg-[#0a2342] text-white overflow-hidden flex flex-col justify-center px-8 md:px-20 py-16">
          {/* Animated Background Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-eddyrose-deep/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-eddyrose-gold/10 rounded-full blur-[100px]" />
          
          <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} 
          />

          <div className="relative z-10 space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-eddyrose-gold">
                <ShieldCheck size={14} />
                Secure Student Environment
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
                Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-eddyrose-gold via-yellow-200 to-white">Transparency</span> <br /> 
                at your fingertips.
              </h1>
              
              <p className="text-white/60 text-lg max-w-lg leading-relaxed font-light">
                The Eddyrose Portal is a sophisticated ecosystem designed to bridge the gap between classroom excellence and parental engagement.
              </p>
            </div>

            {/* Feature Cards with Glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-eddyrose-deep to-blue-900 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Lock size={18} className="text-eddyrose-gold" />
                </div>
                <h4 className="text-lg font-bold mb-2">Military-Grade Security</h4>
                <p className="text-sm text-white/40 leading-relaxed">
                  Your child's records are encrypted with the same standards used by global financial institutions.
                </p>
              </div>

              <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-eddyrose-deep to-blue-900 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <UserCircle size={18} className="text-eddyrose-gold" />
                </div>
                <h4 className="text-lg font-bold mb-2">Live Insights</h4>
                <p className="text-sm text-white/40 leading-relaxed">
                  Track performance trends, attendance, and behavioral progress in real-time from any device.
                </p>
              </div>
            </div>

            <div className="pt-8 flex items-center gap-8 border-t border-white/5">
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Digital Delivery</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Parental Access</div>
              </div>
              <div className="ml-auto">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 text-xs font-bold py-3 px-6 rounded-full bg-white text-eddyrose-deep hover:bg-eddyrose-gold transition-all duration-300 shadow-xl shadow-black/20"
                >
                  Support <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Elegant Login Card Side */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-20 relative bg-[#f8fafc]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
          <div className="relative z-10 w-full max-w-md">
            <PortalLoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
