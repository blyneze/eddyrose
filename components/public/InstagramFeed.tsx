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
    src: "/i1.jpg",
    url: "https://www.instagram.com/reel/DXoNzKhjuGL/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
    caption:
      "We are raising balanced children 😌, Spiritually grounded, morally sound, and academically excellent ❤️",
  },
  {
    id: 2,
    src: "/i2.jpg",
    url: "https://www.instagram.com/reel/DXguTOMkTjC/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
    caption:
      "We’re a special school because we go all out to give our kids what we didn’t have… and even better",
  },
  {
    id: 3,
    src: "/i3.jpg",
    url: "https://www.instagram.com/reel/DVghjeeiBRO/",
    caption: `A tie?! That meant only one thing… a tie-breaker! 🔥

Team Ivory stepped up for the first-to-get-it-right challenge, and the atmosphere was filled with suspense.
Quick thinking, confidence, and brilliant young minds on display!`,
  },
  {
    id: 4,
    src: "/i4.jpg",
    url: "https://www.instagram.com/reel/DVa6hk-iPno/",
    caption: `Our kids stepped into the spotlight like they owned it 🔥✨
Meet our contestants!`,
  },
];

export default function InstagramFeed() {
  return (
    <section className="bg-white py-16 px-6 md:px-[5%]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3 mb-10">
          <div className="flex flex-col gap-1">
            <motion.span
              initial={{ opacity: 1, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-eddyrose-gold font-bold text-xs tracking-widest uppercase mb-1"
            >
              @EDDYROSEACADEMY
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-black text-eddyrose-deep tracking-tight">
              #BelongAtEddyrose
            </h2>
            <p className="text-zinc-500 text-sm md:text-base font-medium max-w-lg">
              Follow our journey of growth and discovery. See daily life at
              Eddyrose Academy on Instagram.
            </p>
          </div>

          <a
            href="https://www.instagram.com/eddyroseacademy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-eddyrose-deep text-white rounded-[0.7rem] font-bold text-xs tracking-widest hover:bg-eddyrose-gold transition-colors duration-300"
          >
            FOLLOW US
          </a>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
          {INSTA_POSTS.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden group rounded-xl md:rounded-2xl shadow-sm border border-zinc-100"
            >
              <Image
                src={post.src}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-eddyrose-deep/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                <InstagramIcon className="text-white mb-3 w-6 h-6 md:w-8 md:h-8" />
                <p className="text-white/90 text-[10px] md:text-xs leading-relaxed line-clamp-4 md:line-clamp-6 font-medium">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
