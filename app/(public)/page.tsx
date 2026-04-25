import HeroSlider from "@/components/public/HeroSlider";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Heart,
  Globe,
  Palette,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

export default function PublicHome() {
  return (
    <>
      <HeroSlider />

      {/* Why Choose Us */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-eddyrose-deep mb-4">
              Why Parents Choose Us
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              We provide an environment where children feel secure and motivated
              to reach their highest potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-eddyrose-light/10 text-eddyrose-light rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                Modern Curriculum
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Early childhood education aligned with standard frameworks,
                pushing students towards academic excellence from day one.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-eddyrose-gold/10 text-eddyrose-gold rounded-xl flex items-center justify-center mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                Passionate Educators
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Highly qualified teachers specializing in nursery and primary
                levels, deeply committed to nurturing young minds.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-eddyrose-deep/10 text-eddyrose-deep rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                Community Focus
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                A strong bond between parents, teachers, and students to build a
                trusting, family-like school environment in Uyo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Snapshot */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-eddyrose-deep mb-6">
                A Balanced, Global Curriculum
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-6">
                At Eddyrose International Academy, we blend the analytical depth of the British framework with the rich, contextual relevance of the Nigerian curriculum. This dual approach ensures your child gets the best of both worlds.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Strong foundation in Phonics and Numeracy",
                  "Focus on critical thinking and problem-solving",
                  "Rich Nigerian cultural and historical awareness",
                  "Preparation for global opportunities and standard examinations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-eddyrose-gold/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-eddyrose-gold" />
                    </div>
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/academics"
                className="inline-flex items-center gap-2 text-eddyrose-light font-bold hover:text-eddyrose-deep transition-colors"
              >
                Explore our Curriculum
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
               <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 flex flex-col items-center justify-center text-center aspect-square shadow-sm">
                 <Globe className="text-eddyrose-light mb-4" size={32} />
                 <h4 className="font-bold text-zinc-900 mb-2">British Standard</h4>
                 <p className="text-sm text-zinc-500">Global frameworks & phonics</p>
               </div>
               <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 flex flex-col items-center justify-center text-center aspect-square shadow-sm translate-y-8">
                 <BookOpen className="text-eddyrose-gold mb-4" size={32} />
                 <h4 className="font-bold text-zinc-900 mb-2">Nigerian Context</h4>
                 <p className="text-sm text-zinc-500">Cultural & national identity</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Stages */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-eddyrose-deep mb-4">
              Learning Stages
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              We provide a continuous, tailored educational journey from early childhood through the critical primary years.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Crèche & Pre-Nursery",
                desc: "A warm, safe, and stimulating environment designed for discovery, gross motor development, and joyful early learning.",
                icon: Heart,
                color: "text-eddyrose-light",
                bg: "bg-eddyrose-light/10",
              },
              {
                title: "Nursery",
                desc: "Building a strong foundation in phonics, early numeracy, and social skills through play-based and structured methods.",
                icon: Palette,
                color: "text-eddyrose-gold",
                bg: "bg-eddyrose-gold/10",
              },
              {
                title: "Primary",
                desc: "Developing independent thinkers with a rigorous academic core, focusing on literacy, STEM, and character building.",
                icon: Lightbulb,
                color: "text-eddyrose-deep",
                bg: "bg-eddyrose-deep/10",
              },
            ].map((stage) => (
              <div
                key={stage.title}
                className="group relative bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <stage.icon size={80} />
                </div>
                <div className={`w-14 h-14 rounded-2xl ${stage.bg} ${stage.color} flex items-center justify-center mb-6`}>
                  <stage.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{stage.title}</h3>
                <p className="text-zinc-600 leading-relaxed mb-8">{stage.desc}</p>
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-eddyrose-light transition-colors"
                >
                  Admissions Open
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
