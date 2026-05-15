"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
  { label: "BRIGHT CLASSROOMS", src: "/classroom.png" },
  { label: "COZY LIBRARY", src: "/school-reading.png" },
  { label: "SPORTS & PE", src: "/st1.jpg" },
  { label: "CREATIVE ARTS", src: "/s1.jpg" },
  { label: "STEAM LAB", src: "/s2.jpg" },
  { label: "MODERN FACILITIES", src: "/school-corridor.png" },
  { label: "NATURE STUDIES", src: "/student-flower.png" },
  { label: "GLOBAL CULTURE", src: "/inter.jpg" },
];

export default function BeAnything() {
  return (
    <section className="relative w-full bg-eddyrose-deep py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 relative z-10">
        <motion.span
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          className="text-eddyrose-gold font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 block"
        >
          WHERE CURIOSITY LEADS
        </motion.span>
        <motion.h2
          initial={{ opacity: 1, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-3 tracking-tight"
        >
          BE ANYTHING.
        </motion.h2>
        <motion.p
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.2 }}
          className="text-zinc-200 text-sm md:text-base max-w-xl leading-relaxed font-medium"
        >
          From the stage to the science lab, the sports field to the art studio,
          our broad, ambitious curriculum gives every child the chance to
          discover what they love and what they're truly brilliant at.
        </motion.p>
      </div>

      {/* Auto-scrolling Marquee Gallery */}
      <div className="relative mt-2">
        {/* Side Masks */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-eddyrose-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-eddyrose-deep to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden py-2">
          <motion.div
            className="flex gap-3 md:gap-4 px-3 md:px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
              <div
                key={i}
                className="relative w-[220px] md:w-[300px] h-[220px] md:h-[300px] flex-shrink-0 rounded-xl md:rounded-[1rem] overflow-hidden group cursor-pointer shadow-md"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 220px, 300px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eddyrose-deep/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute bottom-5 left-5 right-5 flex items-end">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <span className="text-white font-black text-[10px] md:text-xs tracking-[0.2em] uppercase block">
                      {item.label}
                    </span>
                    <div className="h-0.5 w-6 bg-eddyrose-gold mt-2 transform origin-left transition-all duration-500 scale-x-0 group-hover:scale-x-100" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
