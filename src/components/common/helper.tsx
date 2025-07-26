"use client";
import React, {
  ReactNode,
} from "react";



// --- SectionTitle ---
interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export const SectionTitle = ({
  children,
  className = "",
}: SectionTitleProps) => (
  <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${className}`}>
    {children}
  </h2>
);