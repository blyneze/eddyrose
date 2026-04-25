"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Award,
  Microscope,
  Star,
  GraduationCap,
  Heart,
  Globe,
} from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    pill: "Excellence in Education",
    headline: ["Empowering Next", "Generation Leaders"],
    support:
      "At Eddyrose Academy, we deliver comprehensive education that goes beyond academics — nurturing character, creativity, and curiosity.",
    cta: "Discover more",
    href: "/admissions",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    pill: "A Foundation of Care",
    headline: ["Igniting Curiosity", "and Innovation"],
    support:
      "Our modern programs are designed to inspire curiosity and build confident, lifelong learners ready for tomorrow.",
    cta: "Explore Academics",
    href: "/academics",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1427504494785-319ce8372ac0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    pill: "Community & Growth",
    headline: ["Growing Together", "in Uyo"],
    support:
      "Join a vibrant community of passionate educators, committed parents, and thriving students in Akwa Ibom State.",
    cta: "About Us",
    href: "/about",
  },
];

const MARQUEE_ITEMS = [
  { icon: GraduationCap, label: "Excellence in Education" },
  { icon: Users, label: "Experienced Teachers" },
  { icon: Award, label: "Award-winning Programs" },
  { icon: BookOpen, label: "Modern Curriculum" },
  { icon: Heart, label: "Nurturing Environment" },
  { icon: Microscope, label: "Science & Innovation" },
  { icon: Star, label: "Outstanding Results" },
  { icon: Globe, label: "Global Perspectives" },
];

const SLIDE_DURATION = 6000;

// Easing curve used throughout — snappy deceleration (Framer default)
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const advance = useCallback(() => {
    setCurrent((p) => (p + 1) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setTimeout(advance, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [current, advance]);

  const goTo = (i: number) => {
    if (i === current) return;
    setCurrent(i);
    setProgressKey((k) => k + 1);
  };

  const slide = SLIDES[current];

  return (
    <section className="w-full">
      {/* ─── Hero card ─────────────────────────────────────────────────── */}
      <div className="px-3 sm:px-5 md:px-7 pt-2 pb-3">
        <div
          className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[22px] min-h-[420px] h-[40vh] md:h-[80vh] max-h-[90vh]"
          style={{
            boxShadow: "0 8px 48px rgba(0,0,0,0.20)",
          }}
        >
          {/* Background image – pure crossfade, no scale jitter */}
          <AnimatePresence initial={false}>
            <motion.div
              key={`bg-${current}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Left-anchored scrim: text zone stays dark, photo visible on right. Base dark overlay guarantees mobile readability. */}
              <div className="absolute inset-0 bg-black/40 xl:bg-black/20" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(6,12,28,0.95) 0%, rgba(6,12,28,0.7) 45%, transparent 85%)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Content — full-height column, content spread top↔bottom */}
          <div className="relative z-10 h-full flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 py-6 sm:py-9 md:py-12">
            {/* ── TOP: pill + headline + subtitle ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                className="flex flex-col items-start"
                // parent acts as a stagger host — children use their own variants
              >
                {/* Pill badge */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/10 backdrop-blur-md px-3.5 py-[5px] text-[10.5px] sm:text-[12px] font-semibold text-white/90 tracking-[0.03em] shadow-sm"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-white/80 flex-shrink-0" />
                  {slide.pill}
                </motion.span>

                {/* Headline — each line staggers in */}
                <h1 className="mt-[10px] sm:mt-[14px] md:mt-[16px] flex flex-col">
                  {slide.headline.map((text, i) => (
                    <span
                      key={`${current}-${i}`}
                      className="overflow-hidden block"
                    >
                      <motion.span
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-30%", opacity: 0 }}
                        transition={{
                          duration: 0.52,
                          ease: EASE,
                          delay: 0.08 + i * 0.07,
                        }}
                        className="block font-extrabold text-white leading-[1.06] tracking-[-0.022em]"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 4.8rem)" }}
                      >
                        {text}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* Subtitle — fades in after headline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.32 }}
                  className="hidden sm:block mt-[10px] sm:mt-[14px] font-normal text-white/65 leading-[1.6]"
                  style={{
                    fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                    maxWidth: "500px",
                  }}
                >
                  {slide.support}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* ── BOTTOM: progress bars + CTA ── */}
            <div className="flex flex-col items-start gap-[10px] sm:gap-[14px]">
              {/* Progress bars */}
              <div className="flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="relative h-[3px] rounded-full overflow-hidden cursor-pointer"
                    style={{
                      width: i === current ? 46 : 28,
                      background: "rgba(255,255,255,0.26)",
                      transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {i === current && (
                      <motion.div
                        key={progressKey}
                        className="absolute inset-y-0 left-0 bg-white rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: SLIDE_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                    {i < current && (
                      <div className="absolute inset-0 bg-white/65 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* CTA button */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cta-${current}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.44 }}
                >
                  <Link
                    href={slide.href}
                    className="group inline-flex items-center gap-2 rounded-full bg-eddyrose-deep text-white font-bold shadow-[0_4px_20px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-eddyrose-light hover:shadow-[0_6px_28px_rgba(0,0,0,0.32)] active:scale-[0.97]"
                    style={{
                      fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
                      padding: "clamp(12px,1.5vw,14px) clamp(20px,2.6vw,32px)",
                    }}
                  >
                    {slide.cta}
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Marquee strip ─────────────────────────────────────────────── */}
      <div className="px-3 sm:px-5 md:px-7 lg:px-10 xl:px-14 pb-10 md:pb-14">
        <div
          className="relative overflow-hidden bg-white border border-zinc-200/60 rounded-[14px] sm:rounded-[18px] py-3 sm:py-3.5"
          style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.045)" }}
        >
          {/* Fade masks */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-24 z-10"
            style={{
              background: "linear-gradient(to right, #fff 20%, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-24 z-10"
            style={{
              background: "linear-gradient(to left, #fff 20%, transparent)",
            }}
          />

          {/* 3× items for seamless loop */}
          <motion.div
            className="flex items-center w-max select-none"
            animate={{ x: ["0%", "-33.3333%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
              (item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="inline-flex items-center flex-shrink-0 gap-2 px-5 sm:px-7 whitespace-nowrap"
                  >
                    <Icon
                      size={13}
                      className="text-eddyrose-deep flex-shrink-0"
                    />
                    <span className="text-[11px] sm:text-[12.5px] font-semibold text-zinc-500 tracking-wide">
                      {item.label}
                    </span>
                    <span className="ml-4 sm:ml-6 text-zinc-300 text-[8px] leading-none">
                      ✦
                    </span>
                  </div>
                );
              },
            )}
          </motion.div>
        </div>
      </div>


    </section>
  );
}
