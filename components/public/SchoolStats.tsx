"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  {
    value: "20",
    label: "Maximum Class Size",
    text: "Smaller classes mean more individual attention, allowing our teachers to truly understand and support your child's unique learning style.",
  },
  {
    value: "10+",
    label: "Enriching Activities",
    text: "From coding and chess to sports and arts, our wide range of clubs helps children discover their passions beyond the classroom.",
  },
  {
    value: "3–11",
    label: "Years of Age",
    text: "A structured, seamless learning journey from the early years all the way through primary school, building confidence at every step.",
  },
  {
    value: "100%",
    label: "Personal Attention",
    text: "Every single child is known by name, guided with care, and encouraged to reach their full potential in a safe, warm environment.",
  },
];

export default function SchoolStats() {
  return (
    <section className="bg-white py-12 pb-32 md:pb-0 md:py-16 px-6 md:px-[5%] max-w-7xl mx-auto relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12">
        {/* Left: Sticky Header Area */}
        <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 h-fit">
          <motion.div
            initial={{ opacity: 1, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-eddyrose-gold" />
              <p className="text-eddyrose-gold text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
                The Eddyrose Difference
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-eddyrose-deep leading-snug mb-4 tracking-tight">
              Every child known.
              <br />
              <span className="text-zinc-400">Every child supported.</span>
            </h2>

            <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-sm font-medium">
              We believe that education is profoundly personal. By keeping our
              community intentionally sized and our focus sharp, we ensure your
              child receives the exact attention they need to thrive.
            </p>
          </motion.div>
        </div>

        {/* Right: Editorial Stats List */}
        <div className="lg:col-span-7 flex flex-col">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-6 md:py-8 border-t border-zinc-200 first:border-t-0 lg:first:border-t"
            >
              <div className="shrink-0 min-w-[70px] md:min-w-[90px]">
                <span className="text-3xl md:text-4xl lg:text-5xl font-black text-eddyrose-gold tracking-tighter block leading-none">
                  {stat.value}
                </span>
              </div>
              <div className="mt-1 sm:mt-0 flex-1">
                <h3 className="text-lg md:text-xl font-black text-eddyrose-deep mb-2">
                  {stat.label}
                </h3>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                  {stat.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Mascot Image - Positioned to "rest" on the next section */}
      <div className="absolute -bottom-8 md:-bottom-11 left-0 w-60 h-60 md:w-96 md:h-96 z-20 pointer-events-none">
        <Image
          src="/restread.png"
          alt="Eddyrose Mascot"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
}
