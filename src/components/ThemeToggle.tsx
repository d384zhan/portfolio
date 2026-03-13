"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before hydration, render both characters unstyled so they're always visible
  const isDark = mounted ? resolvedTheme === "dark" : null;

  return (
    <div
      className="flex items-center gap-1 text-xs select-none"
      style={{ fontFamily: "var(--font-space-mono), monospace" }}
    >
      <button
        onClick={() => setTheme("light")}
        className="cursor-pointer"
        style={{
          color:
            isDark === null
              ? "var(--muted)"
              : isDark
                ? "var(--muted)"
                : "var(--highlight)",
          fontWeight: isDark === false ? 700 : 400,
          transition: "color 0.3s ease, font-weight 0.3s ease",
        }}
        aria-label="Light mode"
      >
        日
      </button>
      <span style={{ color: "var(--muted)" }}>/</span>
      <button
        onClick={() => setTheme("dark")}
        className="cursor-pointer"
        style={{
          color:
            isDark === null
              ? "var(--muted)"
              : isDark
                ? "var(--highlight)"
                : "var(--muted)",
          fontWeight: isDark === true ? 700 : 400,
          transition: "color 0.3s ease, font-weight 0.3s ease",
        }}
        aria-label="Dark mode"
      >
        月
      </button>
    </div>
  );
}
