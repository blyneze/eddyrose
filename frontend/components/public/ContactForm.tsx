"use client"

import { useState, useTransition } from "react"
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactFormAction } from "@/app/actions/contact"

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<{ success?: boolean; message?: string; error?: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setState(null)
    startTransition(async () => {
      const result = await submitContactFormAction(formData)
      setState(result)
    })
  }

  if (state?.success) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-12 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-3">Message Sent!</h2>
          <p className="text-zinc-600 leading-relaxed max-w-xs mx-auto">
            {state.message}
          </p>
        </div>
        <button 
          onClick={() => setState(null)}
          className="text-emerald-600 font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-zinc-50 border border-zinc-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.03)] h-fit">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">Send a Message</h2>
        <p className="text-zinc-500">
          Fill out the form below and our admissions team will get back to you within 24 hours.
        </p>
      </div>
      
      {state?.error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={20} className="flex-shrink-0" />
          {state.error}
        </div>
      )}

      <form action={handleSubmit} className="flex flex-col gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-sm font-bold text-zinc-700 ml-1">First Name</label>
            <input 
              required
              name="firstName"
              type="text" 
              id="firstName"
              disabled={isPending}
              className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/50 focus:border-eddyrose-gold transition-all disabled:opacity-50"
              placeholder="e.g. Jane"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-sm font-bold text-zinc-700 ml-1">Last Name</label>
            <input 
              required
              name="lastName"
              type="text" 
              id="lastName"
              disabled={isPending}
              className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/50 focus:border-eddyrose-gold transition-all disabled:opacity-50"
              placeholder="e.g. Doe"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-zinc-700 ml-1">Email Address</label>
          <input 
            required
            name="email"
            type="email" 
            id="email"
            disabled={isPending}
            className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/50 focus:border-eddyrose-gold transition-all disabled:opacity-50"
            placeholder="jane@example.com"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-bold text-zinc-700 ml-1">Phone Number</label>
          <input 
            required
            name="phone"
            type="tel" 
            id="phone"
            disabled={isPending}
            className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/50 focus:border-eddyrose-gold transition-all disabled:opacity-50"
            placeholder="+234 ..."
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="inquiryType" className="text-sm font-bold text-zinc-700 ml-1">Type of Enquiry</label>
          <div className="relative">
            <select 
              required
              name="inquiryType"
              id="inquiryType"
              disabled={isPending}
              className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/50 focus:border-eddyrose-gold transition-all appearance-none disabled:opacity-50"
            >
              <option value="">Select an option</option>
              <option value="admissions">Admissions</option>
              <option value="tour">Schedule a Tour</option>
              <option value="general">General Enquiry</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
               {/* Custom arrow could go here */}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-bold text-zinc-700 ml-1">Message</label>
          <textarea 
            required
            name="message"
            id="message"
            rows={4}
            disabled={isPending}
            className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-eddyrose-gold/50 focus:border-eddyrose-gold transition-all resize-none disabled:opacity-50"
            placeholder="How can we help you?"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="mt-4 flex items-center justify-center gap-2 w-full bg-eddyrose-deep text-white font-bold rounded-2xl px-6 py-4 hover:bg-eddyrose-light shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              Sending Message...
              <Loader2 size={18} className="animate-spin" />
            </>
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
