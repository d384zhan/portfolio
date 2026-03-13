"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

function useTypewriter(
  from: string,
  to: string,
  active: boolean,
  speed = 30,
  lingerMs = 0,
) {
  const [text, setText] = useState(from);
  const rafRef = useRef<number | null>(null);
  const lingerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef<{
    target: string;
    current: string;
    phase: "deleting" | "typing";
    idx: number;
  }>({
    target: from,
    current: from,
    phase: "deleting",
    idx: from.length,
  });
  const lastTickRef = useRef(0);

  const animate = useCallback(
    (timestamp: number) => {
      const elapsed = timestamp - lastTickRef.current;
      const charsThisFrame = Math.max(
        1,
        Math.floor(elapsed / Math.max(speed, 1)),
      );
      lastTickRef.current = timestamp;

      const s = stateRef.current;
      let changed = false;

      for (let i = 0; i < charsThisFrame; i++) {
        if (s.phase === "deleting") {
          if (s.idx > 0) {
            s.idx--;
            s.current = s.current.slice(0, s.idx);
            changed = true;
          } else {
            s.phase = "typing";
            s.idx = 0;
            break;
          }
        } else {
          if (s.idx < s.target.length) {
            s.idx++;
            s.current = s.target.slice(0, s.idx);
            changed = true;
          } else {
            break;
          }
        }
      }

      if (changed) setText(s.current);
      if (s.phase === "deleting" || s.idx < s.target.length) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [speed],
  );

  const startAnimation = useCallback(
    (target: string, current: string) => {
      stateRef.current = {
        target,
        current,
        phase: "deleting",
        idx: current.length,
      };
      lastTickRef.current = performance.now();
      rafRef.current = requestAnimationFrame(animate);
    },
    [animate],
  );

  useEffect(() => {
    const target = active ? to : from;
    if (
      stateRef.current.target === target &&
      stateRef.current.current === target
    )
      return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (lingerRef.current) clearTimeout(lingerRef.current);

    const current = stateRef.current.current;

    // Linger before reverting (unhover), start immediately on hover
    if (!active && lingerMs > 0) {
      lingerRef.current = setTimeout(() => {
        startAnimation(target, current);
      }, lingerMs);
    } else {
      startAnimation(target, current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lingerRef.current) clearTimeout(lingerRef.current);
    };
  }, [active, from, to, animate, lingerMs, startAnimation]);

  return text;
}

const experiences = [
  {
    name: "Greenhouse Juice",
    role: "engineering",
    year: "2025",
    detail: "built internal tools and data pipelines for operations",
  },
  {
    name: "Wat.ai",
    role: "engineering",
    year: "2025",
    detail: "predictive models for oil drilling operations at orecast",
  },
  {
    name: "Midnight Sun",
    role: "engineering",
    year: "2025",
    detail: "vehicle telemetry and embedded systems for solar car racing",
  },
  {
    name: "Sunnybrook Hospital",
    role: "data",
    year: "2023",
    detail: "data analysis and visualization for finance and operations",
  },
];

const projects = [
  {
    name: "steerio",
    desc: "real-time guardrails for voice agents",
    tech: "python · livekit · gemini · websockets",
    href: "https://github.com/d384zhan/steerio",
  },
  {
    name: "coinpilot",
    desc: "AI-powered crypto market simulator",
    tech: "next.js · flask · gemini · supabase",
    href: "https://github.com/d384zhan/htv-x",
  },
  {
    name: "familink",
    desc: "AI family connection platform",
    tech: "react · vite · firebase · openai",
    href: "https://github.com/d384zhan/familink.ai",
  },
  {
    name: "rnow rewards",
    desc: "loyalty rewards product design",
    tech: "figma · user research · prototyping",
    href: null,
  },
];

function ExperienceItem({
  exp,
  touchOpen,
  onTouchToggle,
}: {
  exp: (typeof experiences)[number];
  touchOpen: boolean;
  onTouchToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const touchUsed = useRef(false);
  const active = hovered || touchOpen;

  return (
    <div
      className="cursor-default"
      onMouseEnter={() => {
        if (!touchUsed.current) setHovered(true);
      }}
      onMouseLeave={() => {
        if (!touchUsed.current) setHovered(false);
      }}
      onTouchEnd={() => {
        touchUsed.current = true;
        onTouchToggle();
      }}
      style={{
        transform: active ? "scale(1.02)" : "scale(1)",
        transition:
          "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s ease",
        transformOrigin: "left center",
      }}
    >
      <div className="flex items-baseline justify-between">
        <span>
          <span
            style={{
              color: active ? "var(--accent)" : "var(--highlight)",
              transition: "color 0.2s, background-color 0.4s ease",
            }}
          >
            {exp.name}
          </span>{" "}
          · {exp.role}
        </span>
        <span style={{ color: "var(--muted)", transition: "color 0.2s ease" }}>
          {exp.year}
        </span>
      </div>
      <AnimatePresence>
        {active && exp.detail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="text-xs pt-0.5" style={{ color: "var(--muted)" }}>
              ↳ {exp.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectItem({
  project,
  touchOpen,
  onTouchToggle,
}: {
  project: (typeof projects)[number];
  touchOpen: boolean;
  onTouchToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const touchUsed = useRef(false);
  const active = hovered || touchOpen;
  const typewriterText = useTypewriter(
    project.desc,
    project.tech,
    hovered && !touchOpen,
    10,
    800,
  );

  const nameEl = project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: active ? "var(--accent)" : "var(--highlight)",
        transition: "color 0.2s ease",
      }}
    >
      {project.name}
    </a>
  ) : (
    <span
      className="cursor-default"
      style={{
        color: active ? "var(--accent)" : "var(--highlight)",
        transition: "color 0.2s ease",
      }}
    >
      {project.name}
    </span>
  );

  return (
    <div
      onMouseEnter={() => {
        if (!touchUsed.current) setHovered(true);
      }}
      onMouseLeave={() => {
        if (!touchUsed.current) setHovered(false);
      }}
      onTouchEnd={() => {
        touchUsed.current = true;
        onTouchToggle();
      }}
      style={{
        transform: active ? "scale(1.02)" : "scale(1)",
        transition:
          "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s ease",
        transformOrigin: "left center",
      }}
    >
      <div className="flex items-baseline justify-between">
        <span className="whitespace-nowrap overflow-hidden">
          {nameEl}
          <span
            style={{
              color: hovered && !touchOpen ? "var(--muted)" : undefined,
              transition: "color 0.2s",
            }}
          >
            {" "}
            · {typewriterText}
            <span
              className="inline-block w-px animate-pulse"
              style={{
                borderRight: active
                  ? "1.5px solid var(--muted)"
                  : "1.5px solid transparent",
                height: "1em",
                verticalAlign: "text-bottom",
                marginLeft: "1px",
                transition: "border-color 0.2s",
              }}
            />
          </span>
        </span>
      </div>
      <AnimatePresence>
        {touchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="text-xs pt-0.5" style={{ color: "var(--muted)" }}>
              ↳ {project.tech}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [activeTouch, setActiveTouch] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  return (
    <div
      className={`theme-transition${ready ? " ready" : ""} h-dvh w-full overflow-x-clip overflow-y-auto md:overflow-hidden flex justify-center items-start md:items-center relative`}
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-space-mono), monospace",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Dot grid overlay */}
      <div className="dot-overlay" />
      {/* Grain texture overlay */}
      <div className="grain-overlay" />
      <main className="w-full max-w-[580px] px-5 md:px-6 py-10 md:py-16 relative">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-[2.5dvh]">
          <h1
            className="text-3xl md:text-4xl tracking-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "var(--title)",
              fontWeight: 400,
              transition: "color 0.2s ease",
            }}
          >
            <span className="relative inline-block group cursor-default">
              Dawang
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 120 8"
                preserveAspectRatio="none"
                style={{ height: "6px" }}
              >
                <path
                  d="M0 4 Q7.5 0 15 4 T30 4 T45 4 T60 4 T75 4 T90 4 T105 4 T120 4"
                  stroke="var(--red-underline)"
                  fill="none"
                  strokeWidth="2.5"
                />
              </svg>
              <span
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-2.5 py-1 rounded pointer-events-none text-xs z-10"
                style={{
                  backgroundColor: "var(--tooltip-bg)",
                  color: "var(--text)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontStyle: "normal",
                  fontWeight: 400,
                }}
              >
                大王 means &quot;emperor&quot; or &quot;big king&quot; in
                Chinese!
              </span>
            </span>{" "}
            <span>Zhang</span>
          </h1>
          <ThemeToggle />
        </div>

        {/* Bio */}
        <p
          className="text-sm leading-relaxed mb-[3dvh]"
          style={{ color: "var(--bio)" }}
        >
          i&apos;m currently building healthtech AI voice agents at{" "}
          <a
            href="https://www.helloblair.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-all duration-200 hover:text-[var(--accent)] inline-block hover:scale-[1.02] origin-left"
            style={{ color: "var(--accent)" }}
          >
            blair
          </a>{" "}
          and studying{" "}
          <a
            href="https://uwaterloo.ca/engineering/future-students/management-engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-all duration-200 hover:text-[var(--accent)] inline-block hover:scale-[1.02] origin-left"
            style={{ color: "var(--accent)" }}
          >
            management engineering
          </a>{" "}
          at waterloo. i enjoy seeing ideas come to life through tech. in my
          free time, you&apos;ll probably catch me watching some{" "}
          <a
            href="https://letterboxd.com/dzahwa/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-all duration-200 hover:text-[var(--accent)] inline-block hover:scale-[1.02] origin-left"
            style={{ color: "var(--accent)" }}
          >
            movies
          </a>
          .
        </p>

        {/* Currently */}
        <div className="mb-[3dvh]">
          <h2
            className="mb-[1dvh]"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "var(--accent)",
              fontSize: "15px",
            }}
          >
            currently
          </h2>
          <div className="space-y-1.5 text-sm">
            <div
              className="cursor-default"
              style={{
                transform: "scale(1)",
                transition:
                  "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s ease",
                transformOrigin: "left center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div className="flex items-baseline justify-between">
                <span>
                  <span
                    style={{
                      color: "var(--highlight)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Blair AI
                  </span>{" "}
                  · engineering
                </span>
              </div>
              <div
                className="text-xs pt-0.5"
                style={{ color: "var(--muted)", transition: "color 0.2s ease" }}
              >
                ↳ building healthcare AI voice agents for clinical workflows
              </div>
            </div>
            <div
              className="cursor-default"
              style={{
                transform: "scale(1)",
                transition:
                  "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s ease",
                transformOrigin: "left center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div className="flex items-baseline justify-between">
                <span>
                  <span
                    style={{
                      color: "var(--highlight)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    UWaterloo
                  </span>{" "}
                  · management engineering
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Previously */}
        <div className="mb-[3dvh]">
          <h2
            className="mb-[1dvh]"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "var(--accent)",
              fontSize: "15px",
            }}
          >
            previously
          </h2>
          <div className="space-y-1.5 text-sm md:h-[6.125rem] md:overflow-visible">
            {experiences.map((exp) => (
              <ExperienceItem
                key={exp.name}
                exp={exp}
                touchOpen={activeTouch === `exp-${exp.name}`}
                onTouchToggle={() =>
                  setActiveTouch((prev) =>
                    prev === `exp-${exp.name}` ? null : `exp-${exp.name}`,
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-[3dvh]">
          <h2
            className="mb-[1dvh]"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "var(--accent)",
              fontSize: "15px",
            }}
          >
            projects
          </h2>
          <div className="space-y-1.5 text-sm">
            {projects.map((project) => (
              <ProjectItem
                key={project.name}
                project={project}
                touchOpen={activeTouch === `proj-${project.name}`}
                onTouchToggle={() =>
                  setActiveTouch((prev) =>
                    prev === `proj-${project.name}`
                      ? null
                      : `proj-${project.name}`,
                  )
                }
              />
            ))}
            <div className="pt-1">
              <a
                href="https://github.com/d384zhan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-all duration-200 hover:text-[var(--accent)] inline-block hover:scale-[1.02] origin-left"
                style={{ color: "var(--muted)" }}
              >
                rest of my projects →
              </a>
            </div>
          </div>
        </div>

        {/* Writing */}
        <div className="mb-[3dvh]">
          <h2
            className="mb-[1dvh]"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "var(--accent)",
              fontSize: "15px",
            }}
          >
            writing
          </h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            nothing here yet — coming soon.
          </p>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-[2dvh]"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-5 text-xs">
            <a
              href="mailto:d384zhan@uwaterloo.ca"
              className="transition-all duration-200 hover:text-[var(--accent)] hover:underline underline-offset-4 inline-block hover:scale-[1.02] origin-left"
              style={{ color: "var(--footer-link)" }}
            >
              email
            </a>
            <a
              href="https://www.linkedin.com/in/dawang-zhang"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-[var(--accent)] hover:underline underline-offset-4 inline-block hover:scale-[1.02] origin-left"
              style={{ color: "var(--footer-link)" }}
            >
              linkedin
            </a>
            <a
              href="https://github.com/d384zhan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-[var(--accent)] hover:underline underline-offset-4 inline-block hover:scale-[1.02] origin-left"
              style={{ color: "var(--footer-link)" }}
            >
              github
            </a>
            <a
              href="https://x.com/dawangzh"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-[var(--accent)] hover:underline underline-offset-4 inline-block hover:scale-[1.02] origin-left"
              style={{ color: "var(--footer-link)" }}
            >
              x
            </a>
          </div>
          <a
            href="https://v1.dawang.tech"
            className="text-xs transition-all duration-200 hover:text-[var(--accent)] hover:underline underline-offset-4 inline-block hover:scale-[1.02] origin-left"
            style={{ color: "var(--muted)" }}
          >
            v1
          </a>
        </div>
      </main>
    </div>
  );
}
