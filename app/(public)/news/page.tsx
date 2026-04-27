import { Metadata } from "next";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News & Events | Eddyrose International Academy",
  description:
    "Stay updated with the latest news, events, and announcements from Eddyrose International Academy.",
};

// ── Typed Mock Data (Ready for future CMS integration) ──
type NewsItem = {
  id: string;
  type: "news" | "event" | "announcement";
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  location?: string;
  time?: string;
};

const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    type: "announcement",
    title: "Admissions for 2025/2026 Academic Session Now Open",
    excerpt:
      "We are pleased to announce that admission forms for Crèche, Nursery, and Primary classes are now available. Secure your child's placement today.",
    date: "August 15, 2025",
    image:
      "https://scontent.fabb1-1.fna.fbcdn.net/v/t51.82787-15/538197060_17947926333001436_5643971634213088598_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeE8X3hlFGjn4x84Elr-tVp5NShZUNfckgc1KFlQ19ySB9YezUpwoQuju8H3XbOELYHcY9FK1PUH9xR7XkbZLPiN&_nc_ohc=OWjMnUsjFOYQ7kNvwFrdKU2&_nc_oc=AdpwZNRQObxAkFXW7uHHAaFeHHlM5T6LW3F-Q6-MzysGZQWYm0yC-ngyUSL8nS5X3mE&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=PjPDgvREKvUQxorH0qqTdw&_nc_ss=7b2a8&oh=00_Af1ZPNuiRj94VjnEbiS990VrcT-0YavAKHqHnIL-0lKoCA&oe=69F55502",
  },
  {
    id: "2",
    type: "event",
    title: "Annual Inter-House Sports Competition",
    excerpt:
      "Join us for a day of thrilling athletic displays, teamwork, and healthy competition as our students compete for the championship trophy.",
    date: "October 12, 2025",
    time: "09:00 AM",
    location: "School Sports Ground",
    image: "/inter.jpg",
  },
  {
    id: "3",
    type: "news",
    title: "Eddyrose Academy Launches New Phonics Hub",
    excerpt:
      "To further boost early childhood literacy, we've launched a dedicated Phonics and Reading Hub equipped with modern interactive learning tools.",
    date: "September 02, 2025",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    type: "event",
    title: "Cultural Day Celebration",
    excerpt:
      "A vibrant showcase of Nigerian heritage featuring traditional dances, food exhibitions, and history presentations by our primary students.",
    date: "November 20, 2025",
    time: "10:00 AM",
    location: "Main Assembly Hall",
    image:
      "https://scontent.fabb1-1.fna.fbcdn.net/v/t51.82787-15/573957712_17956321128001436_3985999845132351657_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeELlvmyPrw7_cyaSjRBGndO3zlQ_4Va5SLfOVD_hVrlIs5YTi4KXkVqGTm68JgDw4VElrVe1tBXYta0NOH8eb63&_nc_ohc=uMpERa6S7u4Q7kNvwGffXvZ&_nc_oc=Adr76uh5mDllV0Y1NE3qRJLTyWMYVi2XKkWIPdtEqhbqdG43J6JAzt6svmDFpUwpjsc&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=fful4LzRoDhwYFsfbgND1Q&_nc_ss=7b2a8&oh=00_Af2HLsJl4NrTJ-KGLWyTVGDxU8B625qUlygfrcaT7ALldQ&oe=69F55C43",
  },
];

export default function NewsPage() {
  const featured = NEWS_DATA[0];
  const gridItems = NEWS_DATA.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-16 md:pt-24 pb-20 md:pb-32 bg-eddyrose-deep overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/news-hero.png"
            alt="News & Events"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eddyrose-deep via-eddyrose-deep/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-3">
            News, Events & Updates
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Stay plugged into the Eddyrose community. Discover our latest
            stories, upcoming events, and important school announcements.
          </p>
        </div>
      </section>

      {/* Featured News/Event */}
      <section className="py-20 bg-zinc-50 border-b border-zinc-100 -mt-10 relative z-20 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-eddyrose-gold animate-pulse" />
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
              Featured Update
            </h2>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-lg transition-shadow group flex flex-col md:flex-row">
            <div className="md:w-1/2 relative min-h-[300px] overflow-hidden">
              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                <div
                  className={`w-2 h-2 rounded-full ${featured.type === "event" ? "bg-eddyrose-light" : "bg-eddyrose-gold"}`}
                />
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">
                  {featured.type}
                </span>
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium mb-4">
                <Calendar size={16} />
                {featured.date}
              </div>
              <h3 className="text-base md:text-3xl font-bold text-zinc-900 mb-4 leading-tight group-hover:text-eddyrose-light transition-colors">
                {featured.title}
              </h3>
              <p className="text-zinc-600 text-xs md:text-base leading-relaxed mb-8">
                {featured.excerpt}
              </p>
              <button className="inline-flex items-center gap-2 text-sm font-bold text-eddyrose-deep hover:text-eddyrose-light transition-colors w-fit">
                Read Full Story
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Updates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
              Recent News & Events
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-lg transition-all group duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-eddyrose-deep/5 flex items-center justify-center">
                      <Calendar className="text-eddyrose-deep/20" size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${item.type === "event" ? "bg-eddyrose-light" : "bg-eddyrose-gold"}`}
                    />
                    <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex flex-col gap-2 text-zinc-500 text-xs font-medium mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-eddyrose-gold" />
                      {item.date}
                    </div>
                    {item.type === "event" && (
                      <div className="flex items-center gap-3 mt-1">
                        {item.time && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-eddyrose-light" />
                            {item.time}
                          </span>
                        )}
                        {item.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-eddyrose-light" />
                            {item.location}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-eddyrose-light transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-1">
                    {item.excerpt}
                  </p>

                  <button className="flex items-center justify-between text-sm font-bold text-zinc-900 group-hover:text-eddyrose-light transition-colors w-full border-t border-zinc-200/60 pt-4">
                    Read More
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
