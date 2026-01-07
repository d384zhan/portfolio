'use client'

import { motion } from 'framer-motion'

interface NavLinkProps {
  label: string
  sectionId: string
}

export function NavLink({ label, sectionId }: NavLinkProps) {
  const handleClick = () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <motion.span
        className="inline-block hover:text-[#d2c1b6] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {label}
      </motion.span>
    </div>
  )
}
