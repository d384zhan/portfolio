import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Posts live in content/writing as .mdx (or .md) files with frontmatter:
//
//   ---
//   title: "Post title"
//   date: "2026-10-04"
//   summary: "One line for the index."
//   draft: true
//   ---
//
// The filename is the slug. Drafts are hidden in production builds.

const DIR = path.join(process.cwd(), "content", "writing");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  draft: boolean;
};

export type Post = PostMeta & { body: string };

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? file),
    date: String(data.date ?? ""),
    summary: data.summary ? String(data.summary) : undefined,
    draft: Boolean(data.draft),
    body: content,
  };
}

const visible = (p: PostMeta) => process.env.NODE_ENV !== "production" || !p.draft;

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(read)
    .filter(visible)
    .map((post): PostMeta => ({ slug: post.slug, title: post.title, date: post.date, summary: post.summary, draft: post.draft }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    if (fs.existsSync(path.join(DIR, slug + ext))) {
      const post = read(slug + ext);
      return visible(post) ? post : null;
    }
  }
  return null;
}
