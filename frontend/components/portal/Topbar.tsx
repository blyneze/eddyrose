"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, User as UserIcon, Menu } from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import Link from "next/link";
import Image from "next/image";

export default function Topbar({ user, announcements = [] }: { user: any, announcements?: any[] }) {
  const { toggle } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = hasViewed ? 0 : announcements.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && !hasViewed) {
      setHasViewed(true);
    }
  };

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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleToggleNotifications}
            aria-label="Notifications"
            className="text-zinc-400 hover:text-eddyrose-deep transition-colors relative p-2"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-50">
              <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900">Notifications</h3>
                <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">
                  {announcements.length} Total
                </span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {announcements.length === 0 ? (
                  <div className="p-8 text-center text-sm text-zinc-500 italic">
                    No new notifications.
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {announcements.map((a: any) => (
                      <div key={a.id} className="p-4 border-b border-zinc-100/80 hover:bg-zinc-50 transition-colors last:border-b-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-zinc-900 text-sm">
                            {a.title}
                          </span>
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest shrink-0 ml-2">
                            {new Date(a.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {a.summary && (
                          <p className="text-xs font-bold text-eddyrose-light/80 mb-1">
                            {a.summary}
                          </p>
                        )}
                        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                          {a.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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
