"use client";

import { useState, useRef } from "react";
import { Save, User, Camera, Calendar, Phone, MapPin, BookOpen, Heart, Briefcase, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import { calculateAge } from "@/lib/utils/age";
import Link from "next/link";

interface ClassOption {
  id: string;
  level: string;
  name: string;
}

interface StudentFormProps {
  initialData?: any;
  classes: ClassOption[];
  action: (formData: FormData) => Promise<any>;
  buttonText?: string;
}

export default function StudentForm({ initialData, classes, action, buttonText = "Save Student" }: StudentFormProps) {
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const [dob, setDob] = useState<string>(initialData?.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; name: string; generatedPassword?: string } | null>(null);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await action(formData);
      
      if (result?.generatedPassword) {
        setSuccessData(result);
      } else {
        // If it's an update, just go back
        window.location.href = "/portal/students";
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (successData?.generatedPassword) {
      navigator.clipboard.writeText(successData.generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const ageDisplay = calculateAge(dob);

  if (successData) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-8">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Student Enrolled Successfully!</h2>
          <p className="text-zinc-500 text-sm mt-1">Default credentials have been generated for <b>{successData.name}</b>.</p>
        </div>

        <div className="w-full max-w-sm bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Temporary Password</span>
            <div className="relative group">
              <div className="bg-white border border-zinc-200 rounded-xl px-4 py-4 font-mono text-xl font-bold tracking-wider text-eddyrose-deep text-center shadow-sm">
                {successData.generatedPassword}
              </div>
              <button 
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-lg transition-all"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed italic">
            Please copy and share this password with the student/parent immediately. <br/>
            <b>It will not be shown again.</b>
          </p>
        </div>

        <Link 
          href="/portal/students"
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-xl shadow-eddyrose-deep/20"
        >
          Go to Student List <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-xs font-bold flex items-center gap-3">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">!</div>
          {error}
        </div>
      )}

      {/* 1. Profile Image Section */}
      <div className="flex flex-col items-center justify-center space-y-4 pb-6 border-b border-zinc-100">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-zinc-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-zinc-300" />
            )}
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 bg-eddyrose-deep text-white rounded-full shadow-lg hover:bg-eddyrose-light transition-all active:scale-95 disabled:opacity-50"
          >
            <Camera size={18} />
          </button>
        </div>
        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Student Profile Picture</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <input type="hidden" name="image" value={preview || ""} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Student Name (Required) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <User size={14} className="text-zinc-400" /> Student Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            defaultValue={initialData?.name}
            type="text"
            required
            disabled={loading}
            placeholder="e.g. Timmy Smith"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        {/* 2. Class (Dropdown) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <BookOpen size={14} className="text-zinc-400" /> Current Class
          </label>
          <div className="relative group">
            <select
              name="classId"
              disabled={loading}
              defaultValue={initialData?.enrollments?.[0]?.classId || ""}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium appearance-none cursor-pointer group-hover:border-eddyrose-light disabled:opacity-50"
            >
              <option value="">Not Assigned Yet</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.level} — {c.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover:text-eddyrose-light transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        {/* 4. Registration Number (Required) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <Save size={14} className="text-zinc-400" /> Registration Number <span className="text-red-500">*</span>
          </label>
          <input
            name="registrationNumber"
            defaultValue={initialData?.registrationNumber}
            type="text"
            required
            disabled={loading}
            placeholder="e.g. ERA/2024/001"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        {/* 5. Date of Birth */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <Calendar size={14} className="text-zinc-400" /> Date of Birth
          </label>
          <div className="relative">
            <input
              name="dateOfBirth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              disabled={loading}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
            />
            {ageDisplay && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black bg-eddyrose-gold/20 text-eddyrose-deep px-2 py-1 rounded-full uppercase">
                {ageDisplay}
              </span>
            )}
          </div>
        </div>

        {/* 6. Gender (Required) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <span className="text-zinc-400 text-[10px]">👤</span> Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["Male", "Female"].map((option) => (
              <label key={option} className="flex-1 flex items-center justify-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 cursor-pointer hover:border-eddyrose-light transition-all has-[:checked]:bg-eddyrose-light/5 has-[:checked]:border-eddyrose-light has-[:checked]:text-eddyrose-deep">
                <input 
                  type="radio" 
                  name="sex" 
                  value={option} 
                  required 
                  defaultChecked={initialData?.sex === option}
                  className="hidden" 
                />
                <span className="text-sm font-bold">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 7. Parent/Guardian Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <Heart size={14} className="text-zinc-400" /> Parent/Guardian Name
          </label>
          <input
            name="parentName"
            defaultValue={initialData?.parentName}
            type="text"
            disabled={loading}
            placeholder="e.g. Mr. & Mrs. Smith"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        {/* 7. Religion */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <span className="text-zinc-400 text-[10px]">⛪</span> Religion
          </label>
          <input
            name="religion"
            defaultValue={initialData?.religion}
            type="text"
            disabled={loading}
            placeholder="e.g. Christian"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        {/* 8. Contact Number */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <Phone size={14} className="text-zinc-400" /> Contact Number
          </label>
          <input
            name="contactNumber"
            defaultValue={initialData?.contactNumber}
            type="tel"
            disabled={loading}
            placeholder="e.g. +234 800 000 0000"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        {/* 9. Address */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <MapPin size={14} className="text-zinc-400" /> Residential Address
          </label>
          <textarea
            name="address"
            defaultValue={initialData?.address}
            rows={2}
            disabled={loading}
            placeholder="e.g. 123 School Lane, City Center"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium resize-none disabled:opacity-50"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-xl shadow-eddyrose-deep/20 active:scale-[0.95] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <span className="animate-spin">🌀</span> : <Save size={18} />}
          {loading ? "Processing..." : buttonText}
        </button>
      </div>
    </form>
  );
}

