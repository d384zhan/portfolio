"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function SunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/*
 * Track: 56 × 26, border 1px → inner 54 × 24
 * Dot:   18 × 18, inset 3px → centers at x=12 (left) and x=42 (right)
 * Icons: 12 × 12, left-[6px] center=12, right-[6px] center=42 → aligned with dot
 */

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[56px] h-[26px]" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-[56px] h-[26px] rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0"
      style={{
        backgroundColor: "var(--tooltip-bg)",
        border: "1px solid var(--border-subtle)",
      }}
      aria-label="Toggle theme"
    >
      {/* Sliding accent dot — behind icons */}
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full"
        style={{ backgroundColor: "var(--accent)", opacity: 0.2 }}
        animate={{ left: isDark ? "calc(100% - 21px)" : "3px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Icons — on top of dot */}
      <span
        className="absolute left-[6px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200"
        style={{ color: isDark ? "var(--muted)" : "var(--accent)" }}
      >
        <SunIcon />
      </span>
      <span
        className="absolute right-[6px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200"
        style={{ color: isDark ? "var(--accent)" : "var(--muted)" }}
      >
        <MoonIcon />
      </span>
    </button>
  );
}
