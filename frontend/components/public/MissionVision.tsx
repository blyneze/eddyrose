"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Zap, Users, Heart } from "lucide-react";

const VALUES = [
  {
    title: "Excellence",
    desc: "Striving for the highest standards in everything we do.",
    icon: CheckCircle2,
  },
  {
    title: "Integrity",
    desc: "Building trust through honesty and strong moral principles.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    desc: "Embracing new ideas to prepare students for a changing world.",
    icon: Zap,
  },
  {
    title: "Community",
    desc: "Nurturing a supportive environment for students and families.",
    icon: Users,
  },
  {
    title: "Character",
    desc: "Developing respectful, responsible, and resilient individuals.",
    icon: Heart,
  },
];

export default function MissionVision() {
  return (
    <section className="w-full">
      {/* ── Mission & Vision Block ────────────────────────── */}
      <div className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 md:gap-24">
          {/* Left: Image with Organic Mask */}
          <motion.div
            initial={{ opacity: 1, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            transition={{ duration: 1 }}
            className="relative h-[400px] md:h-[600px] w-full"
          >
            <div 
              className="absolute inset-0 bg-zinc-100 overflow-hidden"
              style={{
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", // Organic shape
              }}
            >
              <Image
                src="/mission-img.png"
                alt="Student learning"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="flex flex-col gap-8">
            <motion.div
            initial={{ opacity: 1, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-eddyrose-deep leading-tight mb-6">
                DISCOVER YOUR CHILD'S <br />
                <span className="text-eddyrose-gold">POTENTIAL</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-eddyrose-deep mb-2 flex items-center gap-2">
                    <span className="w-8 h-px bg-eddyrose-gold" /> Our Mission
                  </h3>
                  <p className="text-zinc-600 text-lg leading-relaxed">
                    To provide a balanced, high-quality education that blends academic rigor with character development, empowering every child to become a visionary leader and a lifelong learner.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-eddyrose-deep mb-2 flex items-center gap-2">
                    <span className="w-8 h-px bg-eddyrose-gold" /> Our Vision
                  </h3>
                  <p className="text-zinc-600 text-lg leading-relaxed">
                    To be the leading center of academic excellence in Uyo and beyond, nurturing globally competitive citizens who act with integrity and purpose.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Core Values Block ────────────────────────── */}
      <div className="bg-eddyrose-deep py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 md:gap-24">
          {/* Left: Text & Values List */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <motion.div
            initial={{ opacity: 1, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                A FOUNDATION OF <br />
                <span className="text-eddyrose-gold">EXCELLENCE</span>
              </h2>
              
              <div className="grid gap-6">
                {VALUES.map((val, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 1, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <val.icon className="text-eddyrose-gold" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{val.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{val.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Image with Organic Mask */}
          <motion.div
            initial={{ opacity: 1, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            transition={{ duration: 1 }}
            className="relative h-[400px] md:h-[600px] w-full order-1 lg:order-2"
          >
            <div 
              className="absolute inset-0 bg-white/5 overflow-hidden"
              style={{
                borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%", // Inverse organic shape
              }}
            >
              <Image
                src="/values-img.png"
                alt="Students collaborating"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
