import { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Access | Eddyrose Academy",
  description: "Secure administrative login for Eddyrose International Academy.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-eddyrose-deep text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-black">EA</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Administrator Login</h1>
          <p className="text-sm text-zinc-500 mt-2">Restricted area. Please provide your secure admin credentials.</p>
        </div>
        
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-zinc-100">
          <AdminLoginForm />
        </div>
        
        <p className="text-center text-xs text-zinc-400 mt-8 font-medium uppercase tracking-widest">
          Eddyrose Academy &bull; Secure Infrastructure
        </p>
      </div>
    </div>
  );
}
