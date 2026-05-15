"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

interface PageLayoutProps {
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; href: string }[];
  sidebarLinks: { label: string; href: string }[];
  children: React.ReactNode;
  bgImage?: string;
  sidebarTitle?: string;
}

export default function PageLayout({
  title,
  subtitle,
  breadcrumbs,
  sidebarLinks,
  children,
  bgImage,
  sidebarTitle = "IN THIS SECTION",
}: PageLayoutProps) {
  const pathname = usePathname();

  // Automatic section-based hero images if not provided
  const getHeroImage = () => {
    if (bgImage) return bgImage;
    if (pathname.startsWith("/about")) return "/about-hero.png";
    if (pathname.startsWith("/academics")) return "/academics-hero.png";
    if (pathname.startsWith("/admissions")) return "/building.png";
    if (pathname.startsWith("/parents")) return "/building.png";
    return "/hero.png";
  };

  const finalBgImage = getHeroImage();

  return (
    <main className="w-full">
      {/* ─── Hero Header ─── */}
      <section className="relative w-full h-[400px] md:h-[450px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={finalBgImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eddyrose-deep/50 via-eddyrose-deep/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-[5%] relative z-10 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest md:mb-2">
            <NextLink
              href="/"
              className="hover:text-eddyrose-gold transition-colors"
            >
              HOME
            </NextLink>
            {breadcrumbs.map((bc, i) => (
              <div key={i} className="flex items-center gap-2">
                <ChevronRight size={12} className="text-white/30" />
                <NextLink
                  href={bc.href}
                  className="hover:text-eddyrose-gold transition-colors"
                >
                  {bc.label}
                </NextLink>
              </div>
            ))}
          </nav>

          <motion.h1
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white -mt-2 md:-mt-0 mb-1 md:mb-3"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-sm md:text-lg max-w-xl font-medium"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* ─── Main Content Area ─── */}
      <section className="bg-white py-10 md:py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-24">
          {/* Main Content (2/3) */}
          <div className="flex-1 md:ml-[5%] lg:max-w-[65%]">
            <div className="prose prose-zinc prose-lg max-w-none prose-headings:text-eddyrose-deep prose-headings:font-black prose-p:text-zinc-600 prose-p:leading-relaxed">
              {children}
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <aside className="w-full lg:w-[30%] md:mr-[5%] shrink-0">
            <div className="sticky top-16 space-y-12">
              {/* Navigation Links */}
              <div>
                <p className="text-[10px] font-bold text-eddyrose-gold tracking-[0.2em] uppercase mb-6 pb-2 border-b border-zinc-100">
                  {sidebarTitle}
                </p>
                <ul className="space-y-4">
                  {sidebarLinks.map((link, i) => (
                    <li key={i}>
                      <NextLink
                        href={link.href}
                        className={`group flex items-center justify-between text-[15px] font-bold transition-all
                          ${pathname === link.href ? "text-eddyrose-deep" : "text-zinc-400 hover:text-eddyrose-deep"}
                        `}
                      >
                        {link.label}
                        <ArrowRight
                          size={16}
                          className={`transition-transform duration-300 ${pathname === link.href ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                        />
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book a Tour CTA Card */}
              <div className="bg-zinc-50 -mt-[4%] rounded-[1rem] p-6 border border-zinc-100">
                <h4 className="text-xl font-black text-eddyrose-deep mb-2">
                  Book a Tour
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                  See our school in action and meet the team who will know your
                  child by name.
                </p>
                <NextLink
                  href="/admissions/book-tour"
                  className="inline-flex text-sm items-center justify-center w-full bg-eddyrose-deep text-white font-black px-6 py-4 rounded-[.75rem] hover:bg-eddyrose-gold transition-all shadow-lg active:scale-[0.98]"
                >
                  ARRANGE A VISIT
                </NextLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
