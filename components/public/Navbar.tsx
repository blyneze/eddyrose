"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap, ChevronDown, AlignLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    hasDropdown: true,
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Mission & Vision", href: "/about#mission" },
      { name: "Our Team", href: "/about#team" },
    ],
  },
  {
    name: "Learning",
    href: "/academics",
    hasDropdown: true,
    links: [
      { name: "Programmes", href: "/academics" },
      { name: "Curriculum", href: "/academics#curriculum" },
      { name: "Results", href: "/academics#results" },
    ],
  },
  {
    name: "School Life",
    href: "/gallery",
    hasDropdown: true,
    links: [
      { name: "Gallery", href: "/gallery" },
      { name: "News & Events", href: "/news" },
      { name: "Extracurriculars", href: "/academics#extra" },
    ],
  },
  { name: "Admission", href: "/admissions" },
];

const ALL_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Admissions", href: "/admissions" },
  { name: "Academics", href: "/academics" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const portalUrl = "/portal";

  return (
    <>
      {/* ─── Header ─── */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-[#f8f9fa]"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
          <div
            className="
            flex items-center justify-between
            py-3 md:py-5
          "
          >
            {/* ── Left: Logo & Brand ── */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-12 h-12 md:w-13 md:h-13 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/now-logo.png"
                    alt="Logo"
                    className="-mt-1"
                    width={55}
                    height={55}
                  />
                </div>
                <div className="flex flex-col leading-tight md:gap-0.5">
                  <span className="text-[16px] md:text-[20px] font-black text-eddyrose-deep tracking-tight">
                    Eddyrose
                  </span>
                  <span className="text-[11px] md:text-[14px] font-bold text-eddyrose-light/80 tracking-tight -mt-1 md:-mt-0">
                    International Academy
                  </span>
                </div>
              </Link>
            </div>

            {/* ── Right Section: Nav & CTA ── */}
            <div className="flex items-center lg:gap-2">
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center">
                {NAV_LINKS.map((l) => (
                  <div
                    key={l.name}
                    className="relative group"
                    onMouseEnter={() =>
                      l.hasDropdown && setActiveDropdown(l.name)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={l.href}
                      className="
                        flex items-center gap-1.5 px-3 py-5
                        text-[14px] font-bold text-zinc-700 
                        hover:text-eddyrose-deep transition-all duration-200
                        relative z-10
                      "
                    >
                      {l.hasDropdown && (
                        <AlignLeft
                          size={15}
                          className="text-zinc-400 group-hover:text-eddyrose-deep transition-colors"
                        />
                      )}
                      <span>{l.name}</span>
                      {l.hasDropdown && (
                        <ChevronDown
                          size={14}
                          className={`text-zinc-400 group-hover:text-eddyrose-deep mt-0.5 transition-transform duration-300 ${
                            activeDropdown === l.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Invisible bridge to keep menu open while moving mouse */}
                    {l.hasDropdown && activeDropdown === l.name && (
                      <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {l.hasDropdown && activeDropdown === l.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="
                            absolute top-[calc(100%-5px)] left-1/2 -translate-x-1/2 
                            min-w-[210px] bg-white rounded-lg 
                            shadow-[0_20px_50px_rgba(0,0,0,0.12)] 
                            border border-zinc-100 p-2 z-50
                          "
                        >
                          <div className="flex flex-col gap-0.5">
                            {l.links?.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className="
                                  px-4 py-3 rounded-xl text-[13px] font-bold 
                                  text-zinc-500 hover:bg-zinc-50 hover:text-eddyrose-deep 
                                  transition-all duration-150 whitespace-nowrap
                                "
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* CTA Section (Desktop) / Hamburger (Mobile) */}
              <div className="flex items-center gap-2">
                {/* Desktop CTA */}
                <Link
                  href="/portal"
                  className="
                    hidden md:inline-flex items-center
                    px-6 py-2
                    bg-eddyrose-deep text-white
                    text-[14px] font-bold
                    rounded-lg
                    hover:bg-eddyrose-light transition-all duration-200
                    shadow-md hover:shadow-lg
                    whitespace-nowrap
                  "
                >
                  Result Portal
                </Link>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open navigation menu"
                  className="
                    md:hidden
                    relative z-20
                    w-11 h-11
                    bg-white border border-zinc-200
                    rounded-xl
                    flex items-center justify-center
                    text-zinc-600
                    shadow-sm
                    active:scale-95 transition-transform
                    cursor-pointer
                  "
                >
                  <Menu size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[60] bg-black/25 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="
                fixed top-0 right-0 z-[70]
                h-[100dvh] w-[290px]
                bg-white
                flex flex-col
                shadow-2xl
              "
            >
              {/* Drawer top bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[9px] bg-[#1a2e4a] flex items-center justify-center">
                    <GraduationCap size={17} className="text-white" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[14px] font-extrabold text-[#1a2e4a]">
                      Eddyrose
                    </span>
                    <span className="text-[11px] font-normal text-zinc-400">
                      International Academy
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto px-4 pt-6 pb-4 flex flex-col gap-0.5">
                {ALL_LINKS.map((l, i) => (
                  <motion.div
                    key={l.name}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="
                        flex items-center gap-3
                        px-4 py-3.5 rounded-xl
                        text-[15px] font-medium text-zinc-600
                        hover:bg-zinc-50 hover:text-[#1a2e4a]
                        transition-all duration-150
                        active:scale-[0.98]
                      "
                    >
                      {l.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="px-5 pb-8 pt-3 border-t border-zinc-100 space-y-2">
                <Link
                  href={portalUrl}
                  onClick={() => setMenuOpen(false)}
                  className="
                    flex items-center justify-center
                    w-full py-3.5 rounded-2xl
                    bg-[#1a2e4a] text-white
                    text-[14px] font-bold
                    shadow-md hover:bg-[#243d60]
                    transition-all duration-200
                    active:scale-[0.98]
                  "
                >
                  Portal Login
                </Link>
                <p className="text-center text-[11px] text-zinc-400">
                  Students · Parents · Staff
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
