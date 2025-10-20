'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function Portfolio() {
  const [hoveredRole, setHoveredRole] = useState<number | null>(null)
  const [overflowState, setOverflowState] = useState<{ [key: string]: boolean }>({})
  const [showDawangTooltip, setShowDawangTooltip] = useState(false)
  const textRefs = useRef<{ [key: string]: HTMLParagraphElement | null }>({})
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Check for text overflow after render and on resize
  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowState: { [key: string]: boolean } = {}
      Object.keys(textRefs.current).forEach((key) => {
        const el = textRefs.current[key]
        const container = containerRefs.current[key]
        if (el && container) {
          // Check if text content is wider than the container
          const isOverflowing = el.scrollWidth > container.clientWidth
          newOverflowState[key] = isOverflowing
        }
      })
      setOverflowState(newOverflowState)
    }
    
    // Check multiple times to ensure DOM is fully ready
    checkOverflow()
    const timer1 = setTimeout(checkOverflow, 50)
    const timer2 = setTimeout(checkOverflow, 200)
    
    // Recheck on window resize
    window.addEventListener('resize', checkOverflow)
    return () => {
      window.removeEventListener('resize', checkOverflow)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [hoveredRole]) // Re-check when hover state changes

  // Timeline data - NO GAPS, scaled to fill 100% by treating gaps as 0 width
  // Visual flow: Sunnybrook → Midnight+Wat.ai overlap → GH Ops (ends with Wat.ai) → GH Data
  // 
  // Timeline segments (no gaps):
  // 1. Sunnybrook: 5 months
  // 2. Midnight Sun: Jan-Apr 2025 (4mo), Wat.ai: Feb-Aug 2025 (7mo)
  //    - Midnight starts Jan, Wat.ai starts Feb (1mo later), both roles continue
  //    - Visual span needed: Jan to Aug = 8 months of calendar time
  // 3. GH Data: 2 months
  //
  // Total visual width: 5 + 8 + 2 = 15 month-equivalents
  // Scale factor: 100 / 15 = 6.67% per month-equivalent
  const experiences = [
    { 
      id: 1, 
      title: "Data Intern", 
      company: "Sunnybrook Health Science Centre", 
      startDate: "Feb 2023",
      endDate: "June 2023",
      duration: 5,
      startPosition: 0, 
      width: 33.33, // (5/15) × 100 = 33.33%
      track: 0,
      description: "data analysis, visualization, and financial reporting under finance and ops"
    },
    { 
      id: 2, 
      title: "Software Developer", 
      company: "Midnight Sun Solar Rayce Car Team", 
      startDate: "Jan 2025",
      endDate: "Apr 2025",
      duration: 4,
      startPosition: 33.33, // Right after Sunnybrook
      width: 26.67, // (4/15) × 100 = 26.67%
      track: -1,
      description: "backend telemetry and signal decoding for solar car dashboards"
    },
    { 
      id: 3, 
      title: "Product/Software Engineer", 
      company: "Wat.ai", 
      startDate: "Feb 2025",
      endDate: "Aug 2025",
      duration: 7,
      startPosition: 40, // Starts 1 month after Midnight: 33.33 + (1/15)×100 = 40%
      width: 46.67, // (7/15) × 100 = 46.67%, ends at 86.67%
      track: 1,
      description: "orecast team, eda, product design, and benchmarking for machine learning in oil drilling applications"
    },
    { 
      id: 4, 
      title: "Operations Analyst", 
      company: "Greenhouse Juice Company", 
      startDate: "May 2025",
      endDate: "Aug 2025",
      duration: 4,
      startPosition: 60, // Starts when Midnight ends: 33.33 + 26.67 = 60%
      width: 26.67, // (4/15) × 100 = 26.67%, ends at 86.67% (same as Wat.ai!)
      track: -1,
      description: "procurement, workflow automation, building internal apps & data engineering"
    },
    { 
      id: 5, 
      title: "Data/Software Engineer", 
      company: "Greenhouse Juice Company", 
      startDate: "Sep 2025",
      endDate: "Present",
      duration: 2,
      startPosition: 86.67, // Starts when Wat.ai and GH Ops end
      width: 13.33, // (2/15) × 100 = 13.33%, fills to 100%
      track: 0,
      description: "dashboard maintenance, third-party data migrations, internal app development"
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
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 8px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 8px)
          `,
          backgroundSize: '8px 8px'
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 lg:px-24 py-8 text-sm bg-gradient-to-b from-[#152a38] to-transparent">
        <div className="flex gap-3 items-center">
          <Link href="#about" className="hover:underline hover:text-[#d2c1b6] transition-all">
            about
          </Link>
          <span>-&gt;</span>
          <Link href="#experience" className="hover:underline hover:text-[#d2c1b6] transition-all">
            experience
          </Link>
          <span>-&gt;</span>
          <Link href="#projects" className="hover:underline hover:text-[#d2c1b6] transition-all">
            projects
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="https://www.linkedin.com/in/dawang-zhang" className="hover:underline hover:text-[#d2c1b6] transition-all">
            linkedin
          </Link>
          <span>/</span>
          <Link href="https://github.com/d384zhan" className="hover:underline hover:text-[#d2c1b6] transition-all">
            github
          </Link>
          <span>/</span>
          <Link href="mailto:d384zhan@uwaterloo.ca" className="hover:underline hover:text-[#d2c1b6] transition-all">
            email
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="h-screen snap-start snap-always flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 w-full">
          <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/me.PNG"
                alt="Profile photo"
                width={600}
                height={700}
                className="w-full max-w-lg h-auto shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-5xl md:text-6xl drop-shadow-2xl">
                yo, i'm <span 
                  className="italic font-bold relative inline-block cursor-help"
                  onMouseEnter={() => setShowDawangTooltip(true)}
                  onMouseLeave={() => setShowDawangTooltip(false)}
                >
                  Dawang
                  {/* Red squiggly underline */}
                  <svg className="absolute -bottom-1 left-0 w-full h-2" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path 
                      d="M 0 5 Q 2.5 0, 5 5 T 10 5 T 15 5 T 20 5 T 25 5 T 30 5 T 35 5 T 40 5 T 45 5 T 50 5 T 55 5 T 60 5 T 65 5 T 70 5 T 75 5 T 80 5 T 85 5 T 90 5 T 95 5 T 100 5" 
                      stroke="#ef4444" 
                      strokeWidth="1.5" 
                      fill="none"
                    />
                  </svg>
                  {/* Tooltip */}
                  {showDawangTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-[#152a38] border-2 border-[#d2c1b6] rounded-lg px-4 py-3 whitespace-nowrap z-50 shadow-2xl"
                    >
                      <div className="text-sm text-white text-center">
                        <p className="font-bold text-[#d2c1b6] mb-1">Dawang (大王)</p>
                        <p className="text-xs">means "emperor" or "big king" in Chinese!</p>
                      </div>
                      {/* Arrow pointing up */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#d2c1b6]"></div>
                    </motion.div>
                  )}
                </span>!
              </h1>
              <p className="text-base leading-relaxed">
                i'm currently a second year <Link href="https://uwaterloo.ca/engineering/future-students/management-engineering" target="_blank" className="text-[#d2c1b6] text-xl italic underline hover:opacity-80 inline-flex items-center gap-1">
                  Management Engineering
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link> student at Waterloo.
              </p>
              <p className="text-base leading-relaxed">i enjoy seeing ideas come to life through tech!</p>
              <p className="text-base leading-relaxed">
                in my free time, you might find me watching <Link href="https://letterboxd.com/dzahwa/" target="_blank" className="text-[#d2c1b6] text-xl underline hover:opacity-80 inline-flex items-center gap-1">
                  movies
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>, reels, or playing basketball (LeBron's the goat!).
              </p>
            </div>
          </div>
          <motion.div 
            className="text-center mt-12 absolute bottom-12 left-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-sm">scroll for more...</p>
            <motion.div 
              className="mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ▼
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="h-screen snap-start snap-always relative overflow-hidden flex flex-col">
        {/* Title and subtitle aligned with projects section */}
        <div className="max-w-6xl mx-auto px-12 lg:px-20 w-full pt-28">
          <h2 className="text-4xl md:text-5xl italic mb-3">experience</h2>
          <p className="text-sm text-white/70">hover over a bar to see details!</p>
        </div>
        
        {/* Timeline centered vertically in remaining space */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-12 lg:px-24 w-full">
            {/* Bar-Based Timeline */}
            <div className="relative w-full h-[500px] px-16">
            {/* Sticker Images - Larger and positioned near respective companies */}
            {/* Prosthetic near Sunnybrook - moved 128px further left */}
            <motion.div
              className="absolute w-32 h-32 pointer-events-none z-20"
              style={{ 
                left: 'calc(5% - 128px)',
                top: '35%',
                rotate: -15 
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Image
                src="/prosthetic.png"
                alt="Prosthetic sticker"
                width={128}
                height={128}
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(210,193,182,0.4)]"
                style={{ 
                  filter: 'drop-shadow(0 0 0 rgba(255,255,255,0.8)) drop-shadow(0 0 1px rgba(255,255,255,0.9))',
                }}
              />
            </motion.div>

            {/* Ginger near Greenhouse sections - moved 128px further right */}
            <motion.div
              className="absolute w-36 h-36 pointer-events-none z-20"
              style={{ 
                right: 'calc(10% - 128px)',
                top: '55%',
                rotate: 12 
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Image
                src="/ginger.png"
                alt="Ginger sticker"
                width={144}
                height={144}
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(210,193,182,0.4)]"
                style={{ 
                  filter: 'drop-shadow(0 0 0 rgba(255,255,255,0.8)) drop-shadow(0 0 1px rgba(255,255,255,0.9))',
                }}
              />
            </motion.div>

            {/* Timeline Labels */}
            <div className="absolute top-1/2 -translate-y-1/2 left-16 text-xs text-[#d2c1b6]/50">
              Feb 2023
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-16 text-xs text-[#d2c1b6]/50">
              Present
            </div>

            {/* Main Timeline Line */}
            <div className="absolute top-1/2 -translate-y-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-white/20 via-[#d2c1b6]/40 to-white/20"></div>
            
            {/* Timeline Bars */}
            <div className="absolute top-1/2 -translate-y-1/2 left-16 right-16 h-56">
              {experiences.map((exp, index) => {
                const isHovered = hoveredRole === exp.id;
                // Calculate vertical position based on track
                // track -1 (above): -70px, track 0 (center): 0px, track 1 (below): 70px
                const verticalOffset = exp.track * 70;
                
                return (
                  <div
                    key={exp.id}
                    className="absolute -translate-y-1/2 cursor-pointer z-10"
                    style={{
                      left: `${exp.startPosition}%`,
                      width: `${exp.width}%`,
                      top: `calc(50% + ${verticalOffset}px)`
                    }}
                    onMouseEnter={() => setHoveredRole(exp.id)}
                    onMouseLeave={() => setHoveredRole(null)}
                  >
                    {/* Connecting Line to Timeline */}
                    {exp.track !== 0 && (
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 w-px bg-white/10"
                        style={{
                          height: `${Math.abs(verticalOffset)}px`,
                          top: exp.track === -1 ? '100%' : 'auto',
                          bottom: exp.track === 1 ? '100%' : 'auto'
                        }}
                      />
                    )}

                    {/* Morphing Bar Container */}
                    <motion.div
                      className={`relative bg-[#d2c1b6] border-2 border-[#152a38] shadow-lg overflow-hidden transition-all duration-200 ${isHovered ? 'brightness-110 shadow-2xl' : ''}`}
                    >
                      {/* Description - expands above/below */}
                      <motion.div
                        className={`px-4 ${
                          exp.track === -1 ? 'order-first' : 'order-last'
                        }`}
                        initial={false}
                        animate={{ 
                          height: isHovered ? 'auto' : 0,
                          opacity: isHovered ? 1 : 0,
                          paddingTop: isHovered ? '12px' : 0,
                          paddingBottom: isHovered ? '4px' : 0,
                        }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p className="text-[11px] text-[#1b3c53] leading-snug">
                          {exp.description}
                        </p>
                      </motion.div>

                      {/* Main Bar Content - always visible */}
                      <div className="h-18 px-4 py-3 flex flex-col justify-center overflow-hidden">
                        {/* Continuous scrolling company name - carousel style */}
                        <div 
                          ref={(el) => { containerRefs.current[`company-${exp.id}`] = el }}
                          className="relative overflow-hidden mb-0.5"
                        >
                          {isHovered && overflowState[`company-${exp.id}`] ? (
                            // Duplicate text for seamless loop with spacing
                            <motion.div
                              className="flex"
                              animate={{
                                x: [0, -1000],
                              }}
                              transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                              }}
                            >
                              <p
                                ref={(el) => { textRefs.current[`company-${exp.id}`] = el }}
                                className="text-sm font-bold text-[#152a38] leading-tight whitespace-nowrap pr-12"
                              >
                                {exp.company}
                              </p>
                              <p className="text-sm font-bold text-[#152a38] leading-tight whitespace-nowrap pr-12">
                                {exp.company}
                              </p>
                              <p className="text-sm font-bold text-[#152a38] leading-tight whitespace-nowrap pr-12">
                                {exp.company}
                              </p>
                              <p className="text-sm font-bold text-[#152a38] leading-tight whitespace-nowrap pr-12">
                                {exp.company}
                              </p>
                            </motion.div>
                          ) : (
                            <p
                              ref={(el) => { textRefs.current[`company-${exp.id}`] = el }}
                              className="text-sm font-bold text-[#152a38] leading-tight whitespace-nowrap"
                            >
                              {exp.company}
                            </p>
                          )}
                        </div>
                        {/* Continuous scrolling title - carousel style */}
                        <div 
                          ref={(el) => { containerRefs.current[`title-${exp.id}`] = el }}
                          className="relative overflow-hidden"
                        >
                          {isHovered && overflowState[`title-${exp.id}`] ? (
                            // Duplicate text for seamless loop with spacing
                            <motion.div
                              className="flex"
                              animate={{
                                x: [0, -1000],
                              }}
                              transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                              }}
                            >
                              <p
                                ref={(el) => { textRefs.current[`title-${exp.id}`] = el }}
                                className="text-xs text-[#152a38]/70 whitespace-nowrap pr-12"
                              >
                                {exp.title}
                              </p>
                              <p className="text-xs text-[#152a38]/70 whitespace-nowrap pr-12">
                                {exp.title}
                              </p>
                              <p className="text-xs text-[#152a38]/70 whitespace-nowrap pr-12">
                                {exp.title}
                              </p>
                              <p className="text-xs text-[#152a38]/70 whitespace-nowrap pr-12">
                                {exp.title}
                              </p>
                            </motion.div>
                          ) : (
                            <p
                              ref={(el) => { textRefs.current[`title-${exp.id}`] = el }}
                              className="text-xs text-[#152a38]/70 whitespace-nowrap"
                            >
                              {exp.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Date Labels */}
                    <div 
                      className="absolute left-0 text-[11px] text-white/40 whitespace-nowrap font-mono"
                      style={{
                        top: exp.track === -1 ? '-24px' : 'auto',
                        bottom: exp.track === -1 ? 'auto' : '-24px'
                      }}
                    >
                      {exp.startDate}
                    </div>
                    <div 
                      className="absolute right-0 text-[10px] text-white/50 whitespace-nowrap"
                      style={{
                        top: exp.track === -1 ? '-24px' : 'auto',
                        bottom: exp.track === -1 ? 'auto' : '-24px'
                      }}
                    >
                      {exp.endDate}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen snap-start snap-always flex flex-col justify-center relative py-20">
        <div className="max-w-6xl mx-auto px-12 lg:px-20 w-full">
          <h2 className="text-3xl md:text-4xl italic text-right mb-6">projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((project, i) => {
              const visibleTags = project.technologies.slice(0, project.maxTags)
              const remainingCount = project.technologies.length - project.maxTags
              
              return (
                <motion.div 
                  key={i} 
                  className="bg-[#d2c1b6] text-black p-3 flex flex-col justify-between shadow-2xl border-2 border-[#152a38] cursor-pointer"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(210, 193, 182, 0.25)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      {project.github !== "#" && (
                        <Link href={project.github} target="_blank" className="text-[#1b3c53] hover:opacity-70 transition-opacity">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                      )}
                    </div>
                    <div className="w-full bg-white/30 mb-2 overflow-hidden relative" style={{ aspectRatio: '1.618 / 1' }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs mb-2 leading-tight">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {visibleTags.map((tech, idx) => (
                        <span key={idx} className="bg-[#1b3c53] text-white px-1.5 py-0.5 text-[10px]">{tech}</span>
                      ))}
                      {remainingCount > 0 && (
                        <span className="bg-[#1b3c53] text-white px-1.5 py-0.5 text-[10px]">+{remainingCount}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>

      {/* Footer */}
      <section className="h-screen snap-start snap-always flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 text-center w-full">
          <h2 className="text-4xl md:text-5xl italic mb-8">
            unfortunately,
            <br />
            that's it!
          </h2>
          <p className="text-sm mb-20">wanna chat further? you can find my contact in the top right!</p>
          <Link href="#about" className="text-sm hover:opacity-70 transition-opacity inline-block">
            <div className="mb-2">^</div>
            <div>back to top!</div>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </section>
    </div>
  )
}
