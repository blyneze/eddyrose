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

            <div className="space-y-4">
              {classes.map(cls => (
                <div key={cls.id} className="border border-zinc-200 rounded-xl p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-zinc-900">{cls.name}</h4>
                    <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
                      {cls._count.enrollments} Students
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Teacher Assignments */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wide border-b border-zinc-100 pb-2">Assigned Teachers</div>
                      <div className="flex flex-wrap gap-2">
                        {cls.teacherAssigns.length === 0 ? <span className="text-sm text-zinc-400 italic">None</span> : 
                          cls.teacherAssigns.map((ta: any) => (
                            <span key={ta.id} className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">
                              <Users size={12} className="mr-1" />
                              {ta.teacherProfile.user.name}
                            </span>
                          ))
                        }
                      </div>
                      <form action={handleCreate(assignTeacherAction)} className="flex gap-2 mt-2">
                        <input type="hidden" name="classId" value={cls.id} />
                        <select required name="teacherId" className="flex-1 text-sm border border-zinc-200 rounded px-2 py-1.5 focus:outline-none focus:border-eddyrose-deep">
                          <option value="">Select Teacher...</option>
                          {teachers.map(t => (
                            <option key={t.id} value={t.teacherProfile.id}>{t.name}</option>
                          ))}
                        </select>
                        <button disabled={isPending} type="submit" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded text-xs font-bold transition-colors">Assign</button>
                      </form>
                    </div>

                    {/* Subject Linking */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wide border-b border-zinc-100 pb-2">Class Subjects</div>
                      <div className="flex flex-wrap gap-2">
                        {cls.subjects.length === 0 ? <span className="text-sm text-zinc-400 italic">None</span> : 
                          cls.subjects.map((cs: any) => (
                            <span key={cs.id} className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded">
                              {cs.subject.name}
                            </span>
                          ))
                        }
                      </div>
                      <form action={handleCreate(linkSubjectToClassAction)} className="flex gap-2 mt-2">
                        <input type="hidden" name="classId" value={cls.id} />
                        <select required name="subjectId" className="flex-1 text-sm border border-zinc-200 rounded px-2 py-1.5 focus:outline-none focus:border-eddyrose-deep">
                          <option value="">Add Subject...</option>
                          {subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                        <button disabled={isPending} type="submit" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded text-xs font-bold transition-colors">Add</button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
              {classes.length === 0 && <p className="text-center text-zinc-400 py-8">No classes created yet.</p>}
            </div>
          </div>
        )}

        {tab === "sessions" && (
          <div className="space-y-6">
            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
              <h3 className="text-sm font-bold text-zinc-800 mb-4 uppercase tracking-wide">Create New Session</h3>
              <form ref={formRef} action={handleCreate(createSessionAction)} className="flex gap-3">
                <input required name="name" type="text" placeholder="e.g. 2024/2025" className="flex-1 bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eddyrose-deep" />
                <button disabled={isPending} type="submit" className="bg-eddyrose-deep text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-eddyrose-light flex items-center gap-2 disabled:opacity-60">
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Session
                </button>
              </form>
            </div>
            <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
              {sessions.map(s => (
                <div key={s.id} className="p-4 flex items-center justify-between hover:bg-zinc-50">
                  <span className="font-medium text-zinc-900">{s.name}</span>
                  {s.isCurrent ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full"><CheckCircle size={14} /> Active Session</span>
                  ) : (
                    <button disabled={isPending} onClick={() => handleSetCurrent(s.id, "SESSION")} className="text-xs font-bold text-eddyrose-light hover:underline">Set as Active</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "terms" && (
          <div className="space-y-6">
            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
              <h3 className="text-sm font-bold text-zinc-800 mb-4 uppercase tracking-wide">Create New Term</h3>
              <form ref={formRef} action={handleCreate(createTermAction)} className="flex gap-3">
                <input required name="name" type="text" placeholder="e.g. First Term" className="flex-1 bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eddyrose-deep" />
                <button disabled={isPending} type="submit" className="bg-eddyrose-deep text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-eddyrose-light flex items-center gap-2 disabled:opacity-60">
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Term
                </button>
              </form>
            </div>
            <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
              {terms.map(t => (
                <div key={t.id} className="p-4 flex items-center justify-between hover:bg-zinc-50">
                  <span className="font-medium text-zinc-900">{t.name}</span>
                  {t.isCurrent ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full"><CheckCircle size={14} /> Active Term</span>
                  ) : (
                    <button disabled={isPending} onClick={() => handleSetCurrent(t.id, "TERM")} className="text-xs font-bold text-eddyrose-light hover:underline">Set as Active</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "subjects" && (
          <div className="space-y-6">
            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
              <h3 className="text-sm font-bold text-zinc-800 mb-4 uppercase tracking-wide">Add Subject to Global Directory</h3>
              <form ref={formRef} action={handleCreate(createSubjectAction)} className="flex gap-3">
                <input required name="name" type="text" placeholder="e.g. Mathematics" className="flex-1 bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eddyrose-deep" />
                <button disabled={isPending} type="submit" className="bg-eddyrose-deep text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-eddyrose-light flex items-center gap-2 disabled:opacity-60">
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add Subject
                </button>
              </form>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {subjects.map(s => (
                <div key={s.id} className="p-4 border border-zinc-200 rounded-xl text-center font-medium text-zinc-800 bg-white">
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
