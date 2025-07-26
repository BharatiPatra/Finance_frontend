"use client";

import React from "react";
import Link from "next/link";
import { Bell, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Zap, BarChart3, ClipboardList, AlertCircle, Home } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  // get everything before the first space, or fall back to full name
  const firstName = session?.user?.name?.split(" ")[0] ?? "";

  return (
    <>
      <header className="py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm bg-slate-800">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">FinAgent</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4 ml-4">
          {/* notification bell on dark bg */}
          <div className="relative">
            <Bell size={24} className="text-white cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>

          {/* welcome + dropdown */}
          <div className="relative group">
            {firstName && (
              <button className="text-white  font-medium text-2xl cursor-pointer">
                Welcome, {firstName}
              </button>
            )}
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 text-sm"
              >
                <Settings size={18} /> Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 text-sm"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile nav unchanged */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg md:hidden z-20">
        <div className="flex justify-around py-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              pathname === "/" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Home size={20} />
            Home
          </Link>
          <Link
            href="/aiAgent"
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              pathname === "/aiAgent" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Zap size={20} />
            AI
          </Link>
          <Link
            href="/investment"
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              pathname === "/investment" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <BarChart3 size={20} />
            Invest
          </Link>
          <Link
            href="/reports"
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              pathname === "/reports" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <ClipboardList size={20} />
            Reports
          </Link>
          <Link
            href="/alert"
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              pathname === "/alert" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <AlertCircle size={20} />
            Alerts
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
