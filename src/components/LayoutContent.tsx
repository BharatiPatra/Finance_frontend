"use client";
import React from "react";
import { useUserSession } from "../contexts/UserSessionContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Login from "../app/login/page";

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { isAuthenticated } = useUserSession();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pl-2.5">{children}</main>
      </div>
    </div>
  );
};

export default LayoutContent;
