"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSlider() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      {/* ─── Main Hero Container ─── */}
      <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-zinc-900 flex flex-col shadow-2xl border border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-black/5" />
        </div>

        {/* ─── Content Layer ─── */}
        <div className="relative z-10 flex-1 flex flex-col justify-end p-6 sm:p-10">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 1, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-5">
              Dare To <span className="text-eddyrose-gold">Dream</span>
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
