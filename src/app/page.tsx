'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function Portfolio() {
  const [hoveredRole, setHoveredRole] = useState<number | null>(null)
  const [showDawangTooltip, setShowDawangTooltip] = useState(false)

  const experiences = [
    {
      id: 6,
      company: "Blair AI",
      roles: [
        {
          id: "6-1",
          title: "Software Engineer",
          startDate: "Incoming Jan 2026",
          endDate: "",
          description: "building healthcare AI voice agents",
        }
      ]
    },
    {
      id: 5,
      company: "Greenhouse Juice Company",
      sticker: "/ginger.png",
      stickerPosition: "top-right",
      roles: [
        {
          id: "5-1",
          title: "Data/Software Engineer",
          startDate: "Sep 2025",
          endDate: "Dec 2025",
          description: "dashboard maintenance, third-party data migrations, internal app development",
        },
        {
          id: "5-2",
          title: "Operations Analyst",
          startDate: "May 2025",
          endDate: "Aug 2025",
          description: "procurement, workflow automation, building internal apps & data engineering"
        }
      ]
    },
    {
      id: 3,
      company: "Wat.ai",
      roles: [
        {
          id: "3-1",
          title: "Product/Software Engineer",
          startDate: "Feb 2025",
          endDate: "Aug 2025",
          description: "forecast team, eda, product design, and benchmarking for machine learning in oil drilling applications"
        }
      ]
    },
    {
      id: 2,
      company: "Midnight Sun Solar Rayce Car Team",
      roles: [
        {
          id: "2-1",
          title: "Software Developer",
          startDate: "Jan 2025",
          endDate: "Apr 2025",
          description: "backend telemetry and signal decoding for solar car dashboards"
        }
      ]
    },
    {
      id: 1,
      company: "Sunnybrook Health Science Centre",
      sticker: "/prosthetic.png",
      stickerPosition: "bottom-left",
      roles: [
        {
          id: "1-1",
          title: "Data Intern",
          startDate: "Feb 2023",
          endDate: "June 2023",
          description: "data analysis, visualization, and financial reporting under finance and ops",
        }
      ]
    },
  ]

  // Project data with all technologies
  const projects = [
    {
      title: "coinpilot",
      description: "ai-powered crypto market sim",
      technologies: ["next.js", "python", "flask", "supabase", "gemini api", "coinbase api"],
      github: "https://github.com/d384zhan/htv-x",
      maxTags: 4,
      image: "/coinpilot.png"
    },
    {
      title: "familink",
      description: "family connection platform",
      technologies: ["react.js", "node.js", "firebase", "openai api"],
      github: "https://github.com/d384zhan/familink.ai",
      maxTags: 4,
      image: "/familink.png"
    },
    {
      title: "financial planner",
      description: "excel financial tracker",
      technologies: ["vba", "userforms"],
      github: "https://github.com/d384zhan/Financial_Planner",
      maxTags: 2,
      image: "/financial-planner.png"
    },
    {
      title: "excel calendar",
      description: "interactive calendar system",
      technologies: ["vba", "userforms"],
      github: "https://github.com/d384zhan/TimeManagement_Tool",
      maxTags: 2,
      image: "/excel-calendar.png"
    },
    {
      title: "rnow rewards",
      description: "loyalty program design, 3rd national",
      technologies: ["case competition"],
      github: "#",
      maxTags: 1,
      image: "/rnow-rewards.png"
    },
    {
      title: "connect four",
      description: "classic game with OOP design",
      technologies: ["java", "swing", "awt"],
      github: "https://github.com/d384zhan/ConnectFour",
      maxTags: 3,
      image: "/connect-four.png"
    },
  ]

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[#1b3c53] text-white font-mono scrollbar-custom relative">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '12px 12px'
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-24 py-4 md:py-8 text-xs md:text-sm bg-gradient-to-b from-[#152a38] to-transparent">
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center text-[10px] sm:text-xs md:text-sm">
          <div
            className="cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <motion.span
              className="inline-block hover:text-[#d2c1b6] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              about
            </motion.span>
          </div>
          <span>-&gt;</span>
          <div
            className="cursor-pointer"
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <motion.span
              className="inline-block hover:text-[#d2c1b6] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              experience
            </motion.span>
          </div>
          <span>-&gt;</span>
          <div
            className="cursor-pointer"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <motion.span
              className="inline-block hover:text-[#d2c1b6] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              projects
            </motion.span>
          </div>
        </div>
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center text-[10px] sm:text-xs md:text-sm">
          <Link href="https://www.linkedin.com/in/dawang-zhang" className="hover:underline hover:text-[#d2c1b6] transition-all">
            linkedin
          </Link>
          <span>/</span>
          <Link href="https://github.com/d384zhan" className="hover:underline hover:text-[#d2c1b6] transition-all">
            github
          </Link>
          <span>/</span>
          <Link href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#100;&#51;&#56;&#52;&#122;&#104;&#97;&#110;&#64;&#117;&#119;&#97;&#116;&#101;&#114;&#108;&#111;&#111;&#46;&#99;&#97;" className="hover:underline hover:text-[#d2c1b6] transition-all">
            email
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="h-screen snap-start snap-always flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center">
            <div className="w-full md:w-1/2 flex justify-center relative">
              {/* Stacked photo effect */}
              <div className="absolute inset-0 bg-[#d2c1b6] rotate-2 border-2 border-[#152a38] transform scale-95 translate-y-2 translate-x-2"></div>
              <Image
                src="/me.PNG"
                alt="Profile photo"
                width={600}
                height={700}
                className="relative z-10 w-full max-w-sm md:max-w-lg h-auto shadow-2xl border-4 border-white -rotate-2"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl drop-shadow-2xl">
                yo, i'm <span
                  className="italic font-bold relative inline-block cursor-help"
                  onMouseEnter={() => setShowDawangTooltip(true)}
                  onMouseLeave={() => setShowDawangTooltip(false)}
                >
                  Dawang
                  {/* Squiggly underline */}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#ef4444]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  {/* Tooltip */}
                  {showDawangTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-[#d2c1b6] border-2 border-[#152a38] px-4 py-3 whitespace-nowrap z-50 shadow-2xl"
                    >
                      <div className="text-sm text-[#152a38] text-center">
                        <p className="font-bold text-[#152a38] mb-1">Dawang (大王)</p>
                        <p className="text-xs">means "emperor" or "big king" in Chinese!</p>
                      </div>
                    </motion.div>
                  )}
                </span>!
              </h1>
              <p className="text-sm md:text-base leading-relaxed">
                i'm currently a second year <Link href="https://uwaterloo.ca/engineering/future-students/management-engineering" target="_blank" className="text-[#d2c1b6] text-lg md:text-xl italic underline hover:opacity-80 inline-flex items-center gap-1">
                  Management Engineering
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link> student at Waterloo.
              </p>
              <p className="text-sm md:text-base leading-relaxed">i enjoy seeing ideas come to life through tech!</p>
              <p className="text-sm md:text-base leading-relaxed">
                in my free time, you might find me watching <Link href="https://letterboxd.com/dzahwa/" target="_blank" className="text-[#d2c1b6] text-lg md:text-xl underline hover:opacity-80 inline-flex items-center gap-1">
                  movies
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>, reels, or playing basketball (LeBron's the goat!).
              </p>
            </div>
          </div>
          <motion.div
            className="text-center mt-6 md:mt-12 absolute bottom-6 md:bottom-12 left-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-xs md:text-sm">scroll for more...</p>
            <motion.div
              className="mt-2 cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              ▼
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen snap-start snap-always relative overflow-hidden flex flex-col justify-center py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic mb-8 md:mb-12">experience</h2>

          <div className="flex flex-col gap-4">
            {experiences.map((exp) => {
              const isHovered = hoveredRole === exp.id; // Keep using ID for hover state of the entire card

              return (
                <motion.div
                  key={exp.id}
                  className="relative w-full"
                  onMouseEnter={() => setHoveredRole(exp.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                  onClick={() => setHoveredRole(hoveredRole === exp.id ? null : exp.id)}
                  initial={false}
                >
                  {/* Sticker Images - Positioned relative to the experience bar */}
                  {exp.sticker && (
                    <motion.div
                      className="absolute z-20 pointer-events-none hidden md:block"
                      style={{
                        ...(exp.stickerPosition === 'top-right' ? {
                          right: '-88px',
                          top: '-50px',
                          rotate: 15
                        } : {
                          left: '-76px',
                          bottom: '-40px',
                          rotate: -10
                        })
                      }}
                      animate={{
                        rotate: isHovered ? (exp.stickerPosition === 'top-right' ? 25 : -20) : (exp.stickerPosition === 'top-right' ? 15 : -10),
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={exp.sticker}
                        alt="Sticker"
                        width={140}
                        height={140}
                        className="w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-xl"
                      />
                    </motion.div>
                  )}

                  <motion.div
                    className={`
                      relative w-full bg-[#d2c1b6] border-2 border-[#152a38]
                      overflow-hidden transition-colors duration-200
                      ${isHovered ? 'brightness-105' : ''}
                    `}
                    layout
                  >
                    <div className="px-3 py-2 md:px-5 md:py-3 flex flex-col gap-3">
                      {/* Company Header */}
                      <h3 className="text-sm md:text-base font-bold text-[#152a38] lowercase tracking-tight">
                        {exp.company}
                      </h3>

                      {/* Roles */}
                      <div className="relative flex flex-col gap-3">
                        {/* Connecting Line for multiple roles */}
                        {exp.roles.length > 1 && (
                          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[#152a38]/20"></div>
                        )}

                        {exp.roles.map((role, index) => (
                          <div key={role.id} className={`relative flex flex-col ${exp.roles.length > 1 ? 'pl-6' : ''}`}>
                            {/* Dot for timeline */}
                            {exp.roles.length > 1 && (
                              <div className="absolute left-[4px] top-1.5 w-2 h-2 rounded-full bg-[#152a38] ring-2 ring-[#d2c1b6]"></div>
                            )}

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4">
                              <p className="text-xs md:text-sm text-[#152a38]/80 font-medium lowercase">
                                {role.title}
                              </p>
                              <div className="text-xs md:text-sm font-mono text-[#152a38]/60 whitespace-nowrap">
                                {role.endDate ? `${role.startDate} — ${role.endDate}` : role.startDate}
                              </div>
                            </div>

                            {/* Expandable Description */}
                            <motion.div
                              initial={false}
                              animate={{
                                height: isHovered ? 'auto' : 0,
                                opacity: isHovered ? 1 : 0,
                                marginTop: isHovered ? '4px' : 0
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs md:text-sm text-[#152a38] leading-relaxed border-t border-[#152a38]/10 pt-1 mt-1">
                                {role.description}
                              </p>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen md:h-screen snap-start snap-always flex flex-col justify-center relative py-8 md:py-12 lg:py-20 overflow-y-auto md:overflow-visible">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl italic text-right mb-3 md:mb-4 lg:mb-6">projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {projects.map((project, i) => {
              const CardContent = (
                <motion.div
                  className="bg-[#d2c1b6] text-black p-2 md:p-3 flex flex-col justify-between shadow-2xl border-2 border-[#152a38] cursor-pointer h-full"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(210, 193, 182, 0.25)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                      <h3 className="text-base md:text-lg font-bold">{project.title}</h3>
                      {project.github !== "#" && (
                        <div className="text-[#1b3c53]">
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="w-full bg-white/30 mb-1 md:mb-2 overflow-hidden relative" style={{ aspectRatio: '1.618 / 1' }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[10px] md:text-xs mb-1 md:mb-2 leading-tight">{project.description}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-[#1b3c53] text-white px-1.5 py-0.5 text-[10px]">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )

              return project.github !== "#" ? (
                <Link href={project.github} target="_blank" key={i} className="block h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={i} className="block h-full">
                  {CardContent}
                </div>
              )
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>

      {/* Footer */}
      <section className="h-screen snap-start snap-always flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl italic mb-6 md:mb-8">
            unfortunately,
            <br />
            that's it!
          </h2>
          <p className="text-xs md:text-sm mb-12 md:mb-20">wanna chat further? you can find my contact in the top right!</p>
          <div
            className="inline-block cursor-pointer"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <motion.div
              className="text-xs md:text-sm hover:opacity-70 transition-opacity flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="mb-2">^</div>
              <div>back to top!</div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>
    </div>
  )
}
