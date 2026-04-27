"use client";

import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

// ── Social icons (inline SVG — no extra dep) ──────────────────────────
const SOCIAL = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Tiktok",
    href: "https://tiktok.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
      </svg>
    ),
  },
];

const NAV_COLS = [
  {
    heading: "School",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/about#mission" },
      { label: "Leadership", href: "/about#team" },
      { label: "Gallery", href: "/gallery" },
      { label: "News & Events", href: "/news" },
    ],
  },
  {
    heading: "Academics",
    links: [
      { label: "Programmes", href: "/academics" },
      { label: "Curriculum", href: "/academics#curriculum" },
      { label: "Extracurriculars", href: "/academics#extra" },
      { label: "Results", href: "/academics#results" },
      { label: "Library", href: "/academics#library" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "How to Apply", href: "/admissions" },
      { label: "Requirements", href: "/admissions#requirements" },
      { label: "School Fees", href: "/admissions#fees" },
      { label: "Scholarships", href: "/admissions#scholarships" },
      { label: "FAQs", href: "/admissions#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0B2545 0%, #081a31 100%)",
      }}
    >
      {/* ── Subtle dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16">
        {/* ── Main grid ── */}
        <div className="pt-14 md:pt-18 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1fr] gap-10 lg:gap-8 xl:gap-12">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            {/* Logo lockup */}
            <Link href="/" className="inline-flex items-center group w-fit">
              <div className="w-15 h-15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Image
                  src="/logolight.png"
                  className="-mt-2"
                  alt="Logo"
                  width={70}
                  height={70}
                />
              </div>
              <div>
                <p className="font-extrabold text-white text-[16px] leading-tight tracking-tight">
                  Eddyrose International Academy
                </p>
                <p className="text-white/40 text-[13px] font-medium tracking-wide">
                  Uyo, Akwa Ibom State
                </p>
              </div>
            </Link>

            <p className="text-white/45 text-[14px] leading-[1.75] max-w-[400px] -mt-2">
              Nurturing the next generation of leaders, thinkers, and
              changemakers through excellence in education since inception.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-2.5 mt-1">
              {[
                {
                  icon: MapPin,
                  text: "No. 3 IBB Avenue, Uyo, Akwa Ibom State",
                },
                { icon: Phone, text: "+234 704 576 2841" },
                { icon: Mail, text: "eddyroseintlacademy@gmail.com" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon
                    size={15}
                    className="text-eddyrose-gold/80 flex-shrink-0 mt-[3px]"
                  />
                  <span className="text-white text-[13px] leading-snug">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-1">
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 transition-all duration-200 hover:bg-white/12 hover:border-white/20 hover:text-white/80"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Cols 2–4 — Nav */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] font-bold text-white/35 tracking-[0.1em] uppercase mb-2">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-white transition-colors duration-150 hover:text-white/80"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <ArrowRight
                          size={10}
                          className="text-eddyrose-gold flex-shrink-0"
                        />
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter bar ── */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-6 sm:px-8 py-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-white/80 font-bold text-[14px] mb-0.5">
              Stay in the loop
            </p>
            <p className="text-white/40 text-[12.5px]">
              Get school updates, events, and news delivered to your inbox.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 sm:w-56 rounded-xl border border-white/12 bg-white/8 px-4 py-2.5 text-[13px] text-white placeholder-white/30 outline-none focus:border-eddyrose-gold/50 focus:bg-white/10 transition-all"
            />
            <button className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-eddyrose-gold text-eddyrose-deep font-bold text-[13px] px-5 py-2.5 shadow-md transition-all duration-200 hover:bg-white hover:text-eddyrose-deep hover:shadow-lg active:scale-[0.97]">
              Subscribe
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/8 py-6 flex flex-col w-full justify-center text-center md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-white/30 text-[12px]">
            © {new Date().getFullYear()} Eddyrose International Academy. All
            rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Safeguarding", href: "/safeguarding" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white/30 text-[12px] hover:text-white/60 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
