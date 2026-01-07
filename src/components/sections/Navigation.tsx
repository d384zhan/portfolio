'use client'

import { NavLink, SocialLink } from '@/components/ui'
import { navItems, socialLinks } from '@/data'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-24 py-4 md:py-8 text-xs md:text-sm bg-gradient-to-b from-[#152a38] to-transparent">
      <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center text-[10px] sm:text-xs md:text-sm">
        {navItems.map((item, index) => (
          <div key={item.sectionId} className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {index > 0 && <span>-&gt;</span>}
            <NavLink label={item.label} sectionId={item.sectionId} />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center text-[10px] sm:text-xs md:text-sm">
        {socialLinks.map((link, index) => (
          <div key={link.label} className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {index > 0 && <span>/</span>}
            <SocialLink label={link.label} href={link.href} />
          </div>
        ))}
      </div>
    </nav>
  )
}
