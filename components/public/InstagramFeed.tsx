"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const INSTA_POSTS = [
  {
    id: 1,
    src: "/insta-1.png",
    caption:
      "Back where we belong! Learning to thread, tie a knot, and sew the first letter of our names in STEAM today.",
  },
  {
    id: 2,
    src: "/insta-2.png",
    caption:
      "Story time with Dr. Maria Lee. The library is buzzing with excitement as we dive into 'The Lost Lamb'.",
  },
  {
    id: 3,
    src: "/insta-3.png",
    caption:
      "Capturing the pure joy of discovery. Our students are natural explorers!",
  },
  {
    id: 4,
    src: "/insta-4.png",
    caption:
      "Art and Design afternoon. Expressing ourselves through color and creativity.",
  },
  {
    id: 5,
    src: "/insta-5.png",
    caption:
      "Our assembly mornings are filled with song, community, and character building.",
  },
  {
    id: 6,
    src: "/insta-6.png",
    caption:
      "Outdoor play is just as important as indoor learning. Building social skills in the fresh air.",
  },
  {
    id: 7,
    src: "/insta-6.png",
    caption:
      "Outdoor play is just as important as indoor learning. Building social skills in the fresh air.",
  },
  {
    id: 8,
    src: "/insta-6.png",
    caption:
      "Outdoor play is just as important as indoor learning. Building social skills in the fresh air.",
  },
];

export default function InstagramFeed() {
  return (
    <section className="bg- py-12 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between gap-4 md:gap-6 mb-12">
          <div className="flex flex-col gap-1 md:gap-2">
            <h2 className="text-lg md:text-5xl font-black text-eddyrose-deep">
              #BelongAtEddyrose
            </h2>
            <p className="text-zinc-500 text-xs md:text-lg font-medium text-left md:text-center md:text-left">
              See daily life at Eddyrose Academy on Instagram
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-eddyrose-deep/30 text-eddyrose-deep px-3 md:px-6 py-2 rounded-lg font-bold text-[10px] md:text-sm hover:bg-eddyrose-deep hover:text-white transition-all flex items-center gap-2"
          >
            @EDDYROSEACADEMY <span className="hidden md:flex text-lg">→</span>
          </a>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {INSTA_POSTS.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0.01, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0 }}
              style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <Image
                src={post.src}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-eddyrose-deep/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <InstagramIcon className="text-white mb-4 w-8 h-8" />
                <span className="text-white font-bold text-xs mb-3 tracking-widest">
                  @EDDYROSEACADEMY
                </span>
                <p className="text-white/80 text-xs leading-relaxed line-clamp-4">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
