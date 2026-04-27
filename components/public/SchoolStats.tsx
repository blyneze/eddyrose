"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "25", label: "MAX CLASS SIZE" },
  { value: "20+", label: "CLUBS & ACTIVITIES" },
  { value: "FS1–Y6", label: "AGES 3–11" },
  { value: "100%", label: "KNOWN" },
];

export default function SchoolStats() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0.01, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="text-3xl md:text-5xl font-black text-eddyrose-deep mb-2"
        >
          A School Built Around Your Child
        </motion.h2>
        <motion.p
          initial={{ opacity: 0.01, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          transition={{ delay: 0.1 }}
          className="text-zinc-500 text-sm md:text-xl"
        >
          Small enough to know every child by name. Big enough to offer the
          world.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-0 mt-10">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-1 w-full items-center">
              <div className="flex flex-col items-center justify-center flex-1 py-4">
                <motion.span
                  initial={{ opacity: 0.01, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl md:text-5xl font-black text-eddyrose-gold mb-2"
                >
                  {stat.value}
                </motion.span>
                <span className="text-[10px] md:text-[11px] font-black text-eddyrose-deep tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </div>
              {i !== STATS.length - 1 && (
                <div className="hidden md:block w-px h-24 bg-eddyrose-deep/20 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
