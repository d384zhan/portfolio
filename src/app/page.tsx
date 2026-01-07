'use client'

import { BackgroundGrid } from '@/components/ui'
import {
  Navigation,
  HeroSection,
  ExperienceSection,
  ProjectsSection,
  FooterSection,
} from '@/components/sections'

export default function Portfolio() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[#1b3c53] text-white font-mono scrollbar-custom relative">
      <BackgroundGrid />
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <FooterSection />
    </div>
  )
}
