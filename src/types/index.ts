export interface Role {
  id: string
  title: string
  startDate: string
  endDate: string
  description: string
}

export interface Experience {
  id: number
  company: string
  sticker?: string
  stickerPosition?: 'top-right' | 'bottom-left'
  roles: Role[]
}

export interface Project {
  title: string
  description: string
  subtitle: string
  extendedDescription: string
  technologies: string[]
  github: string
  maxTags: number
  image: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface NavItem {
  label: string
  sectionId: string
}
