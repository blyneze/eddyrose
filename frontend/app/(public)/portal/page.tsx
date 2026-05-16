import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');

        @keyframes float-a {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(-4deg); }
        }
        @keyframes float-c {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-13px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .nursery-float-a { animation: float-a 4s ease-in-out infinite; }
        .nursery-float-b { animation: float-b 5.5s ease-in-out infinite; }
        .nursery-float-c { animation: float-c 6s ease-in-out infinite 0.8s; }
        .nursery-spin    { animation: spin-slow 22s linear infinite; }
        .nursery-pulse   { animation: pulse-soft 3s ease-in-out infinite; }
      `}</style>

      <section className="min-h-[85vh] flex flex-col md:flex-row bg-[#f8f9fa]">
        {/* ── Left: Nursery Info Panel ─────────────────────────────────── */}
        <div
          className="flex-1 p-8 md:px-14 md:pb-10 flex flex-col justify-between relative overflow-hidden"
          style={{
            background:
              "linear-gradient(150deg, #fffbeb 0%, #e0f2fe 55%, #ede9fe 100%)",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {/* ── Decorative layer ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Cloud — top left */}
            <div className="absolute top-10 left-2 nursery-float-b opacity-70">
              <svg width="90" height="46" viewBox="0 0 90 46">
                <ellipse cx="45" cy="34" rx="43" ry="15" fill="white" />
                <ellipse cx="27" cy="28" rx="21" ry="18" fill="white" />
                <ellipse cx="60" cy="25" rx="23" ry="20" fill="white" />
              </svg>
            </div>

            {/* Cloud — lower right */}
            <div className="absolute bottom-28 -right-6 nursery-float-a opacity-50">
              <svg width="110" height="56" viewBox="0 0 110 56">
                <ellipse cx="55" cy="42" rx="52" ry="17" fill="white" />
                <ellipse cx="33" cy="34" rx="26" ry="22" fill="white" />
                <ellipse cx="74" cy="30" rx="28" ry="24" fill="white" />
              </svg>
            </div>

            {/* Rainbow arc — bottom left */}
            <div className="absolute -bottom-6 -left-4 opacity-30">
              <svg width="220" height="130" viewBox="0 0 220 130">
                {[
                  { color: "#F87171", w: 12, inset: 8 },
                  { color: "#FB923C", w: 10, inset: 20 },
                  { color: "#FCD34D", w: 10, inset: 31 },
                  { color: "#4ADE80", w: 9, inset: 41 },
                  { color: "#60A5FA", w: 9, inset: 50 },
                  { color: "#A78BFA", w: 8, inset: 58 },
                ].map(({ color, w, inset }, i) => (
                  <path
                    key={i}
                    d={`M${inset},130 Q110,${-20 + i * 14} ${220 - inset},130`}
                    stroke={color}
                    strokeWidth={w}
                    fill="none"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>

            {/* Floating stars */}
            <svg
              className="absolute top-36 right-14 nursery-float-c"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <polygon
                points="11,1 13.5,8 21,8 15,13 17.5,20 11,16 4.5,20 7,13 1,8 8.5,8"
                fill="#FBBF24"
              />
            </svg>
            <svg
              className="absolute top-56 left-16 nursery-float-b"
              width="16"
              height="16"
              viewBox="0 0 22 22"
            >
              <polygon
                points="11,1 13.5,8 21,8 15,13 17.5,20 11,16 4.5,20 7,13 1,8 8.5,8"
                fill="#F9A8D4"
              />
            </svg>
            <svg
              className="absolute bottom-40 right-20 nursery-float-a"
              width="18"
              height="18"
              viewBox="0 0 22 22"
            >
              <polygon
                points="11,1 13.5,8 21,8 15,13 17.5,20 11,16 4.5,20 7,13 1,8 8.5,8"
                fill="#86EFAC"
              />
            </svg>

            {/* Coloured dots */}
            <div className="absolute top-2/3 left-1/3 w-5 h-5 rounded-full bg-pink-300 nursery-pulse" />
            <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-sky-300 nursery-float-b opacity-60" />
            <div
              className="absolute bottom-44 left-8  w-4 h-4 rounded-full bg-yellow-300 nursery-pulse"
              style={{ animationDelay: "1.2s" }}
            />
          </div>

          {/* ── Main content ── */}
          <div className="relative z-10 max-w-lg mt-8 md:mt-4">
            {/* Badge row */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{
                  background: "#DCFCE7",
                  color: "#166534",
                  borderColor: "#BBF7D0",
                }}
              >
                ✨ Secure & Child-Safe
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3 text-slate-800">
              Hello, <span style={{ color: "#EAB308" }}>Little Stars!</span>
              <br />
              <span className="text-2xl md:text-3xl font-bold text-slate-600">
                Welcome to your portal 🌈
              </span>
            </h1>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
              Parents can safely check their child's academic progress, term
              results, and school records — all in one friendly, easy-to-use
              place.
            </p>

            {/* Feature cards */}
            <div className="space-y-4">
              <div
                className="flex items-start gap-4 rounded-2xl p-4 border"
                style={{
                  background: "#FFFBEB",
                  borderColor: "#FDE68A",
                }}
              >
                <span className="text-2xl mt-0.5">🔒</span>
                <div>
                  <h4 className="font-bold text-slate-800 mb-0.5">
                    Safe &amp; Secure
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Your child's records are protected with top-level security —
                    only authorised parents can access them.
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 rounded-2xl p-4 border"
                style={{
                  background: "#EFF6FF",
                  borderColor: "#BFDBFE",
                }}
              >
                <span className="text-2xl mt-0.5">👨‍👩‍👧</span>
                <div>
                  <h4 className="font-bold text-slate-800 mb-0.5">
                    For Parents &amp; Students
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Easy dashboards showing progress reports, assessments, and
                    term results at a glance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="relative z-10 mt-10 md:mt-6 pt-6 border-t border-slate-200 flex items-center justify-between">
            <p className="text-slate-400 text-sm">Need Help? 💬</p>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-bold transition-colors"
              style={{ color: "#2563EB" }}
            >
              Contact Admin Support <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* ── Right: Login Card (unchanged) ─────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative">
          <PortalLoginForm />
        </div>
      </section>
    </>
  );
}
