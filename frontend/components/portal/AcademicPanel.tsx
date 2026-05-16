"use client"

import { useState, useTransition, useRef } from "react"
import {
  createClassAction,
  createSessionAction,
  createTermAction,
  createSubjectAction,
  setAsCurrentAction,
  assignTeacherAction,
  linkSubjectToClassAction,
} from "@/app/actions/academic"
import { Loader2, Plus, Star, CheckCircle, GraduationCap, Calendar, BookOpen, Users } from "lucide-react"

type Tab = "classes" | "sessions" | "terms" | "subjects"

export default function AcademicPanel({
  classes,
  sessions,
  terms,
  subjects,
  teachers,
}: {
  classes: any[]
  sessions: any[]
  terms: any[]
  subjects: any[]
  teachers: any[]
}) {
  const [tab, setTab] = useState<Tab>("classes")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const formRef = useRef<HTMLFormElement>(null)

  const handleCreate = (action: (fd: FormData) => Promise<void>) => async (fd: FormData) => {
    setError("")
    startTransition(async () => {
      try {
        await action(fd)
        formRef.current?.reset()
      } catch (e: any) {
        setError(e.message)
      }
    })
  }

  const handleSetCurrent = (id: string, type: "SESSION" | "TERM") => {
    setError("")
    startTransition(async () => {
      try {
        await setAsCurrentAction(id, type)
      } catch (e: any) {
        setError(e.message)
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="flex overflow-x-auto border-b border-zinc-200 no-scrollbar">
        <button
          onClick={() => setTab("classes")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
            tab === "classes" ? "border-eddyrose-deep text-eddyrose-deep" : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <GraduationCap size={16} /> Classes & Assignments
        </button>
        <button
          onClick={() => setTab("sessions")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
            tab === "sessions" ? "border-eddyrose-deep text-eddyrose-deep" : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Calendar size={16} /> Academic Sessions
        </button>
        <button
          onClick={() => setTab("terms")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
            tab === "terms" ? "border-eddyrose-deep text-eddyrose-deep" : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Calendar size={16} /> Terms
        </button>
        <button
          onClick={() => setTab("subjects")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
            tab === "subjects" ? "border-eddyrose-deep text-eddyrose-deep" : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <BookOpen size={16} /> Subjects Directory
        </button>
      </div>

      <div className="p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100">
            {error}
          </div>
        )}

        {tab === "classes" && (
          <div className="space-y-8">
            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
              <h3 className="text-sm font-bold text-zinc-800 mb-4 uppercase tracking-wide">Create New Class</h3>
              <form ref={formRef} action={handleCreate(createClassAction)} className="flex gap-3">
                <input required name="name" type="text" placeholder="e.g. Grade 1" className="flex-1 bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eddyrose-deep" />
                <button disabled={isPending} type="submit" className="bg-eddyrose-deep text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-eddyrose-light flex items-center gap-2 disabled:opacity-60">
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Class
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classes.map(cls => (
                <div key={cls.id} className="group bg-white border border-zinc-200 rounded-[1.5rem] p-5 sm:p-6 hover:shadow-xl hover:shadow-zinc-200/50 transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-lg font-black text-zinc-900 tracking-tight">{cls.name}</h4>
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">{cls.level || "Primary Level"}</div>
                    </div>
                    <span className="text-[10px] font-black text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                      {cls._count?.enrollments || 0} Students
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Teacher Assignments */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Users size={12} /> Assigned Teachers
                      </div>
                      <div className="flex flex-wrap gap-1.5 min-h-[1.5rem]">
                        {cls.teacherAssigns.length === 0 ? <span className="text-xs text-zinc-400 italic">No teachers assigned</span> : 
                          cls.teacherAssigns.map((ta: any) => (
                            <span key={ta.id} className="inline-flex items-center px-2 py-1 bg-eddyrose-light/10 text-eddyrose-deep text-[11px] font-bold rounded-lg border border-eddyrose-light/20">
                              {ta.teacherProfile.user.name}
                            </span>
                          ))
                        }
                      </div>
                      <form action={handleCreate(assignTeacherAction)} className="flex gap-2 pt-1">
                        <input type="hidden" name="classId" value={cls.id} />
                        <select required name="teacherId" className="flex-1 text-xs border border-zinc-200 rounded-xl px-3 py-2 bg-zinc-50 focus:outline-none focus:border-eddyrose-light focus:bg-white transition-all font-medium">
                          <option value="">Select Teacher...</option>
                          {teachers.map(t => (
                            <option key={t.id} value={t.teacherProfile.id}>{t.name}</option>
                          ))}
                        </select>
                        <button disabled={isPending} type="submit" className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-eddyrose-light transition-all disabled:opacity-50">Assign</button>
                      </form>
                    </div>

                    {/* Subject Linking */}
                    <div className="space-y-3 pt-2 border-t border-zinc-50">
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen size={12} /> Class Subjects
                      </div>
                      <div className="flex flex-wrap gap-1.5 min-h-[1.5rem]">
                        {cls.subjects.length === 0 ? <span className="text-xs text-zinc-400 italic">No subjects linked</span> : 
                          cls.subjects.map((cs: any) => (
                            <span key={cs.id} className="inline-flex items-center px-2 py-1 bg-zinc-100 text-zinc-600 text-[11px] font-bold rounded-lg border border-zinc-200">
                              {cs.subject.name}
                            </span>
                          ))
                        }
                      </div>
                      <form action={handleCreate(linkSubjectToClassAction)} className="flex gap-2 pt-1">
                        <input type="hidden" name="classId" value={cls.id} />
                        <select required name="subjectId" className="flex-1 text-xs border border-zinc-200 rounded-xl px-3 py-2 bg-zinc-50 focus:outline-none focus:border-eddyrose-light focus:bg-white transition-all font-medium">
                          <option value="">Add Subject...</option>
                          {subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                        <button disabled={isPending} type="submit" className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-eddyrose-light transition-all disabled:opacity-50">Add</button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
              {classes.length === 0 && <p className="col-span-full text-center text-zinc-400 py-12 font-medium italic">No classes have been created yet.</p>}
            </div>
          </div>
        )}

        {tab === "sessions" && (
          <div className="space-y-8">
            <div className="bg-zinc-50 p-4 sm:p-6 rounded-[1.5rem] border border-zinc-200">
              <h3 className="text-[10px] font-black text-zinc-400 mb-4 uppercase tracking-widest">Create New Academic Session</h3>
              <form ref={formRef} action={handleCreate(createSessionAction)} className="flex flex-col sm:flex-row gap-3">
                <input required name="name" type="text" placeholder="e.g. 2024/2025" className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-eddyrose-light font-medium" />
                <button disabled={isPending} type="submit" className="bg-eddyrose-deep text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-eddyrose-light flex items-center justify-center gap-2 disabled:opacity-60 transition-all whitespace-nowrap">
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create
                </button>
              </form>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map(s => (
                <div key={s.id} className="p-5 border border-zinc-200 rounded-[1.5rem] flex flex-col gap-4 bg-white hover:border-eddyrose-light transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-zinc-900 tracking-tight truncate mr-2">{s.name}</span>
                    {s.isCurrent && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)] shrink-0" />
                    )}
                  </div>
                  {s.isCurrent ? (
                    <div className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest text-center truncate">
                      Active Session
                    </div>
                  ) : (
                    <button 
                      disabled={isPending} 
                      onClick={() => handleSetCurrent(s.id, "SESSION")} 
                      className="text-[10px] font-black text-zinc-400 hover:text-eddyrose-deep hover:bg-zinc-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-zinc-100 transition-all truncate"
                    >
                      Set as Active
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "terms" && (
          <div className="space-y-8">
            <div className="bg-zinc-50 p-4 sm:p-6 rounded-[1.5rem] border border-zinc-200">
              <h3 className="text-[10px] font-black text-zinc-400 mb-4 uppercase tracking-widest">Create New Academic Term</h3>
              <form ref={formRef} action={handleCreate(createTermAction)} className="flex flex-col sm:flex-row gap-3">
                <input required name="name" type="text" placeholder="e.g. First Term" className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-eddyrose-light font-medium" />
                <button disabled={isPending} type="submit" className="bg-eddyrose-deep text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-eddyrose-light flex items-center justify-center gap-2 disabled:opacity-60 transition-all whitespace-nowrap">
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create
                </button>
              </form>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
              {terms.map(t => (
                <div key={t.id} className="p-5 border border-zinc-200 rounded-[1.5rem] flex flex-col gap-4 bg-white hover:border-eddyrose-light transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-zinc-900 tracking-tight truncate mr-2">{t.name}</span>
                    {t.isCurrent && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)] shrink-0" />
                    )}
                  </div>
                  {t.isCurrent ? (
                    <div className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest text-center truncate">
                      Active Term
                    </div>
                  ) : (
                    <button 
                      disabled={isPending} 
                      onClick={() => handleSetCurrent(t.id, "TERM")} 
                      className="text-[10px] font-black text-zinc-400 hover:text-eddyrose-deep hover:bg-zinc-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-zinc-100 transition-all truncate"
                    >
                      Set as Active
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "subjects" && (
          <div className="space-y-8">
            <div className="bg-zinc-50 p-4 sm:p-6 rounded-[1.5rem] border border-zinc-200">
              <h3 className="text-[10px] font-black text-zinc-400 mb-4 uppercase tracking-widest">Add Subject to Global Directory</h3>
              <form ref={formRef} action={handleCreate(createSubjectAction)} className="flex flex-col sm:flex-row gap-3">
                <input required name="name" type="text" placeholder="e.g. Mathematics" className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-eddyrose-light font-medium" />
                <button disabled={isPending} type="submit" className="bg-eddyrose-deep text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-eddyrose-light flex items-center justify-center gap-2 disabled:opacity-60 transition-all whitespace-nowrap">
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add Subject
                </button>
              </form>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {subjects.map(s => (
                <div key={s.id} className="p-4 sm:p-5 border border-zinc-200 rounded-[1.5rem] text-center bg-white hover:border-eddyrose-light transition-all group flex flex-col items-center justify-center min-h-[80px]">
                  <span className="text-[10px] sm:text-xs font-black text-zinc-900 tracking-tight truncate w-full">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
