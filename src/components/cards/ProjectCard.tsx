'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/types'
import { TechTag } from '@/components/ui'
import { GitHubIcon, ChevronDownIcon, ChevronUpIcon } from '@/components/icons'

interface ProjectCardProps {
  project: Project
  isSelected: boolean
  isSiblingSelected: boolean
  onSelect: () => void
  onDeselect: () => void
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="w-full bg-white/30 mb-1 md:mb-2 overflow-hidden relative"
      style={{ aspectRatio: '1.618 / 1' }}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  )
}

function GitHubButton({ href, onClick }: { href: string; onClick: (e: React.MouseEvent) => void }) {
  if (href === "#") return null

  return (
    <Link
      href={href}
      target="_blank"
      className="text-[#1b3c53] flex-shrink-0 hover:opacity-70 transition-opacity"
      onClick={onClick}
    >
      <GitHubIcon className="w-4 h-4 md:w-5 md:h-5" />
    </Link>
  )
}

function TechTags({ technologies, maxTags, size = 'md' }: { technologies: string[]; maxTags: number; size?: 'sm' | 'md' }) {
  return (
    <div className="flex flex-wrap gap-1">
      {technologies.slice(0, maxTags).map((tech, idx) => (
        <TechTag key={idx} label={tech} size={size} />
      ))}
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="pt-2 border-t border-[#1b3c53]/20">
      <h4 className="text-xs font-bold text-[#152a38] uppercase tracking-wider mb-1">About</h4>
      <p className="text-xs font-medium mb-2">{project.subtitle}</p>
      <p className="text-xs leading-relaxed text-[#152a38]/80 whitespace-pre-line">
        {project.extendedDescription}
      </p>
    </div>
  )
}

function MobileMinimizedContent({ title }: { title: string }) {
  return (
    <motion.div
      key="minimized"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex items-center justify-between py-1"
    >
      <span className="font-bold text-sm text-[#152a38]">{title}</span>
      <ChevronDownIcon className="text-[#1b3c53] text-xs" />
    </motion.div>
  )
}

function MobileExpandedContent({ project }: { project: Project }) {
  return (
    <motion.div
      key="expanded"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1 w-full">
          <h3 className="text-sm font-bold truncate">{project.title}</h3>
          <div className="flex items-center gap-2">
            <GitHubButton href={project.github} onClick={(e) => e.stopPropagation()} />
            <ChevronUpIcon className="text-[#1b3c53] text-xs" />
          </div>
        </div>
        <ProjectImage src={project.image} alt={project.title} />
        <p className="text-[10px] mb-1 leading-tight">{project.description}</p>
        <div className="mb-2">
          <TechTags technologies={project.technologies} maxTags={project.maxTags} size="sm" />
        </div>
        <ProjectDetails project={project} />
      </div>
    </motion.div>
  )
}

function DesktopMinimizedOverlay({ title, isVisible }: { title: string; isVisible: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 bg-[#d2c1b6] items-center justify-center z-10 hidden md:flex"
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <span
        className="whitespace-nowrap font-bold text-lg text-[#152a38] tracking-widest lowercase"
        style={{ writingMode: 'vertical-rl' }}
      >
        {title}
      </span>
    </motion.div>
  )
}

function DesktopContent({ project, isSelected, isSiblingSelected }: { project: Project; isSelected: boolean; isSiblingSelected: boolean }) {
  return (
    <motion.div
      className="hidden md:flex flex-row h-full w-full"
      initial={false}
      animate={{ opacity: isSiblingSelected ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex-none w-full md:w-[268px] flex flex-col justify-between md:h-full md:pr-4 md:border-r border-[#1b3c53]/10">
        <div>
          <div className="flex items-center justify-between mb-1 md:mb-2 w-full">
            <h3 className="text-sm md:text-lg font-bold truncate">{project.title}</h3>
            <GitHubButton href={project.github} onClick={(e) => e.stopPropagation()} />
          </div>
          <ProjectImage src={project.image} alt={project.title} />
          <p className="text-[10px] md:text-xs mb-1 md:mb-2 leading-tight">{project.description}</p>
        </div>
        <div>
          <TechTags technologies={project.technologies} maxTags={project.maxTags} />
        </div>
      </div>

      <motion.div
        className="hidden md:flex flex-grow flex-col gap-4 h-full overflow-hidden"
        initial={false}
        animate={{ width: isSelected ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="pl-4 min-w-[250px] md:min-w-[300px] overflow-y-auto h-full">
          <div>
            <h4 className="text-sm font-bold text-[#152a38] uppercase tracking-wider mb-2">About</h4>
            <p className="text-sm font-medium mb-4">{project.subtitle}</p>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-[#152a38]/80 whitespace-pre-line">
              {project.extendedDescription}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectCard({
  project,
  isSelected,
  isSiblingSelected,
  onSelect,
  onDeselect,
}: ProjectCardProps) {
  const isMobileMinimized = !isSelected
  const isHovered = isSelected && !isSiblingSelected

  const handleClick = () => {
    if (isSelected) {
      onDeselect()
    } else {
      onSelect()
    }
  }

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      onSelect()
    }
  }

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      onDeselect()
    }
  }

  return (
    <motion.div
      className={`
        bg-[#d2c1b6] text-black p-2 md:p-3 md:pb-3
        shadow-2xl border-2 border-[#152a38] cursor-pointer
        relative overflow-hidden
        ${isSelected ? 'brightness-110 saturate-150' : (isHovered ? 'brightness-105' : '')}
        transition-[filter] duration-500
      `}
      layout={typeof window !== 'undefined' && window.innerWidth >= 768 ? true : false}
      initial={{ flex: 1 }}
      animate={{ flex: isSelected ? 8 : 1 }}
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DesktopMinimizedOverlay title={project.title} isVisible={isSiblingSelected} />

      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {isMobileMinimized ? (
            <MobileMinimizedContent title={project.title} />
          ) : (
            <MobileExpandedContent project={project} />
          )}
        </AnimatePresence>
      </div>

      <DesktopContent
        project={project}
        isSelected={isSelected}
        isSiblingSelected={isSiblingSelected}
      />
    </motion.div>
  )
}
