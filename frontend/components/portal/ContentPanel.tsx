"use client"

import { useState, useTransition, useRef } from "react"
import {
  createAnnouncementAction,
  createEventAction,
  deleteAnnouncementAction,
  deleteEventAction,
} from "@/app/actions/content"
import { Megaphone, Calendar, Plus, Trash2, Loader2, X } from "lucide-react"

type Announcement = {
  id: string
  title: string
  summary: string | null
  createdAt: Date
}

type Event = {
  id: string
  title: string
  date: Date
  venue: string | null
}

type Modal = "announcement" | "event" | null

export default function ContentPanel({
  initialAnnouncements,
  initialEvents,
}: {
  initialAnnouncements: Announcement[]
  initialEvents: Event[]
}) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [events, setEvents] = useState(initialEvents)
  const [modal, setModal] = useState<Modal>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const announcementFormRef = useRef<HTMLFormElement>(null)
  const eventFormRef = useRef<HTMLFormElement>(null)

  const handleCreateAnnouncement = (formData: FormData) => {
    setError("")
    startTransition(async () => {
      try {
        await createAnnouncementAction(formData)
        // Optimistically add to list using form data
        const newItem: Announcement = {
          id: crypto.randomUUID(),
          title: formData.get("title") as string,
          summary: (formData.get("summary") as string) || null,
          createdAt: new Date(),
        }
        setAnnouncements((prev) => [newItem, ...prev])
        setModal(null)
        announcementFormRef.current?.reset()
      } catch (e: any) {
        setError(e.message ?? "Failed to create announcement.")
      }
    })
  }

  const handleCreateEvent = (formData: FormData) => {
    setError("")
    startTransition(async () => {
      try {
        await createEventAction(formData)
        const newItem: Event = {
          id: crypto.randomUUID(),
          title: formData.get("title") as string,
          date: new Date(formData.get("date") as string),
          venue: (formData.get("venue") as string) || null,
        }
        setEvents((prev) => [...prev, newItem].sort((a, b) => a.date.getTime() - b.date.getTime()))
        setModal(null)
        eventFormRef.current?.reset()
      } catch (e: any) {
        setError(e.message ?? "Failed to create event.")
      }
    })
  }

  const handleDeleteAnnouncement = (id: string) => {
    startTransition(async () => {
      try {
        await deleteAnnouncementAction(id)
        setAnnouncements((prev) => prev.filter((a) => a.id !== id))
      } catch {/* silently ignore */}
    })
  }

  const handleDeleteEvent = (id: string) => {
    startTransition(async () => {
      try {
        await deleteEventAction(id)
        setEvents((prev) => prev.filter((e) => e.id !== id))
      } catch {/* silently ignore */}
    })
  }

  return (
    <>
      {/* Modal backdrop */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => { setModal(null); setError("") }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setModal(null); setError("") }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>

            {modal === "announcement" && (
              <>
                <h2 className="text-xl font-bold text-zinc-900 mb-6">New Announcement</h2>
                {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">{error}</p>}
                <form ref={announcementFormRef} action={handleCreateAnnouncement} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Title *</label>
                    <input name="title" type="text" required placeholder="e.g. Mid-term Examination Schedule"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Summary (optional)</label>
                    <input name="summary" type="text" placeholder="Brief one-line summary"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Content *</label>
                    <textarea name="content" required rows={5} placeholder="Full announcement text…"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all resize-none" />
                  </div>
                  <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={() => { setModal(null); setError("") }}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isPending}
                      className="px-6 py-2 bg-eddyrose-deep hover:bg-eddyrose-light text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2">
                      {isPending && <Loader2 size={14} className="animate-spin" />}
                      Publish Announcement
                    </button>
                  </div>
                </form>
              </>
            )}

            {modal === "event" && (
              <>
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Add School Event</h2>
                {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">{error}</p>}
                <form ref={eventFormRef} action={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Event Title *</label>
                      <input name="title" type="text" required placeholder="e.g. Sports Day"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Date *</label>
                      <input name="date" type="date" required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Time (optional)</label>
                      <input name="time" type="text" placeholder="e.g. 9:00 AM"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all" />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Venue (optional)</label>
                      <input name="venue" type="text" placeholder="e.g. School Hall"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all" />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Description (optional)</label>
                      <textarea name="description" rows={3} placeholder="Additional details…"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all resize-none" />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={() => { setModal(null); setError("") }}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isPending}
                      className="px-6 py-2 bg-eddyrose-deep hover:bg-eddyrose-light text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2">
                      {isPending && <Loader2 size={14} className="animate-spin" />}
                      Save Event
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
              <Megaphone size={20} className="text-eddyrose-gold" />
              Announcements
            </h2>
            <button
              onClick={() => { setModal("announcement"); setError("") }}
              className="text-eddyrose-light hover:text-eddyrose-deep text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> New Post
            </button>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm divide-y divide-zinc-100">
            {announcements.length === 0 ? (
              <div className="p-12 text-center text-zinc-400 text-sm italic">No announcements published yet.</div>
            ) : (
              announcements.map((item) => (
                <div key={item.id} className="p-4 flex items-start justify-between gap-3 hover:bg-zinc-50 transition-colors group">
                  <div className="min-w-0">
                    <h3 className="font-bold text-zinc-900 truncate">{item.title}</h3>
                    {item.summary && <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{item.summary}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(item.id)}
                    disabled={isPending}
                    className="text-zinc-300 hover:text-red-500 transition-colors flex-shrink-0 mt-0.5 disabled:opacity-40"
                    title="Delete announcement"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
              <Calendar size={20} className="text-eddyrose-gold" />
              School Calendar
            </h2>
            <button
              onClick={() => { setModal("event"); setError("") }}
              className="text-eddyrose-light hover:text-eddyrose-deep text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> Add Event
            </button>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm divide-y divide-zinc-100">
            {events.length === 0 ? (
              <div className="p-12 text-center text-zinc-400 text-sm italic">No upcoming events scheduled.</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="p-4 flex items-center justify-between gap-3 hover:bg-zinc-50 transition-colors group">
                  <div className="min-w-0">
                    <h3 className="font-bold text-zinc-900 truncate">{event.title}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{new Date(event.date).toDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {event.venue && (
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest hidden sm:block">
                        {event.venue}
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      disabled={isPending}
                      className="text-zinc-300 hover:text-red-500 transition-colors disabled:opacity-40"
                      title="Delete event"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
