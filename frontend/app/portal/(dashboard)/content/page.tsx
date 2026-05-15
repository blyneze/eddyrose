import { auth } from "@/lib/auth"
import { backendContent } from "@/lib/backend"
import { redirect } from "next/navigation"
import ContentPanel from "@/components/portal/ContentPanel"

export default async function ContentManagementPage() {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") redirect("/")

  const { announcements, events } = await backendContent.get(session.user)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Content Management</h1>
        <p className="text-zinc-500 text-sm">
          Manage announcements and school events displayed on the public website.
        </p>
      </div>

      {/* Client component handles all create/delete interactions */}
      <ContentPanel
        initialAnnouncements={announcements}
        initialEvents={events}
      />
    </div>
  )
}
