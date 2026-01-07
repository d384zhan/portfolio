import Link from 'next/link'

interface SocialLinkProps {
  label: string
  href: string
}

export function SocialLink({ label, href }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="hover:underline hover:text-[#d2c1b6] transition-all"
    >
      {label}
    </Link>
  )
}
