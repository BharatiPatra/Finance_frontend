"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  BarChart3,
  ClipboardList,
  AlertCircle,
  Users2,
  Home,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", icon: <Home size={18} />, label: "Home" },
    { href: "/aiAgent", icon: <Zap size={18} />, label: "Ask AI" },
    { href: "/investment", icon: <BarChart3 size={18} />, label: "Investment" },
    { href: "/reports", icon: <ClipboardList size={18} />, label: "Reports" },
    { href: "/alert", icon: <AlertCircle size={18} />, label: "Alerts" },
    { href: "/socialAndCopy", icon: <Users2 size={18} />, label: "Social" },
  ];

  return (
    // Sidebar container – background changed to bg-slate-900
    <aside className="w-64 bg-slate-800 p-6 shadow-md hidden md:flex flex-col">
      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-200 cursor-pointer
              ${
                pathname === link.href
                  ? "bg-white text-black font-semibold shadow-sm "
                  : "text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
              }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
