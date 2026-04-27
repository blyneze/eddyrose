"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BelongSection() {
  return (
    <section className="relative w-full py-8">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Gold Divider (Top) */}
        <div className="w-16 h-1 bg-eddyrose-gold mb-16" />

        {/* Huge Heading */}
        <motion.h2
          initial={{ opacity: 0.01, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-[8rem] font-black leading-none text-eddyrose-deep tracking-tighter mb-3"
        >
          BELONG
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0.01, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-eddyrose-light/80 text-sm md:text-xl max-w-3xl leading-relaxed mb-10 font-medium"
        >
          Our community is built on genuine relationships between teachers,
          children, and families. When you walk through our gates, you feel it
          immediately — this is a place where children truly belong.
        </motion.p>
      </div>

      {/* Mascot Image - Positioned to "rest" on the next section */}
      <div className="absolute -bottom-8 right-0 md:right-10 w-48 h-48 md:w-80 md:h-80 z-20 pointer-events-none">
        <Image
          src="/mascot.png"
          alt="Eddyrose Mascot"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
}
