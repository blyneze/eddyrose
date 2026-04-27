"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STAGES = [
  {
    title: "Creche & Pre-Nursery",
    age: "18 months to 3 Years",
    src: "/stage-1.png",
    blob: "bg-green-500/30",
    blobPos: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  },
  {
    title: "Nursery",
    age: "Ages 3 - 5",
    src: "/stage-2.png",
    blob: "bg-magenta-500/30", // Magenta color
    blobPos: "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  },
  {
    title: "Lower Primary",
    age: "Grades 1 - 3",
    src: "/stage-3.png",
    blob: "bg-blue-500/30",
    blobPos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  },
  {
    title: "Upper Primary",
    age: "Grades 4 - 6",
    src: "/stage-4.png",
    blob: "bg-orange-500/30",
    blobPos: "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  },
  {
    title: "Creative Arts Centre",
    age: "All Stages",
    src: "/stage-5.png",
    blob: "bg-purple-500/30",
    blobPos: "top-0 right-0 translate-x-1/4 -translate-y-1/4",
  },
  {
    title: "STEAM & Innovation",
    age: "Future Ready",
    src: "/stage-6.png",
    blob: "bg-red-500/30",
    blobPos: "bottom-1/2 right-0 translate-x-1/2 translate-y-1/2",
  },
];

export default function AcademyStages() {
  return (
    <section className="bg-white pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0.01, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            className="text-2xl md:text-5xl font-black text-eddyrose-deep mb-1 md:mb-2"
          >
            Our Academy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0.01, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-sm md:text-lg leading-relaxed"
          >
            Eddyrose International Academy is structured into key developmental
            stages. Each stage is led by dedicated educators and the curriculum
            is tailored specifically to meet the academic, emotional, and social
            needs of every age group.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAGES.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.01, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-[16/10] rounded-[1rem] overflow-hidden group cursor-pointer shadow-xl"
            >
              <Image
                src={stage.src}
                alt={stage.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Decorative Blob */}
              <div
                className={`absolute w-48 h-48 rounded-full blur-3xl opacity-60 mix-blend-screen transition-transform duration-700 group-hover:scale-125 ${stage.blob} ${stage.blobPos}`}
              />

              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-eddyrose-gold transition-colors">
                  {stage.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm font-medium">{stage.age}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
