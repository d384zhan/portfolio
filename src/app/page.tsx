"use client";

import { Playfair_Display } from "next/font/google";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const experiences = [
  { name: "Greenhouse Juice", role: "engineering", year: "2025", detail: "built internal tools and data pipelines for operations" },
  { name: "Wat.ai", role: "engineering", year: "2025", detail: "predictive models for oil drilling operations at orecast" },
  { name: "Midnight Sun", role: "engineering", year: "2025", detail: "vehicle telemetry and embedded systems for solar car racing" },
  { name: "Sunnybrook Hospital", role: "data", year: "2023", detail: "data analysis and visualization for finance and operations" },
];

const projects = [
  { name: "coinpilot", desc: "AI crypto market sim", tech: "next.js · python · gemini", href: "https://github.com/d384zhan/htv-x" },
  { name: "familink", desc: "family connection platform", tech: "react · firebase · openai", href: "https://github.com/d384zhan/familink.ai" },
  { name: "rnow rewards", desc: "loyalty program product design", tech: "3rd national", href: null },
  { name: "financial planner", desc: "automated budgeting engine", tech: "excel vba", href: "https://github.com/d384zhan/Financial_Planner" },
];

function ExperienceItem({ exp, touchOpen, onTouchToggle }: { exp: typeof experiences[number]; touchOpen: boolean; onTouchToggle: () => void }) {
  const [hovered, setHovered] = useState(false);
  const touchUsed = useRef(false);
  const active = hovered || touchOpen;

  return (
    <div
      className="cursor-default"
      onMouseEnter={() => { if (!touchUsed.current) setHovered(true); }}
      onMouseLeave={() => { if (!touchUsed.current) setHovered(false); }}
      onTouchEnd={() => { touchUsed.current = true; onTouchToggle(); }}
      style={{ transform: active ? "scale(1.02)" : "scale(1)", transition: "transform 0.2s", transformOrigin: "left center" }}
    >
      <div className="flex items-baseline justify-between">
        <span>
          <span style={{ color: active ? "var(--accent)" : "var(--highlight)", transition: "color 0.2s" }}>
            {exp.name}
          </span>
          {" "}· {exp.role}
        </span>
        <span style={{ color: "var(--muted)" }}>{exp.year}</span>
      </div>
      <AnimatePresence>
        {active && (
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

function ProjectItem({ project, touchOpen, onTouchToggle }: { project: typeof projects[number]; touchOpen: boolean; onTouchToggle: () => void }) {
  const [hovered, setHovered] = useState(false);
  const touchUsed = useRef(false);
  const active = hovered || touchOpen;

  const nameEl = project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: active ? "var(--accent)" : "var(--highlight)", transition: "color 0.2s" }}
    >
      {project.name}
    </a>
  ) : (
    <span
      className="cursor-default"
      style={{ color: active ? "var(--accent)" : "var(--highlight)", transition: "color 0.2s" }}
    >
      {project.name}
    </span>
  );

  return (
    <div
      onMouseEnter={() => { if (!touchUsed.current) setHovered(true); }}
      onMouseLeave={() => { if (!touchUsed.current) setHovered(false); }}
      onTouchEnd={() => { touchUsed.current = true; onTouchToggle(); }}
      style={{ transform: active ? "scale(1.02)" : "scale(1)", transition: "transform 0.2s", transformOrigin: "left center" }}
    >
      <div className="flex items-baseline justify-between">
        <span>
          {nameEl}
          <span> · {project.desc}</span>
        </span>
        <AnimatePresence>
          {hovered && !touchOpen && (
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              exit={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="whitespace-nowrap flex-shrink-0 text-xs pl-3"
              style={{ color: "var(--muted)" }}
            >
              {project.tech}
            </motion.span>
          )}
        </AnimatePresence>
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

  return (
    <div
      className={`${playfair.variable} h-dvh w-full overflow-x-hidden overflow-y-auto md:overflow-hidden flex justify-center items-start md:items-center`}
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-space-mono), monospace",
        backgroundImage:
          "radial-gradient(var(--dot-grid) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
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
                className="absolute -top-9 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-2.5 py-1 rounded pointer-events-none text-xs"
                style={{
                  backgroundColor: "var(--tooltip-bg)",
                  color: "var(--text)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontStyle: "normal",
                  fontWeight: 400,
                }}
              >
                大王 means &quot;emperor&quot; or &quot;big king&quot; in Chinese!
              </span>
            </span>
            {" "}Zhang
          </h1>
          <ThemeToggle />
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed mb-[3dvh]" style={{ color: "var(--bio)" }}>
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
          at waterloo. i enjoy seeing ideas come to life through tech.
          in my free time, you&apos;ll probably catch me watching some{" "}
          <a
            href="https://letterboxd.com/dzahwa/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-all duration-200 hover:text-[var(--accent)] inline-block hover:scale-[1.02] origin-left"
            style={{ color: "var(--accent)" }}
          >
            movies
          </a>.
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
            <div className="flex items-baseline justify-between">
              <span>
                <span
                  className="cursor-default transition-all duration-200 hover:text-[var(--accent)] inline-block hover:scale-[1.02] origin-left"
                  style={{ color: "var(--highlight)" }}
                >
                  Blair AI
                </span>
                {" "}· engineering
              </span>
            </div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              ↳ building healthcare AI voice agents for clinical workflows
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span>
                <span className="cursor-default transition-all duration-200 hover:text-[var(--accent)] inline-block hover:scale-[1.02] origin-left" style={{ color: "var(--highlight)" }}>UWaterloo</span>
                {" "}· management engineering
              </span>
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
                onTouchToggle={() => setActiveTouch((prev) => prev === `exp-${exp.name}` ? null : `exp-${exp.name}`)}
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
                onTouchToggle={() => setActiveTouch((prev) => prev === `proj-${project.name}` ? null : `proj-${project.name}`)}
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
        <div className="flex items-center justify-between pt-[2dvh]" style={{ borderTop: "1px solid var(--border-subtle)" }}>
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
