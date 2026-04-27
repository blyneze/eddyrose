"use client";

import { useState, useTransition } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { submitContactFormAction } from "@/app/actions/contact";

const EASE = [0.22, 1, 0.36, 1] as const;

const INFO_ITEMS = [
  {
    icon: Phone,
    label: "Call Admissions",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "admissions@eddyroseacademy.com",
    href: "mailto:admissions@eddyroseacademy.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Uyo, Akwa Ibom State, Nigeria",
    href: "#",
  },
  {
    icon: CalendarDays,
    label: "Office Hours",
    value: "Mon – Fri: 8:00am – 4:00pm",
    href: "#",
  },
];

export default function AdmissionsInquiry() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setState(null);
    startTransition(async () => {
      const result = await submitContactFormAction(formData);
      setState(result);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0.01, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section className="relative w-full bg-white overflow-hidden border-t border-zinc-100">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-eddyrose-deep/[0.03] blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-eddyrose-gold/[0.05] blur-[80px]" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        animate={inView ? "show" : "hidden"}
        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-eddyrose-gold mb-4">
            <CalendarDays size={13} />
            Admissions &amp; Enquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-eddyrose-deep leading-[1.1] tracking-tight mb-4">
            Let&apos;s Talk About{" "}
            <span className="text-eddyrose-light italic font-serif">
              Your Child
            </span>
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Schedule a call with our admissions team, book a campus tour, or
            send us any questions you have. We respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* ── Left Column: Contact Info ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            {/* Info cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {INFO_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-4 p-5 bg-zinc-50 border border-zinc-100 rounded-2xl hover:border-eddyrose-gold/40 hover:bg-eddyrose-deep hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-eddyrose-deep/10 text-eddyrose-deep group-hover:bg-white/10 group-hover:text-eddyrose-gold flex items-center justify-center transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 group-hover:text-white/50 uppercase tracking-wider mb-0.5 transition-colors duration-300">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-zinc-800 group-hover:text-white transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Reassurance blurb */}
            <div className="mt-2 p-6 bg-eddyrose-deep rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-eddyrose-gold/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <MessageSquare
                size={28}
                className="text-eddyrose-gold mb-3 relative z-10"
              />
              <h4 className="text-white font-bold text-base mb-2 relative z-10">
                We&apos;re here to help
              </h4>
              <p className="text-white/55 text-sm leading-relaxed relative z-10">
                Our friendly admissions team is happy to answer any questions
                about our programmes, fees, or how to apply. No question is too
                small.
              </p>
            </div>
          </motion.div>

          {/* ── Right Column: Form ── */}
          <motion.div variants={itemVariants}>
            {state?.success ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-12 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-zinc-500 leading-relaxed max-w-xs mx-auto">
                    {state.message ??
                      "Thank you! Our admissions team will be in touch with you shortly."}
                  </p>
                </div>
                <button
                  onClick={() => setState(null)}
                  className="text-emerald-600 font-bold hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-zinc-50 border border-zinc-100 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">
                    Send an Enquiry
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Fill in the details below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                {state?.error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    {state.error}
                  </div>
                )}

                <form action={handleSubmit} className="flex flex-col gap-5">
                  {/* Name row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="ai-firstName"
                        className="text-xs font-bold text-zinc-600 ml-1 uppercase tracking-wider"
                      >
                        First Name *
                      </label>
                      <input
                        required
                        name="firstName"
                        type="text"
                        id="ai-firstName"
                        disabled={isPending}
                        placeholder="Jane"
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/40 focus:border-eddyrose-gold transition-all disabled:opacity-50 placeholder:text-zinc-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="ai-lastName"
                        className="text-xs font-bold text-zinc-600 ml-1 uppercase tracking-wider"
                      >
                        Last Name *
                      </label>
                      <input
                        required
                        name="lastName"
                        type="text"
                        id="ai-lastName"
                        disabled={isPending}
                        placeholder="Doe"
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/40 focus:border-eddyrose-gold transition-all disabled:opacity-50 placeholder:text-zinc-300"
                      />
                    </div>
                  </div>

                  {/* Contact row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="ai-email"
                        className="text-xs font-bold text-zinc-600 ml-1 uppercase tracking-wider"
                      >
                        Email Address *
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        id="ai-email"
                        disabled={isPending}
                        placeholder="jane@example.com"
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/40 focus:border-eddyrose-gold transition-all disabled:opacity-50 placeholder:text-zinc-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="ai-phone"
                        className="text-xs font-bold text-zinc-600 ml-1 uppercase tracking-wider"
                      >
                        Phone Number *
                      </label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        id="ai-phone"
                        disabled={isPending}
                        placeholder="+234 ..."
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/40 focus:border-eddyrose-gold transition-all disabled:opacity-50 placeholder:text-zinc-300"
                      />
                    </div>
                  </div>

                  {/* Enquiry type */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="ai-inquiryType"
                      className="text-xs font-bold text-zinc-600 ml-1 uppercase tracking-wider"
                    >
                      How Can We Help? *
                    </label>
                    <div className="relative">
                      <select
                        required
                        name="inquiryType"
                        id="ai-inquiryType"
                        disabled={isPending}
                        defaultValue=""
                        className="w-full appearance-none bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/40 focus:border-eddyrose-gold transition-all disabled:opacity-50 pr-10"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="admissions">
                          Apply for Admission
                        </option>
                        <option value="schedule-call">
                          Schedule a Call with Admissions
                        </option>
                        <option value="tour">Book a Campus Tour</option>
                        <option value="fees">Fees &amp; Scholarships</option>
                        <option value="general">General Enquiry</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Child's class / stage */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="ai-childStage"
                      className="text-xs font-bold text-zinc-600 ml-1 uppercase tracking-wider"
                    >
                      Child&apos;s Learning Stage
                    </label>
                    <div className="relative">
                      <select
                        name="childStage"
                        id="ai-childStage"
                        disabled={isPending}
                        defaultValue=""
                        className="w-full appearance-none bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/40 focus:border-eddyrose-gold transition-all disabled:opacity-50 pr-10"
                      >
                        <option value="">Not sure yet</option>
                        <option value="creche">Crèche / Pre-Nursery</option>
                        <option value="nursery">Nursery</option>
                        <option value="primary">Primary</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="ai-message"
                      className="text-xs font-bold text-zinc-600 ml-1 uppercase tracking-wider"
                    >
                      Your Message *
                    </label>
                    <textarea
                      required
                      name="message"
                      id="ai-message"
                      rows={4}
                      disabled={isPending}
                      placeholder="Tell us about your child, any questions you have, or the best time to call you…"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/40 focus:border-eddyrose-gold transition-all resize-none disabled:opacity-50 placeholder:text-zinc-300"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    id="admissions-inquiry-submit"
                    className="mt-2 group flex items-center justify-center gap-2.5 w-full bg-eddyrose-deep text-white font-black text-sm rounded-2xl px-6 py-4 hover:bg-eddyrose-light shadow-lg shadow-eddyrose-deep/20 hover:shadow-eddyrose-light/25 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        Sending…
                        <Loader2 size={17} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <Send
                          size={17}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-zinc-400">
                    We respect your privacy. Your details will never be shared
                    with third parties.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
