"use client"; // This component uses client-side hooks like usePathname (indirectly via Link) and interactive elements

import React from "react";
import Link from "next/link";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut,useSession } from "next-auth/react"; // Import signOut

import {
  Zap,
  BarChart3,
  ClipboardList,
  AlertCircle,
  Home,
} from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession(); // Get session data to check if user is logged in

  const handleSignOut = async () => {
    // Calling signOut without arguments will redirect to the NextAuth.js configured signout page,
    // which by default is usually '/api/auth/signout' and then redirects to the home page or a specified callback URL.
    // To explicitly redirect to '/login', you can pass the callbackUrl option.
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {/* Header container: sticky top for fixed position, shadow for visual separation */}
      <header className="bg-white py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-slate-900">FinAgent</h1>
          </Link>
        </div>

        {/* Notification & Profile Icons */}
        <div className="flex items-center gap-4 ml-4">
          {/* Notification Bell with Badge */}
          <div className="relative">
            <Bell size={24} className="text-gray-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3 {/* Example notification count */}
            </span>
          </div>

          {/* User Profile with Dropdown Menu */}
          <div className="relative group">
            {session?.user?.name && (
              <span className=" bg-slate-900 text-white text-2xl rounded-full h-4 w-4 flex items-center p-4 justify-center border border-slate-900 cursor-pointer">
                {session.user?.name.charAt(0).toUpperCase()} {/* Display first letter of user's name */}
              </span>
            )}
            {/* Dropdown content: hidden by default, visible on hover */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
              <Link
                href="/settings" // Link to settings page
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <Settings size={18} /> Settings
              </Link>
              <button // Changed from Link to button to handle onClick directly
                onClick={handleSignOut} // Call the signOut function
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation (remains unchanged as per your original request) */}
      {/* This ensures mobile users still have easy access to navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden z-20">
        <div className="flex justify-around py-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              // Apply active styling based on current pathname
              pathname === "/" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Home size={20} />
            Home
          </Link>
          <Link
            href="/aiAgent"
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              pathname=== "/aiAgent" ? "text-blue-600" : "text-gray-500"
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