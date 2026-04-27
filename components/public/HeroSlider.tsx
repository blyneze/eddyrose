"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSlider() {
  return (
    <section className="w-full px-4 md:px-6">
      {/* ─── Main Hero Container ─── */}
      <div className="relative w-full h-[350px] lg:h-[80vh] rounded-[1rem] overflow-hidden bg-zinc-950 flex flex-col shadow-2xl border border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Hero"
            fill
            className="object-cover object-top scale-100"
          />
        </div>

        {/* ─── Content Layer ─── */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-8 md:p-16 lg:px-20 lg:py-16">
          {/* Spacer for potential inner navbar or padding */}
          <div className="h-10 w-full" />

          {/* Middle Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            {/* Left: Headline Area */}
            <motion.div
              initial={{ opacity: 0.01, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            >
              <span className="text-eddyrose-gold font-bold text-xs md:text-base tracking-widest uppercase mb-4 block">
                Eddyrose International Academy
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Empowering <span className="text-eddyrose-gold">Leaders</span>{" "}
                <br />
                in the Hearts <br />
                of <span className="text-white">Our Children</span>
              </h1>
            </motion.div>

            {/* Right: Text + Buttons */}
            <motion.div
              initial={{ opacity: 0.01, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
              className="flex flex-col gap-6 md:gap-10 lg:max-w-md lg:ml-auto"
            >
              <p className="text-white/70 text-sm md:text-lg leading-relaxed font-medium">
                We provide a world-class education that blends academic rigor
                with character development. Our students are nurtured to become
                the visionary leaders of tomorrow, equipped with excellence and
                integrity.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-eddyrose-deep font-bold px-6 md:px-10 py-3 md:py-4 rounded-2xl flex items-center gap-3 hover:bg-eddyrose-gold hover:text-white transition-all active:scale-95 shadow-xl text-sm md:text-base"
                >
                  Join Family
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/about"
                  className="bg-black/30 backdrop-blur-md border border-white/20 text-white font-bold px-6 md:px-10 py-3 md:py-4 rounded-2xl hover:bg-white/10 transition-all active:scale-95 text-sm md:text-base"
                  style={{ WebkitBackdropFilter: "blur(12px)" }}
                >
                  Quick Links
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
