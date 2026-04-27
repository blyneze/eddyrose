"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, AlignLeft } from "lucide-react";
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
      { name: "Mission & Vision", href: "/about/mission" },
      { name: "Our Director", href: "/about/director" },
      { name: "Safeguarding", href: "/about/safeguarding" },
      { name: "Careers", href: "/about/careers" },
    ],
  },
  {
    name: "Learning",
    href: "/academics",
    hasDropdown: true,
    links: [
      { name: "Our Curriculum", href: "/academics" },
      { name: "Campus & Facilities", href: "/academics#facilities" },
      { name: "Extracurriculars", href: "/academics#extra" },
    ],
  },
  {
    name: "Admissions",
    href: "/admissions",
    hasDropdown: true,
    links: [
      { name: "Admissions Process", href: "/admissions" },
      { name: "Book a Tour", href: "/admissions/book-tour" },
      { name: "Apply Now", href: "/admissions/apply" },
    ],
  },
  {
    name: "Parents",
    href: "/parents",
    hasDropdown: true,
    links: [
      { name: "Latest News", href: "/parents" },
      { name: "Term Dates", href: "/parents/term-dates" },
      { name: "School Timings", href: "/parents/timings" },
      { name: "Uniform", href: "/parents/uniform" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);

  const portalUrl = "/portal";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Header ───
          FIX 1: Use transition-[background-color,box-shadow] instead of
          transition-all. transition-all is known to cause silent touch-event
          failures on iOS Safari and some Android WebViews because it transitions
          pointer-events along with everything else.

          FIX 2: z-40 instead of z-50 so the hamburger button (z-50) and the
          sidebar overlay (z-[60]) are always above the header — otherwise the
          header's stacking context swallows the button's z-[80] declaration,
          making the overlay block the button after the menu opens.
      -->*/}
      <header
        className={`sticky top-0 z-40 w-full transition-[background-color,box-shadow] duration-300 ${
          isScrolled
            ? "bg-white/90 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "bg-[#f8f9fa]"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-between py-3 md:py-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center md:h-13 md:w-13">
                <Image
                  src="/now-logo.png"
                  alt="Eddyrose International Academy Logo"
                  width={55}
                  height={55}
                  className="-mt-1"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[16px] font-black tracking-tight text-eddyrose-deep md:text-[20px]">
                  Eddyrose
                </span>
                <span className="text-[11px] font-bold tracking-tight text-eddyrose-light/80 md:text-[14px]">
                  International Academy
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {/* Desktop Nav */}
              <nav className="hidden items-center md:flex">
                {NAV_LINKS.map((link) => (
                  <div
                    key={link.name}
                    className="group relative"
                    onMouseEnter={() =>
                      link.hasDropdown && setActiveDropdown(link.name)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="relative z-10 flex items-center gap-1.5 px-3 py-5 text-[14px] font-bold text-zinc-700 transition-all duration-200 hover:text-eddyrose-deep"
                    >
                      {link.hasDropdown && (
                        <AlignLeft
                          size={15}
                          className="text-zinc-400 transition-colors group-hover:text-eddyrose-deep"
                        />
                      )}
                      <span>{link.name}</span>
                      {link.hasDropdown && (
                        <ChevronDown
                          size={14}
                          className={`mt-0.5 text-zinc-400 transition-transform duration-300 group-hover:text-eddyrose-deep ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Desktop Dropdown */}
                    {link.hasDropdown && activeDropdown === link.name && (
                      <div className="absolute left-1/2 top-[calc(100%-5px)] z-50 min-w-[210px] -translate-x-1/2 rounded-lg border border-zinc-100 bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                        <div className="flex flex-col gap-0.5">
                          {link.links?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="whitespace-nowrap rounded-xl px-4 py-3 text-[13px] font-bold text-zinc-500 transition-all duration-150 hover:bg-zinc-50 hover:text-eddyrose-deep"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Desktop CTA */}
              <Link
                href={portalUrl}
                className="hidden items-center rounded-lg bg-eddyrose-deep px-6 py-2 text-[14px] font-bold text-white shadow-md transition-all duration-200 hover:bg-eddyrose-light hover:shadow-lg md:inline-flex"
              >
                Result Portal
              </Link>

              {/* Hamburger button
                  FIX 3: z-[65] is always above the overlay (z-[60]) so the button
                  remains tappable whether the sidebar is open or closed.
                  Removed the conditional z class — a stable, always-on-top z-index
                  is simpler and more reliable across mobile browsers.
              -->*/}
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="relative z-[65] flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-transform active:scale-95 md:hidden"
              >
                {menuOpen ? (
                  <X size={22} strokeWidth={2.5} />
                ) : (
                  <Menu size={22} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Sidebar ─── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay — z-[60] sits above the header (z-40) but below the button (z-[65]) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px] md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar panel — z-[62] sits above the overlay but below the button */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="fixed right-0 top-0 z-[62] flex h-screen w-[290px] max-w-[85vw] flex-col bg-white shadow-2xl md:hidden"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/now-logo.png"
                    alt="Eddyrose International Academy Logo"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[14px] font-extrabold text-[#1a2e4a]">
                      Eddyrose
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      International Academy
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:text-zinc-800"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Sidebar Nav Links */}
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 pb-4 pt-6">
                {NAV_LINKS.map((link) => (
                  <div key={link.name}>
                    {link.hasDropdown ? (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileActiveDropdown((current) =>
                              current === link.name ? null : link.name,
                            )
                          }
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-zinc-600 transition-all duration-150 hover:bg-zinc-50 hover:text-[#1a2e4a]"
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={16}
                            className={`text-zinc-400 transition-transform duration-300 ${
                              mobileActiveDropdown === link.name
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileActiveDropdown === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 pr-2"
                            >
                              <div className="ml-4 flex flex-col gap-1 border-l-2 border-zinc-100 py-2">
                                {link.links?.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="ml-2 block rounded-lg px-4 py-2.5 text-[14px] font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-eddyrose-deep"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-zinc-600 transition-all duration-150 hover:bg-zinc-50 hover:text-[#1a2e4a] active:scale-[0.98]"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="space-y-2 border-t border-zinc-100 px-5 pb-8 pt-3">
                <Link
                  href={portalUrl}
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#1a2e4a] py-3.5 text-[14px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#243d60] active:scale-[0.98]"
                >
                  Portal Login
                </Link>
                <p className="text-center text-[11px] text-zinc-400">
                  Students · Parents · Staff
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
