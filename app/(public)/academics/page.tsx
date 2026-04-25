import { Metadata } from "next";
import { BookOpen, Palette, Music, Award, Trophy, Shield, BrainCircuit } from "lucide-react";

export const metadata: Metadata = {
  title: "Academics & Co-Curricular | Eddyrose International Academy",
  description: "Explore the comprehensive academic programs and vibrant co-curricular activities at Eddyrose International Academy.",
};

export default function AcademicsPage() {
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
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Learning Beyond Boundaries
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            We offer a rigorous academic core seamlessly integrated with dynamic co-curricular programs, ensuring every child develops both intellectually and physically.
          </p>
        </div>
      </section>

      {/* Curriculum Approach */}
      <section className="py-20 md:py-28 bg-white" id="curriculum">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-flex items-center gap-2 rounded-full border border-eddyrose-light/20 bg-eddyrose-light/5 px-4 py-1.5 mb-6">
                 <span className="w-1.5 h-1.5 rounded-full bg-eddyrose-light" />
                 <span className="text-xs font-bold text-eddyrose-light tracking-widest uppercase">
                   Core Curriculum
                 </span>
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                 A Balanced Academic Foundation
               </h2>
               <div className="space-y-4 text-zinc-600 leading-relaxed text-lg mb-8">
                 <p>
                   At Eddyrose, our academic programs are built strictly on an integrated blend of the Nigerian and British curricular frameworks. 
                 </p>
                 <p>
                   Our teachers utilize modern pedagogical techniques to ensure that Numeracy, Literacy (Phonics), Sciences, and Civic Education are not just memorized, but deeply understood.
                 </p>
               </div>
               <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                 {[
                   { text: "Early Phonics Mastery", icon: BookOpen },
                   { text: "STEM Fundamentals", icon: BrainCircuit },
                   { text: "Civic & Moral Education", icon: Shield },
                   { text: "Continuous Assessment", icon: Trophy, id: "results" },
                 ].map((item, i) => (
                   <li key={i} id={item.id} className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0">
                       <item.icon size={18} className="text-eddyrose-gold" />
                     </div>
                     <span className="text-zinc-800 font-medium">{item.text}</span>
                   </li>
                 ))}
               </ul>
               <div id="library" className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-sm text-zinc-500 italic">
                 "Our extensive school library is the heart of our research-led learning approach."
               </div>
            </div>
            <div className="grid gap-6">
              <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                  <BrainCircuit size={64}/>
                </div>
                <h3 className="text-xl font-bold text-eddyrose-deep mb-3">Critical Thinking</h3>
                <p className="text-zinc-600">Students are challenged to solve real-world problems from an early age, avoiding rote learning.</p>
              </div>
              <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 shadow-sm relative overflow-hidden group ml-0 md:ml-12">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                  <BookOpen size={64}/>
                </div>
                <h3 className="text-xl font-bold text-eddyrose-deep mb-3">Extensive Reading</h3>
                <p className="text-zinc-600">Our library culture ensures that every child develops a lifelong love for reading and comprehension.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Curricular & Extra-curricular */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100" id="extra">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
               Co-Curricular Activities
             </h2>
             <p className="text-zinc-600 leading-relaxed text-lg">
               Education is incomplete without the arts, sports, and collaborative clubs. We offer a vibrant array of activities to discover and polish every child&apos;s hidden talents.
             </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: "Sports & Athletics",
                desc: "Promoting physical fitness, teamwork, and healthy competition through various sporting activities.",
                icon: Award,
                color: "eddyrose-light"
              },
              {
                title: "Creative Arts",
                desc: "Unleashing imagination with drawing, painting, crafts, and interactive visual art exhibitions.",
                icon: Palette,
                color: "eddyrose-gold"
              },
              {
                title: "Music & Drama",
                desc: "Building confidence and vocal expression through stage plays, instruments, and choir participation.",
                icon: Music,
                color: "eddyrose-deep"
              },
              {
                title: "Clubs & Societies",
                desc: "From spelling bees to debate and STEM clubs, we foster intellectual curiosity outside the classroom.",
                icon: Shield,
                color: "purple-600"
              }
            ].map((activity, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 text-${activity.color} flex items-center justify-center mb-6`}>
                  <activity.icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{activity.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
