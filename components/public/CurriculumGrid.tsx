"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CurriculumGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Top Left: Image */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[450px] overflow-hidden">
          <Image
            src="/classroom.png"
            alt="Learning at Eddyrose"
            fill
            className="object-cover"
          />
        </div>

        {/* Top Right: British Curriculum */}
        <div className="bg-eddyrose-deep p-8 py-16 md:p-20 flex flex-col justify-center text-white relative">
          <motion.div
            initial={{ opacity: 0.01, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-1 bg-eddyrose-gold mb-2" />
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              BRITISH CURRICULUM
            </h3>
            <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-lg">
              From FS1 through Year 6, we deliver the English National
              Curriculum with precision and passion. Our standards are rigorous,
              our expectations are high, and our results speak for themselves.
            </p>
          </motion.div>
        </div>

        {/* Bottom Left: Small by Design */}
        <div className="bg-eddyrose-deep px-8 py-16 md:p-20 flex flex-col justify-center text-white order-last md:order-none">
          <motion.div
            initial={{ opacity: 0.01, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-1 bg-eddyrose-gold mb-2" />
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              SMALL BY DESIGN
            </h3>
            <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-lg">
              We are deliberately small. Low student-to-teacher ratios mean no
              child is overlooked. Every learner receives the attention,
              challenge, and care they deserve to thrive.
            </p>
          </motion.div>
        </div>

        {/* Bottom Right: Image */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[450px] overflow-hidden">
          <Image
            src="/student-flower.png"
            alt="Student success"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
