"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STAGES = [
  {
    title: "Transition: Buttercups",
    age: "18 months to 2 Years",
    src: "/student-flower.png",
    blob: "bg-green-500/30",
    blobPos: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  },
  {
    title: "Hawthorn: Pre-Nursery",
    age: "Ages 2 - 3",
    src: "/classroom.png",
    blob: "bg-pink-500/30",
    blobPos: "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  },
  {
    title: "Bluebell: Nursery 1",
    age: "Ages 2 - 3",
    src: "/s3.jpg",
    blob: "bg-pink-500/30",
    blobPos: "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  },
  {
    title: "Aster: Grade 1",
    age: "Ages 3 - 4",
    src: "/classroom.png",
    blob: "bg-pink-500/30",
    blobPos: "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  },
  {
    title: "Dahlia: Grade 2",
    age: "Ages 4 - 5",
    src: "/school-reading.png",
    blob: "bg-blue-500/30",
    blobPos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  },
  {
    title: "Saffron: Grade 3",
    age: "Grades 4 - 6",
    src: "/s1.jpg",
    blob: "bg-orange-500/30",
    blobPos: "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  },
  {
    title: "Ivory: Grade 4",
    age: "All Stages",
    src: "/s4.jpg",
    blob: "bg-purple-500/30",
    blobPos: "top-0 right-0 translate-x-1/4 -translate-y-1/4",
  },
  {
    title: "Hawthorn: Grade 5",
    age: "Future Ready",
    src: "/s2.jpg",
    blob: "bg-red-500/30",
    blobPos: "bottom-1/2 right-0 translate-x-1/2 translate-y-1/2",
  },
];

export default function AcademyStages() {
  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <motion.h2
            initial={{ opacity: 1, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            className="text-3xl md:text-4xl font-black text-eddyrose-deep mb-3 tracking-tight"
          >
            Our Academy
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium"
          >
            Eddyrose International Academy is structured into key developmental
            stages. Each stage is led by dedicated educators and the curriculum
            is tailored specifically to meet the academic, emotional, and social
            needs of every age group.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3">
          {STAGES.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-[16/11] rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-zinc-100"
            >
              <Image
                src={stage.src}
                alt={stage.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-eddyrose-deep/90 via-eddyrose-deep/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-lg md:text-xl font-black text-white mb-1 group-hover:text-eddyrose-gold transition-colors">
                  {stage.title}
                </h3>
                <p className="text-white/70 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                  {stage.age}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
