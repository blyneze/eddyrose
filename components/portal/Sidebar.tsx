"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Settings,
  FileText,
  CalendarDays,
  X,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useSidebar } from "./SidebarProvider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Role = "SUPERADMIN" | "TEACHER" | "PARENT" | string;

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const links = [];

  if (role === "SUPERADMIN") {
    links.push(
      { name: "Overview", href: "/portal/overview", icon: LayoutDashboard },
      { name: "Classes", href: "/portal/classes", icon: GraduationCap },
      { name: "Users", href: "/portal/users", icon: Users },
      { name: "Students", href: "/portal/students", icon: Users },
      { name: "Results Review", href: "/portal/results", icon: FileText },
      { name: "Content", href: "/portal/content", icon: CalendarDays },
      { name: "Settings", href: "/portal/settings", icon: Settings },
    );
  } else if (role === "TEACHER") {
    links.push(
      { name: "My Class", href: "/portal/overview", icon: LayoutDashboard },
      { name: "Students", href: "/portal/students", icon: Users },
      { name: "Results Entry", href: "/portal/results", icon: FileText },
    );
  } else if (role === "PARENT") {
    links.push(
      { name: "Dashboard", href: "/portal/overview", icon: LayoutDashboard },
      { name: "My Children", href: "/portal/children", icon: Users },
      { name: "Published Results", href: "/portal/results", icon: FileText },
    );
  }

  const SidebarContent = (
    <>
      <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">
          {role} Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm ${
                isActive
                  ? "bg-eddyrose-light text-white shadow-sm"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-eddyrose-gold" : "text-zinc-400"}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="py-2 px-4 border-t border-white/10 mt-auto">
        <button
          onClick={() => signOut({ callbackUrl: "/portal" })}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium text-sm w-full hover:bg-red-500/10 hover:text-red-400 text-zinc-400"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 bg-eddyrose-deep border-r border-eddyrose-deep/90 text-zinc-300 flex flex-col h-full hidden md:flex">
        {SidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-eddyrose-deep text-zinc-300 flex flex-col z-[101] md:hidden shadow-2xl"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
