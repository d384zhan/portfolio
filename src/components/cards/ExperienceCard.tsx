'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Experience } from '@/types'

interface ExperienceCardProps {
  experience: Experience
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

export function ExperienceCard({
  experience,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: ExperienceCardProps) {
  const stickerStyles = experience.stickerPosition === 'top-right'
    ? { right: '-88px', top: '-50px', rotate: 15 }
    : { left: '-76px', bottom: '-40px', rotate: -10 }

  const stickerHoverRotate = experience.stickerPosition === 'top-right' ? 25 : -20
  const stickerDefaultRotate = experience.stickerPosition === 'top-right' ? 15 : -10

  return (
    <motion.div
      className="relative w-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      initial={false}
    >
      {experience.sticker && (
        <motion.div
          className="absolute z-20 pointer-events-none hidden md:block"
          style={stickerStyles}
          animate={{
            rotate: isHovered ? stickerHoverRotate : stickerDefaultRotate,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={experience.sticker}
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
          <h3 className="text-sm md:text-base font-bold text-[#152a38] lowercase tracking-tight">
            {experience.company}
          </h3>

          <div className="relative flex flex-col gap-3">
            {experience.roles.length > 1 && (
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[#152a38]/20" />
            )}

            {experience.roles.map((role) => (
              <div
                key={role.id}
                className={`relative flex flex-col ${experience.roles.length > 1 ? 'pl-6' : ''}`}
              >
                {experience.roles.length > 1 && (
                  <div className="absolute left-[4px] top-1.5 w-2 h-2 rounded-full bg-[#152a38] ring-2 ring-[#d2c1b6]" />
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4">
                  <p className="text-xs md:text-sm text-[#152a38]/80 font-medium lowercase">
                    {role.title}
                  </p>
                  <div className="text-xs md:text-sm font-mono text-[#152a38]/60 whitespace-nowrap">
                    {role.endDate ? `${role.startDate} — ${role.endDate}` : role.startDate}
                  </div>
                </div>

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
  )
}
