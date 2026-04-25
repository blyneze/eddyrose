import { Metadata } from "next";
import { Compass, Target, Heart, BookOpen, Quote } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Eddyrose International Academy",
  description: "Learn about the philosophy, vision, and mission of Eddyrose International Academy in Uyo, providing a balanced British and Nigerian curriculum.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-16 md:pt-24 pb-20 md:pb-32 bg-eddyrose-deep overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Nurturing Tomorrow&apos;s Leaders Today
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Eddyrose International Academy is a premier educational institution in Uyo, dedicated to providing a transformative learning experience for children in their foundational years.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              {/* Using a placeholder unsplash image representing a quality school environment */}
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Students learning together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-eddyrose-deep/10" />
            </div>
            
            <div>
              <div id="team" className="inline-flex items-center gap-2 rounded-full border border-eddyrose-gold/30 bg-eddyrose-gold/10 px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-eddyrose-gold" />
                <span className="text-xs font-bold text-eddyrose-gold tracking-widest uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                A Home for Curiosity and Excellence
              </h2>
              <div className="space-y-6 text-zinc-600 leading-relaxed text-lg">
                <p>
                  Located at No. 3 IBB Avenue, Uyo, Akwa Ibom State, Eddyrose International Academy was founded with a singular purpose: to deliver an exceptional educational foundation that respects the individuality of every child.
                </p>
                <p>
                  We believe that the early years are the most critical period in human development. Our programs—spanning Crèche, Nursery, and Primary levels—are carefully structured to give children the tools they need to navigate an ever-changing world with confidence, empathy, and a strong sense of identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="mission" className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
              <div className="w-14 h-14 bg-eddyrose-light/10 text-eddyrose-light flex items-center justify-center rounded-2xl mb-8">
                <Compass size={28} />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Our Vision</h3>
              <p className="text-zinc-600 leading-relaxed text-lg">
                To be the leading nursery and primary institution in Nigeria, universally recognized for nurturing well-rounded, innovative, and disciplined children who will positively impact the global community.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
              <div className="w-14 h-14 bg-eddyrose-gold/10 text-eddyrose-gold flex items-center justify-center rounded-2xl mb-8">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Our Mission</h3>
              <p className="text-zinc-600 leading-relaxed text-lg">
                To provide a safe, stimulating, and inclusive learning environment that blends the best of Nigerian and British curricula, delivered by passionate educators committed to drawing out the unique potential of every child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach to Learning */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              Our Educational Philosophy
            </h2>
            <p className="text-zinc-600 leading-relaxed text-lg">
              Education at Eddyrose goes beyond rote memorization. We are dedicated to holistic development—ensuring our students grow academically, socially, and emotionally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Child-Centered",
                desc: "Every child learns differently. We tailor our teaching methodologies to suit visual, auditory, and kinesthetic learners.",
                icon: Heart,
                color: "text-eddyrose-light",
                bg: "bg-eddyrose-light/10"
              },
              {
                title: "Global Standards",
                desc: "By integrating British frameworks for phonics, literacy, and numeracy with deep Nigerian cultural contexts, we produce globally competent citizens.",
                icon: BookOpen,
                color: "text-eddyrose-gold",
                bg: "bg-eddyrose-gold/10"
              },
              {
                title: "Character First",
                desc: "Academic brilliance must be matched with strong moral character. Discipline, respect, and integrity form the core of our daily operations.",
                icon: Quote,
                color: "text-eddyrose-deep",
                bg: "bg-eddyrose-deep/10"
              }
            ].map((value, i) => (
               <div key={i} className="text-center flex flex-col items-center">
                 <div className={`w-20 h-20 ${value.bg} ${value.color} flex items-center justify-center rounded-[2rem] mb-6 rotate-3 hover:rotate-0 transition-transform`}>
                   <value.icon size={36} className="-rotate-3 group-hover:rotate-0 transition-transform" />
                 </div>
                 <h4 className="text-xl font-bold text-zinc-900 mb-4">{value.title}</h4>
                 <p className="text-zinc-600 leading-relaxed">{value.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
