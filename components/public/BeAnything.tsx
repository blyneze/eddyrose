"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
  { label: "PERFORMING ARTS", src: "/gallery-1.png" },
  { label: "SWIMMING", src: "/gallery-2.png" },
  { label: "STEAM", src: "/gallery-3.png" },
  { label: "PE & SPORT", src: "/gallery-4.png" },
  { label: "ART & DESIGN", src: "/gallery-5.png" },
  { label: "LIBRARY", src: "/gallery-6.png" },
  { label: "SCIENCE LAB", src: "/gallery-7.png" },
  { label: "ASSEMBLY", src: "/gallery-8.png" },
];

export default function BeAnything() {
  return (
    <section className="relative w-full bg-eddyrose-deep pt-24 pb-0 overflow-hidden">
      {/* Mascot Image - Resting on the top edge */}
      <div className="absolute -top-12 right-10 md:right-20 w-48 h-48 md:w-64 md:h-64 z-20 pointer-events-none">
        <Image
          src="/mascot.png"
          alt="Eddyrose Mascot"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          className="text-eddyrose-gold font-bold text-xs tracking-widest uppercase mb-4 block"
        >
          WHERE CURIOSITY LEADS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          className="text-5xl md:text-8xl font-black text-white leading-none mb-3"
        >
          BE <br /> ANYTHING.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed"
        >
          From the stage to the science lab, the sports field to the art studio,
          our broad, ambitious curriculum gives every child the chance to
          discover what they love and what they're brilliant at.
        </motion.p>
      </div>

      {/* Auto-scrolling Marquee Gallery */}
      <div className="relative mt-5">
        {/* Side Masks for "disappearing" effect */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-eddyrose-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-eddyrose-deep to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* 3x items to guarantee no gaps on ultra-wide screens */}
            {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
              <div
                key={i}
                className="relative w-[300px] h-[320px] flex-shrink-0 border-r border-white/5 group cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-eddyrose-deep/80 via-transparent to-transparent" />

                {/* Label */}
                <div className="absolute bottom-5 left-5">
                  <span className="text-white font-black text-sm tracking-[0.2em] uppercase">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
