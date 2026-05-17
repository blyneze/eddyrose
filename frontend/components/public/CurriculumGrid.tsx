"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CurriculumGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-col-r grid-cols-1 md:grid-cols-2">
        {/* Top Left: British Curriculum */}
        <div className="bg-eddyrose-deep px-8 py-12 md:p-20 flex flex-col justify-center text-white relative">
          <div>
            <div className="w-16 h-1 bg-eddyrose-gold mb-2" />
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              BRITISH CURRICULUM
            </h3>
            <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-lg">
              From the earliest stages through primary education, Eddyrose
              Academy creates a learning experience built on care, structure,
              and excellence. We hold high expectations while supporting every
              child to grow with confidence, curiosity, and purpose.
            </p>
          </div>
        </div>

        {/* Top Right: Image */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[450px] overflow-hidden">
          <Image
            src="/bcur.jpg"
            alt="Learning at Eddyrose"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom Left: Image */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[450px] order-2 md:order-0 overflow-hidden">
          <Image
            src="/cur.png"
            alt="Student success"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom Right: Small by Design */}
        <div className="bg-eddyrose-deep px-8 py-12 md:p-20 flex flex-col justify-center text-white relative">
          <div>
            <div className="w-16 h-1 bg-eddyrose-gold mb-2" />
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              SMALL BY DESIGN
            </h3>
            <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-lg">
              We are deliberately small. Low student-to-teacher ratios mean no
              child is overlooked. Every learner receives the attention,
              challenge, and care they deserve to thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
