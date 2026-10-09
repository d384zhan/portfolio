import type { Inline } from "@/content";

// External links open in a new tab; site links and mailto stay put.
export function Link({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} {...external}>
      {children}
    </a>
  );
}

export const inline = (parts: Inline[]) =>
  parts.map((part, i) =>
    typeof part === "string" ? (
      <span key={i}>{part}</span>
    ) : (
      <Link key={i} href={part.href}>
        {part.text}
      </Link>
    ),
  );
