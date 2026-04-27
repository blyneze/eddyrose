"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BelongSection() {
  return (
    <section className="relative w-full py-12 md:py-20 md:pb-32 pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Gold Divider (Top) */}
        <div className="w-12 md:w-16 h-1 bg-eddyrose-gold mb-5 md:mb-10" />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 1, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-none text-eddyrose-deep tracking-tighter mb-4"
        >
          BELONG.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 1, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-zinc-600 text-sm md:text-xl max-w-2xl leading-relaxed mb-6 font-medium"
        >
          Eddyrose Academy is built on genuine relationships between teachers,
          children, and families. When you walk through our gates, you feel it
          immediately, this is a place where children truly belong.
        </motion.p>
      </div>

      {/* Mascot Image - Positioned to "rest" on the next section */}
      <div className="absolute -bottom-6 md:-bottom-10 left-0 w-48 h-48 md:w-80 md:h-80 z-20 pointer-events-none">
        <Image
          src="/resting.png"
          alt="Eddyrose Mascot"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
}
