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
        backgroundColor: "#1c1a18",
        color: "#a5a09a",
        fontFamily: "var(--font-space-mono), monospace",
        backgroundImage:
          "radial-gradient(rgba(201,168,124,0.06) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <main className="w-full max-w-[580px] px-6">

        {/* Header */}
        <div className="flex items-baseline justify-between mb-6">
          <h1
            className="text-3xl md:text-4xl tracking-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#e8e5df",
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
                  stroke="#ef4444"
                  fill="none"
                  strokeWidth="2.5"
                />
              </svg>
              <span
                className="absolute -top-9 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-2.5 py-1 rounded pointer-events-none text-xs"
                style={{
                  backgroundColor: "#2a2420",
                  color: "#c9a87c",
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
          <div className="flex items-center gap-4 text-xs" style={{ color: "#5a5550" }}>
            <a href="#" className="hover:text-[#c9a87c] transition-colors duration-200">about</a>
            <a href="#" className="hover:text-[#c9a87c] transition-colors duration-200">projects</a>
            <a href="#" className="hover:text-[#c9a87c] transition-colors duration-200">writing</a>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed mb-7" style={{ color: "#8a8580" }}>
          i&apos;m currently building healthtech AI voice agents at{" "}
          <a
            href="https://www.helloblair.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block underline underline-offset-4 scale-100 transition-all duration-200 hover:text-[#c9a87c] hover:scale-[1.04] origin-left"
            style={{ color: "#c9a87c", willChange: "transform" }}
          >
            blair
          </a>{" "}
          and studying{" "}
          <a
            href="https://uwaterloo.ca/engineering/future-students/management-engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block underline underline-offset-4 scale-100 transition-all duration-200 hover:text-[#c9a87c] hover:scale-[1.04] origin-left"
            style={{ color: "#c9a87c", willChange: "transform" }}
          >
            management engineering
          </a>{" "}
          at waterloo. i enjoy seeing ideas come to life through tech.
          in my free time, you&apos;ll find me watching{" "}
          <a
            href="https://letterboxd.com/dzahwa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block underline underline-offset-4 scale-100 transition-all duration-200 hover:text-[#c9a87c] hover:scale-[1.04] origin-left"
            style={{ color: "#c9a87c", willChange: "transform" }}
          >
            movies
          </a>
          , playing basketball, or writing.
        </p>

        {/* Currently */}
        <div className="mb-7">
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#c9a87c",
              fontSize: "15px",
            }}
          >
            currently
          </h2>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-baseline justify-between">
              <span>
                <a
                  href="https://www.helloblair.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c]"
                  style={{ color: "#d6d2cc", willChange: "transform" }}
                >
                  Blair AI
                </a>
                {" "}· engineering
              </span>
            </div>
            <div className="text-xs" style={{ color: "#5a5550" }}>
              ↳ building healthcare AI voice agents for clinical workflows
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span>
                <span className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c] cursor-default" style={{ color: "#d6d2cc", willChange: "transform" }}>UWaterloo</span>
                {" "}· management engineering
              </span>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-7">
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#c9a87c",
              fontSize: "15px",
            }}
          >
            projects
          </h2>
          <div className="space-y-1.5 text-sm">
            <div>
              <a
                href="https://github.com/d384zhan/htv-x"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c]"
                style={{ color: "#d6d2cc", willChange: "transform" }}
              >
                coinpilot
              </a>
              <span> · AI crypto market sim</span>
              <span className="text-xs ml-1.5" style={{ color: "#5a5550" }}>next.js · python · gemini</span>
            </div>
            <div>
              <a
                href="https://github.com/d384zhan/familink.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c]"
                style={{ color: "#d6d2cc", willChange: "transform" }}
              >
                familink
              </a>
              <span> · family connection platform</span>
              <span className="text-xs ml-1.5" style={{ color: "#5a5550" }}>react · firebase · openai</span>
            </div>
            <div>
              <span className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c] cursor-default" style={{ color: "#d6d2cc", willChange: "transform" }}>rnow rewards</span>
              <span> · loyalty program product design</span>
              <span className="text-xs ml-1.5" style={{ color: "#5a5550" }}>3rd national</span>
            </div>
            <div>
              <a
                href="https://github.com/d384zhan/Financial_Planner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c]"
                style={{ color: "#d6d2cc", willChange: "transform" }}
              >
                financial planner
              </a>
              <span> · automated budgeting engine</span>
              <span className="text-xs ml-1.5" style={{ color: "#5a5550" }}>excel vba</span>
            </div>
            <div className="pt-1">
              <a
                href="https://github.com/d384zhan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors duration-200 hover:text-[#c9a87c]"
                style={{ color: "#5a5550" }}
              >
                rest of my projects →
              </a>
            </div>
          </div>
        </div>

        {/* Previously */}
        <div className="mb-7">
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#c9a87c",
              fontSize: "15px",
            }}
          >
            previously
          </h2>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-baseline justify-between">
              <span><span className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c] cursor-default" style={{ color: "#d6d2cc", willChange: "transform" }}>Greenhouse Juice</span> · engineering</span>
              <span style={{ color: "#5a5550" }}>2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span><span className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c] cursor-default" style={{ color: "#d6d2cc", willChange: "transform" }}>Wat.ai</span> · engineering</span>
              <span style={{ color: "#5a5550" }}>2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span><span className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c] cursor-default" style={{ color: "#d6d2cc", willChange: "transform" }}>Midnight Sun</span> · engineering</span>
              <span style={{ color: "#5a5550" }}>2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span><span className="inline-block scale-100 transition-transform duration-200 hover:scale-[1.04] origin-left hover:text-[#c9a87c] cursor-default" style={{ color: "#d6d2cc", willChange: "transform" }}>Sunnybrook Hospital</span> · data</span>
              <span style={{ color: "#5a5550" }}>2023</span>
            </div>
          </div>
        </div>

        {/* Writing */}
        <div className="mb-7">
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              color: "#c9a87c",
              fontSize: "15px",
            }}
          >
            writing
          </h2>
          <p className="text-sm" style={{ color: "#5a5550" }}>
            nothing here yet — coming soon.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(201,168,124,0.12)" }}>
          <div className="flex items-center gap-5 text-xs">
            <a
              href="mailto:d384zhan@uwaterloo.ca"
              className="inline-block scale-100 transition-all duration-200 hover:scale-[1.06] origin-left hover:text-[#c9a87c] hover:underline underline-offset-4"
              style={{ color: "#6b655e", willChange: "transform" }}
            >
              email
            </a>
            <a
              href="https://www.linkedin.com/in/dawang-zhang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block scale-100 transition-all duration-200 hover:scale-[1.06] origin-left hover:text-[#c9a87c] hover:underline underline-offset-4"
              style={{ color: "#6b655e", willChange: "transform" }}
            >
              linkedin
            </a>
            <a
              href="https://github.com/d384zhan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block scale-100 transition-all duration-200 hover:scale-[1.06] origin-left hover:text-[#c9a87c] hover:underline underline-offset-4"
              style={{ color: "#6b655e", willChange: "transform" }}
            >
              github
            </a>
            <a
              href="https://x.com/dawangzh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block scale-100 transition-all duration-200 hover:scale-[1.06] origin-left hover:text-[#c9a87c] hover:underline underline-offset-4"
              style={{ color: "#6b655e", willChange: "transform" }}
            >
              x
            </a>
          </div>
          <a
            href="https://v1.dawang.tech"
            className="text-xs inline-block scale-100 transition-all duration-200 hover:scale-[1.06] origin-right hover:text-[#c9a87c] hover:underline underline-offset-4"
            style={{ color: "#5a5550", willChange: "transform" }}
          >
            v1
          </a>
        </div>
      </main>
    </div>
  );
}
