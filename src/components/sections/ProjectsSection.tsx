'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ProjectCard } from '@/components/cards'
import { SectionDivider } from '@/components/ui'
import { projects } from '@/data'

const PROJECTS_PER_ROW = 3

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<{ row: number; col: number } | null>(null)

  const projectRows = Array.from(
    { length: Math.ceil(projects.length / PROJECTS_PER_ROW) },
    (_, i) => projects.slice(i * PROJECTS_PER_ROW, (i + 1) * PROJECTS_PER_ROW)
  )

  return (
    <section id="projects" className="min-h-screen md:h-screen snap-start snap-always flex flex-col justify-center relative py-8 md:py-12 lg:py-20 overflow-y-auto md:overflow-visible">
      <div className="max-w-5xl mx-auto px-4 md:px-12 lg:px-20 w-full">
        <h2 className="text-2xl md:text-3xl lg:text-4xl italic text-right mb-3 md:mb-4 lg:mb-6 mt-8 md:mt-12">
          projects
        </h2>

        <div className="flex flex-col gap-2 md:gap-3">
          {projectRows.map((rowProjects, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row gap-2 md:gap-3 w-full h-auto md:h-[18.1rem]">
              {rowProjects.map((project, colIndex) => {
                const isSelected = selectedProject?.row === rowIndex && selectedProject?.col === colIndex
                const isRowSelected = selectedProject?.row === rowIndex
                const isSiblingSelected = isRowSelected && !isSelected

                return (
                  <ProjectCard
                    key={colIndex}
                    project={project}
                    isSelected={isSelected}
                    isSiblingSelected={isSiblingSelected}
                    onSelect={() => setSelectedProject({ row: rowIndex, col: colIndex })}
                    onDeselect={() => setSelectedProject(null)}
                  />
                )
              })}
            </div>
          ))}
        </div>

        <p className="text-center text-xs md:text-sm mt-4 md:mt-6 opacity-70">
          rest of my projects can be found on{' '}
          <Link
            href="https://github.com/d384zhan"
            target="_blank"
            className="underline hover:opacity-80 transition-opacity"
          >
            github
          </Link>
        </p>
      </div>
      <SectionDivider />
    </section>
  )
}
