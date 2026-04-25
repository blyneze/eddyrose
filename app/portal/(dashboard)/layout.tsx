import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Sidebar from "@/components/portal/Sidebar"
import Topbar from "@/components/portal/Topbar"
import { SidebarProvider } from "@/components/portal/SidebarProvider"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/portal')
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-zinc-50 font-sans">
        <Sidebar role={session.user.role as any} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar user={session.user as any} />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
