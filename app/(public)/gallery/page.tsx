import { Metadata } from "next";
import { Camera, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "School Gallery | Eddyrose International Academy",
  description: "Explore life at Eddyrose International Academy through our gallery of events, classroom activities, and school facilities.",
};

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Academic Excellence",
    category: "Learning",
  },
  {
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Creative Arts Session",
    category: "Co-Curricular",
  },
  {
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Collaborative Learning",
    category: "Classroom",
  },
  {
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "School Event Highlight",
    category: "Events",
  },
  {
    url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Sports Day",
    category: "Events",
  },
  {
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Reading Corner",
    category: "Facilities",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-16 md:pt-24 pb-20 bg-eddyrose-deep overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery-hero.png"
            alt="Gallery"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eddyrose-deep via-eddyrose-deep/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Our School Gallery
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A visual glimpse into the daily life, activities, and vibrant atmosphere at Eddyrose International Academy.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {["All", "Learning", "Classroom", "Events", "Facilities"].map((cat) => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full border border-zinc-200 text-zinc-600 font-medium hover:bg-eddyrose-deep hover:text-white hover:border-eddyrose-deep transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl bg-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <span className="text-xs font-bold text-eddyrose-gold uppercase tracking-widest mb-2">
                    {img.category}
                  </span>
                  <h3 className="text-xl font-bold">{img.caption}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center bg-zinc-50 rounded-[3rem] p-12 border border-zinc-100">
             <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-eddyrose-deep">
               <Camera size={28} />
             </div>
             <h3 className="text-2xl font-bold text-zinc-900 mb-4">Capturing Moments</h3>
             <p className="text-zinc-500 max-w-xl mx-auto mb-8">
               We regularly update our gallery with new photos from competitions, academic milestones, and school celebrations. Stay tuned for more!
             </p>
          </div>
        </div>
      </section>
    </>
  );
}
