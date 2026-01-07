interface TechTagProps {
  label: string
  size?: 'sm' | 'md'
}

export function TechTag({ label, size = 'md' }: TechTagProps) {
  const sizeClasses = size === 'sm'
    ? 'text-[8px]'
    : 'text-[8px] md:text-[10px]'

  return (
    <span className={`bg-[#1b3c53] text-white px-1.5 py-0.5 ${sizeClasses} whitespace-nowrap`}>
      {label}
    </span>
  )
}
