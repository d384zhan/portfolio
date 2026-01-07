'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { SectionDivider } from '@/components/ui'
import { ExternalLinkIcon } from '@/components/icons'

function DawangTooltip() {
  return (
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
  )
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-[#d2c1b6] text-lg md:text-xl italic underline hover:opacity-80 inline-flex items-center gap-1"
    >
      {children}
      <ExternalLinkIcon />
    </Link>
  )
}

function ScrollIndicator() {
  return (
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
          document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        ▼
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const [showDawangTooltip, setShowDawangTooltip] = useState(false)

  return (
    <section id="about" className="h-screen snap-start snap-always flex items-center justify-center relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center">
          <div className="w-full md:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-[#d2c1b6] rotate-2 border-2 border-[#152a38] transform scale-95 translate-y-2 translate-x-2" />
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
              yo, i'm{' '}
              <span
                className="italic font-bold relative inline-block cursor-help"
                onMouseEnter={() => setShowDawangTooltip(true)}
                onMouseLeave={() => setShowDawangTooltip(false)}
              >
                Dawang
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#ef4444]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
                {showDawangTooltip && <DawangTooltip />}
              </span>
              !
            </h1>
            <p className="text-sm md:text-base leading-relaxed">
              i'm currently a second year{' '}
              <ExternalLink href="https://uwaterloo.ca/engineering/future-students/management-engineering">
                Management Engineering
              </ExternalLink>{' '}
              student at Waterloo.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              i enjoy seeing ideas come to life through tech!
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              in my free time, you might find me watching{' '}
              <Link
                href="https://letterboxd.com/dzahwa/"
                target="_blank"
                className="text-[#d2c1b6] text-lg md:text-xl underline hover:opacity-80 inline-flex items-center gap-1"
              >
                movies
                <ExternalLinkIcon />
              </Link>
              , reels, or playing basketball (LeBron's the goat!).
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </div>
      <SectionDivider />
    </section>
  )
}
