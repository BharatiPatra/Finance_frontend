"use client"; // This page uses client-side components like Dashboard (which uses hooks)

import React from "react";
import Dashboard from "../components/dashboard/Dashboard"; // Adjust path as needed

// This component provides the content for the root path (/)
const HomePage: React.FC = () => {

  return (
    // The Dashboard component is rendered as the main content for the home page.
    // The overall layout (Header, Sidebar, scrolling) is handled by RootLayout.
    <Dashboard />
  );
};

export default HomePage;
