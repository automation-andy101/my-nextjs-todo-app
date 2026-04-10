"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ListTodo, Calendar, Search } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path ? "font-bold" : "text-gray-500";

  return (
    <aside className="w-64 h-screen border-r p-4">
      <nav className="flex flex-col gap-4">
        {/* <ListTodo /><Link href="/today" className={linkClass("/today")}>Add task</Link> */}
        <ListTodo /><Link href="/today" className={linkClass("/today")}>Today</Link>
        <Calendar /><Link href="/upcoming" className={linkClass("/upcoming")}>Upcoming</Link>
        <Search /> <Link href="/search" className={linkClass("/search")}>Search</Link>
      </nav>
    </aside>
  );
}