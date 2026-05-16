"use client";

import { useState, useMemo } from "react";
import { Search, User, Edit2, Filter, X } from "lucide-react";
import Link from "next/link";
import { calculateAge } from "@/lib/utils/age";

interface StudentListProps {
  initialStudents: any[];
  classes: any[];
}

export default function StudentList({ initialStudents, classes }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredStudents = useMemo(() => {
    return initialStudents.filter((student) => {
      // 1. Search term (Name or Reg Number)
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Class Filter
      const enrollment = student.enrollments?.[0];
      const matchesClass = 
        selectedClass === "all" || 
        enrollment?.classId === selectedClass;

      // 3. Gender Filter
      const matchesGender = 
        selectedGender === "all" || 
        student.sex === selectedGender;

      return matchesSearch && matchesClass && matchesGender;
    });
  }, [initialStudents, searchTerm, selectedClass, selectedGender]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClass("all");
    setSelectedGender("all");
  };

  const hasActiveFilters = searchTerm !== "" || selectedClass !== "all" || selectedGender !== "all";

  return (
    <div className="space-y-6">
      {/* ── Filter Bar ────────────────────────────────────────────── */}
      <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-zinc-200 space-y-4">
        <div className="flex flex-row gap-2 sm:gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-zinc-50 border border-zinc-200 rounded-xl sm:rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all font-medium"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all border shrink-0 ${
              isFilterOpen || hasActiveFilters 
                ? "bg-eddyrose-deep text-white border-eddyrose-deep" 
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden xs:inline">Filters</span>
            {hasActiveFilters && <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />}
          </button>
        </div>

        {/* ── Expanded Filters ── */}
        {isFilterOpen && (
          <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Class Level</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-eddyrose-light"
              >
                <option value="all">All Classes</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.level} — {c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Gender</label>
              <select 
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-eddyrose-light"
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {hasActiveFilters && (
              <div className="sm:col-span-3 flex justify-end">
                <button 
                  onClick={clearFilters}
                  className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <X size={12} />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Table ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-zinc-600 border-collapse">
          <thead className="bg-zinc-50/50 border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-[0.1em] text-[10px]">
            <tr>
              <th className="px-4 py-4 sm:px-6">Student & Class</th>
              <th className="px-4 py-4 hidden md:table-cell">Reg Number</th>
              <th className="px-4 py-4 text-center">Age</th>
              <th className="px-4 py-4 text-right sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                   <div className="flex flex-col items-center gap-2 opacity-30">
                     <User size={48} />
                     <p className="font-bold text-zinc-900 uppercase tracking-widest text-[10px]">No Results Found</p>
                   </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student: any) => {
                const enrollment = student.enrollments?.[0];
                const age = calculateAge(student.dateOfBirth);
                
                return (
                  <tr key={student.id} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                          {student.image ? (
                            <img src={student.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User size={16} className="text-zinc-300" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-zinc-900 text-xs sm:text-sm truncate">
                            {student.name}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                            {enrollment ? (
                              <span className="text-eddyrose-light font-black uppercase tracking-tight">
                                {enrollment.class.level} — {enrollment.class.name}
                              </span>
                            ) : (
                              <span className="italic">Unassigned</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="font-mono text-[10px] bg-zinc-100 text-zinc-500 px-2 py-1 rounded">
                        {student.registrationNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-black text-zinc-900 bg-zinc-100 w-7 h-7 rounded-full inline-flex items-center justify-center">
                        {age || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right sm:px-6">
                      <Link 
                        href={`/portal/students/${student.id}/edit`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-eddyrose-light hover:bg-eddyrose-light/5 transition-all active:scale-90"
                        title="Edit Student"
                      >
                        <Edit2 size={16} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
