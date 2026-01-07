'use client'

import { motion } from 'framer-motion'
import { SectionDivider } from '@/components/ui'

export function FooterSection() {
  const scrollToTop = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="h-screen snap-start snap-always flex flex-col justify-center relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl italic mb-6 md:mb-8">
          unfortunately,
          <br />
          that's it!
        </h2>
        <p className="text-xs md:text-sm mb-12 md:mb-20">
          wanna chat further? you can find my contact in the top right!
        </p>
        <div className="inline-block cursor-pointer" onClick={scrollToTop}>
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
      <SectionDivider />
    </section>
  )
}
