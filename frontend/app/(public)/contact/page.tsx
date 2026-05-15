import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Send, ShieldQuestion } from "lucide-react";
import ContactForm from "@/components/public/ContactForm";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Contact Us | Eddyrose International Academy",
  description: "Get in touch with Eddyrose International Academy for admissions, enquiries, or to schedule a school tour at our Uyo campus.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-16 md:pt-24 pb-20 md:pb-32 bg-eddyrose-deep overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-hero.png"
            alt="Contact Us"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eddyrose-deep via-eddyrose-deep/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you have a question about admissions, want to schedule a visit, or simply need more information, our team is here to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 md:gap-24">
            
            {/* Left: Contact Info */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-zinc-900 mb-8">Get in Touch</h2>
              
              <div className="flex flex-col gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-eddyrose-gold/10 text-eddyrose-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">Our Campus</h3>
                    <p className="text-zinc-600 leading-relaxed max-w-[250px]">
                      No. 3 IBB Avenue, <br/>
                      Uyo, Akwa Ibom State, <br/>
                      Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-eddyrose-light/10 text-eddyrose-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">Call Us</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      +234 704 576 2841
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-eddyrose-deep/10 text-eddyrose-deep rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">Email Us</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      eddyroseintlacademy@gmail.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">School Hours</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      Monday - Friday <br/>
                      7:30 AM - 3:00 PM <br/>
                      <span className="text-sm text-zinc-400">Closed on Weekends & Public Holidays</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Optional embedded map placeholder */}
              <div className="w-full h-48 bg-zinc-100 rounded-3xl border border-zinc-200 flex items-center justify-center relative overflow-hidden">
                <MapPin className="text-zinc-300 absolute" size={64} />
                <div className="relative z-10 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg font-medium text-zinc-600 text-sm shadow-sm">
                  Map Integration Placeholder
                </div>
              </div>
            </div>
            
            {/* Right: Contact Form */}
            <ContactForm />

            
          </div>
        </div>
      </section>
      
      {/* Help Banner */}
      <section className="bg-eddyrose-gold py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-eddyrose-deep">
               <ShieldQuestion size={28} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-eddyrose-deep">Have Admission Questions?</h3>
               <p className="text-eddyrose-deep/80 font-medium">Read through our frequently asked questions.</p>
             </div>
          </div>
          <a href="/admissions#faq" className="inline-flex items-center justify-center px-6 py-3 bg-white text-eddyrose-deep font-bold rounded-full shadow-sm hover:shadow-md transition-shadow">
             Read FAQs
          </a>
        </div>
      </section>
    </>
  );
}
