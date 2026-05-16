"use client";

import { useState, useRef } from "react";
import { Save, User, Camera, Calendar, Phone, MapPin, BookOpen, Heart, Briefcase } from "lucide-react";
import { calculateAge } from "@/lib/utils/age";

interface ClassOption {
  id: string;
  level: string;
  name: string;
}

interface StudentFormProps {
  initialData?: any;
  classes: ClassOption[];
  action: (formData: FormData) => Promise<void>;
  buttonText?: string;
}

export default function StudentForm({ initialData, classes, action, buttonText = "Save Student" }: StudentFormProps) {
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const [dob, setDob] = useState<string>(initialData?.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : "");
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

  const ageDisplay = calculateAge(dob);

  return (
    <form action={action} className="space-y-8">
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
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 bg-eddyrose-deep text-white rounded-full shadow-lg hover:bg-eddyrose-light transition-all active:scale-95"
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
        {/* Hidden field to pass the image data if we were using base64, 
            but for now we'll just handle it as a normal file or just use a text field for the URL in a real app.
            Since this is a demo, I'll add a hidden text field that syncs with the preview. */}
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
            placeholder="e.g. Timmy Smith"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium"
          />
        </div>

        {/* 2. Class (Dropdown) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <BookOpen size={14} className="text-zinc-400" /> Current Class
          </label>
          <select
            name="classId"
            defaultValue={initialData?.enrollments?.[0]?.classId || ""}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium appearance-none cursor-pointer"
          >
            <option value="">Not Assigned Yet</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.level} — {c.name}
              </option>
            ))}
          </select>
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
            placeholder="e.g. ERA/2024/001"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium"
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
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium"
            />
            {ageDisplay && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black bg-eddyrose-gold/20 text-eddyrose-deep px-2 py-1 rounded-full uppercase">
                {ageDisplay}
              </span>
            )}
          </div>
        </div>

        {/* 6. Parent/Guardian Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1 flex items-center gap-2">
            <Heart size={14} className="text-zinc-400" /> Parent/Guardian Name
          </label>
          <input
            name="parentName"
            defaultValue={initialData?.parentName}
            type="text"
            placeholder="e.g. Mr. & Mrs. Smith"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium"
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
            placeholder="e.g. Christian"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium"
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
            placeholder="e.g. +234 800 000 0000"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium"
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
            placeholder="e.g. 123 School Lane, City Center"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm font-medium resize-none"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-100 flex justify-end">
        <button
          type="submit"
          className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-xl shadow-eddyrose-deep/20 active:scale-[0.95] hover:-translate-y-0.5"
        >
          <Save size={18} />
          {buttonText}
        </button>
      </div>
    </form>
  );
}
