"use client";

import { Bell, User as UserIcon, Menu } from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import Link from "next/link";
import Image from "next/image";

export default function Topbar({ user }: { user: any }) {
  const { toggle } = useSidebar();

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger — toggles the slide-out sidebar */}
        <button
          onClick={toggle}
          aria-label="Toggle navigation"
          className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-eddyrose-deep hover:bg-zinc-100 transition-colors"
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="flex items-center gap-1">
          <div className="w-12 h-12 md:w-13 md:h-13 flex items-center justify-center flex-shrink-0">
            <Image
              src="/now-logo.png"
              alt="Eddyrose Academy Logo"
              className="-mt-1"
              width={45}
              height={45}
            />
          </div>
          <div className="flex flex-col leading-tight md:gap-0.5">
            <span className="text-[16px] font-black text-eddyrose-deep tracking-tight">
              Eddyrose
            </span>
            <span className="text-[11px] font-bold text-eddyrose-light/80 tracking-tight">
              International Academy
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="text-zinc-400 hover:text-eddyrose-deep transition-colors relative"
        >
          <Bell size={20} />
        </button>

        <div className="h-8 w-px bg-zinc-200 mx-2" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-zinc-900 leading-none">
              {user?.name}
            </span>
            <span className="text-xs text-zinc-500 mt-1 capitalize">
              {user?.role?.toLowerCase()}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-eddyrose-light/10 text-eddyrose-light flex items-center justify-center">
            <UserIcon size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
