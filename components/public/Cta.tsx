"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, GraduationCap, Users, BookOpen, Globe, Award, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="w-full bg-[#f8f9fa] px-4 sm:px-6 lg:px-12 xl:px-16 py-16 md:py-24">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full min-h-[600px]"
      >
        {/* 1. Main CTA Box (Span 2x2) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 md:row-span-2 bg-eddyrose-deep rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
        >
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-eddyrose-light/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-eddyrose-gold/10 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-eddyrose-gold/5 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8">
              <Sparkles size={14} className="text-eddyrose-gold" />
              <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Admissions 2025/2026</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Give Your Child <br />
              <span className="text-eddyrose-gold italic font-serif">the Best Start</span> <br />
              in Life.
            </h2>
            <p className="text-white/50 text-lg max-w-sm mb-10 leading-relaxed">
              Join a community where academic excellence and character are nurtured every day.
            </p>
          </div>

          <div className="relative z-10">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-eddyrose-deep rounded-2xl font-black text-sm hover:bg-eddyrose-gold hover:text-white transition-all duration-300 shadow-xl active:scale-95"
            >
              Start Application
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* 2. Stat Box (Small) */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[2rem] p-8 border border-zinc-100 flex flex-col justify-center items-center text-center group hover:border-eddyrose-gold/30 transition-all duration-300"
        >
          <div className="w-14 h-14 bg-eddyrose-gold/10 rounded-2xl flex items-center justify-center text-eddyrose-gold mb-4 group-hover:scale-110 transition-transform">
            <Award size={28} />
          </div>
          <div className="text-3xl font-black text-eddyrose-deep mb-1">98%</div>
          <div className="text-sm font-medium text-zinc-400">Parent Satisfaction</div>
        </motion.div>

        {/* 3. Image Box Placeholder 1 */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-200 rounded-[2rem] overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-eddyrose-deep/20 flex items-center justify-center">
             <span className="text-white/50 font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">School Life</span>
          </div>
          {/* Image placeholder - User will add src later */}
          <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 animate-pulse" />
        </motion.div>

        {/* 4. Feature Box (Horizontal Span) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 bg-eddyrose-light rounded-[2rem] p-8 flex items-center gap-6 relative overflow-hidden group border border-white/5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
             <BookOpen size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Modern British-Nigerian Curriculum</h3>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              A balanced approach to global learning and national cultural identity.
            </p>
          </div>
        </motion.div>

        {/* 5. Image Box Placeholder 2 */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-200 rounded-[2rem] overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-eddyrose-deep/20 flex items-center justify-center">
             <span className="text-white/50 font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Our Campus</span>
          </div>
          {/* Image placeholder - User will add src later */}
          <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 animate-pulse" />
        </motion.div>

        {/* 6. Info/Contact Box */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[2rem] p-8 border border-zinc-100 flex flex-col justify-center group hover:bg-eddyrose-deep transition-all duration-500"
        >
          <h4 className="text-lg font-bold text-eddyrose-deep mb-2 group-hover:text-white transition-colors">Questions?</h4>
          <p className="text-sm text-zinc-500 mb-6 group-hover:text-white/50 transition-colors">Speak with our admissions team today about your child's journey.</p>
          <Link href="/contact" className="text-eddyrose-gold font-bold flex items-center gap-2 group-hover:text-white">
            Get in touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}
