'use client'

import { useState } from 'react'
import { ExperienceCard } from '@/components/cards'
import { SectionDivider } from '@/components/ui'
import { experiences } from '@/data'

export function ExperienceSection() {
  const [hoveredRole, setHoveredRole] = useState<number | null>(null)

  return (
    <section id="experience" className="min-h-screen snap-start snap-always relative overflow-hidden flex flex-col justify-center py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic mb-8 md:mb-12">
          experience
        </h2>

        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isHovered={hoveredRole === exp.id}
              onHover={() => setHoveredRole(exp.id)}
              onLeave={() => setHoveredRole(null)}
              onClick={() => setHoveredRole(hoveredRole === exp.id ? null : exp.id)}
            />
          ))}
        </div>
      </div>
      <SectionDivider />
    </section>
  )
}
