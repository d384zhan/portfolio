import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function Home() {
  return (
    <div
      className={`${playfair.variable} h-screen flex items-center justify-center`}
      style={{
        backgroundColor: "#1a1a1a",
        color: "#b0b0b0",
        fontFamily: "var(--font-space-mono), monospace",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <main className="w-full max-w-[520px] px-6">

        {/* Header */}
        <div className="flex items-baseline justify-between mb-6">
          <h1
            className="text-2xl tracking-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#e8e8e8",
              fontWeight: 400,
            }}
          >
            Dawang Zhang
          </h1>
          <div className="flex items-center gap-4 text-[10px]" style={{ color: "#666" }}>
            <a href="#" className="hover:text-[#d2c1b6] transition-colors">about</a>
            <a href="#" className="hover:text-[#d2c1b6] transition-colors">projects</a>
            <a href="#" className="hover:text-[#d2c1b6] transition-colors">writing</a>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs leading-relaxed mb-6" style={{ color: "#888" }}>
          i&apos;m currently building healthtech AI voice agents at{" "}
          <a
            href="https://www.helloblair.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-[#d2c1b6] transition-colors"
            style={{ color: "#c8c8c8" }}
          >
            blair
          </a>{" "}
          and studying{" "}
          <a
            href="https://uwaterloo.ca/engineering/future-students/management-engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-[#d2c1b6] transition-colors"
            style={{ color: "#c8c8c8" }}
          >
            management engineering
          </a>{" "}
          at waterloo. i enjoy seeing ideas come to life through tech.
          in my free time, you&apos;ll find me watching{" "}
          <a
            href="https://letterboxd.com/dzahwa/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-[#d2c1b6] transition-colors"
            style={{ color: "#c8c8c8" }}
          >
            movies
          </a>
          , playing basketball, or writing.
          大王 means &quot;emperor&quot; in chinese — i try to live up to it.
        </p>

        {/* Currently */}
        <div className="mb-6">
          <h2
            className="text-xs mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#d2c1b6",
              fontSize: "13px",
            }}
          >
            currently
          </h2>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-baseline justify-between">
              <span>
                <a
                  href="https://www.helloblair.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d2c1b6] transition-colors"
                  style={{ color: "#d4d4d4" }}
                >
                  Blair AI
                </a>
                {" "}· software engineer
              </span>
              <span style={{ color: "#555" }}>Jan 2026 —</span>
            </div>
            <div className="text-[10px]" style={{ color: "#666" }}>
              ↳ building healthcare AI voice agents for clinical workflows
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span>
                <span style={{ color: "#d4d4d4" }}>UWaterloo</span>
                {" "}· management engineering
              </span>
              <span style={{ color: "#555" }}>2022 —</span>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2
            className="text-xs mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#d2c1b6",
              fontSize: "13px",
            }}
          >
            projects
          </h2>
          <div className="space-y-1.5 text-xs">
            <div>
              <a
                href="https://github.com/d384zhan/htv-x"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d2c1b6] transition-colors"
                style={{ color: "#d4d4d4" }}
              >
                coinpilot
              </a>
              <span> · AI crypto market sim</span>
              <span className="text-[10px] ml-1" style={{ color: "#555" }}>next.js · python · gemini</span>
            </div>
            <div>
              <a
                href="https://github.com/d384zhan/familink.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d2c1b6] transition-colors"
                style={{ color: "#d4d4d4" }}
              >
                familink
              </a>
              <span> · family connection platform</span>
              <span className="text-[10px] ml-1" style={{ color: "#555" }}>react · firebase · openai</span>
            </div>
            <div>
              <span style={{ color: "#d4d4d4" }}>rnow rewards</span>
              <span> · loyalty program redesign</span>
              <span className="text-[10px] ml-1" style={{ color: "#555" }}>3rd nationally</span>
            </div>
            <div>
              <a
                href="https://github.com/d384zhan/Financial_Planner"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d2c1b6] transition-colors"
                style={{ color: "#d4d4d4" }}
              >
                financial planner
              </a>
              <span> · automated budgeting engine</span>
              <span className="text-[10px] ml-1" style={{ color: "#555" }}>excel vba</span>
            </div>
            <div className="pt-1">
              <a
                href="https://github.com/d384zhan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] hover:text-[#d2c1b6] transition-colors"
                style={{ color: "#666" }}
              >
                rest of my projects →
              </a>
            </div>
          </div>
        </div>

        {/* Previously */}
        <div className="mb-6">
          <h2
            className="text-xs mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#d2c1b6",
              fontSize: "13px",
            }}
          >
            previously
          </h2>
          <div className="space-y-1 text-xs">
            <div className="flex items-baseline justify-between">
              <span><span style={{ color: "#d4d4d4" }}>Greenhouse Juice</span> · data/software engineer</span>
              <span style={{ color: "#555" }}>2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span><span style={{ color: "#d4d4d4" }}>Wat.ai</span> · product/software engineer</span>
              <span style={{ color: "#555" }}>2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span><span style={{ color: "#d4d4d4" }}>Midnight Sun</span> · software developer</span>
              <span style={{ color: "#555" }}>2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span><span style={{ color: "#d4d4d4" }}>Sunnybrook Hospital</span> · data intern</span>
              <span style={{ color: "#555" }}>2023</span>
            </div>
          </div>
        </div>

        {/* Writing */}
        <div className="mb-6">
          <h2
            className="text-xs mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#d2c1b6",
              fontSize: "13px",
            }}
          >
            writing
          </h2>
          <div className="space-y-1 text-xs">
            <div className="flex items-baseline justify-between">
              <a href="#" className="hover:text-[#d2c1b6] transition-colors" style={{ color: "#d4d4d4" }}>
                On Learning to Build
              </a>
              <span style={{ color: "#555" }}>Jan 2026</span>
            </div>
            <div className="flex items-baseline justify-between">
              <a href="#" className="hover:text-[#d2c1b6] transition-colors" style={{ color: "#d4d4d4" }}>
                Between Two Worlds
              </a>
              <span style={{ color: "#555" }}>Nov 2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <a href="#" className="hover:text-[#d2c1b6] transition-colors" style={{ color: "#d4d4d4" }}>
                Notes on Simplicity
              </a>
              <span style={{ color: "#555" }}>Sep 2025</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #2a2a2a" }}>
          <div className="flex items-center gap-4 text-[10px]">
            <a
              href="mailto:d384zhan@uwaterloo.ca"
              className="hover:text-[#d2c1b6] transition-colors"
              style={{ color: "#777" }}
            >
              email
            </a>
            <a
              href="https://www.linkedin.com/in/dawang-zhang"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d2c1b6] transition-colors"
              style={{ color: "#777" }}
            >
              linkedin
            </a>
            <a
              href="https://github.com/d384zhan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d2c1b6] transition-colors"
              style={{ color: "#777" }}
            >
              github
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "#555" }}>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: "#4ade80" }}
            />
            open to work
          </div>
        </div>
      </main>
    </div>
  );
}
