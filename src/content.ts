export const PHOTO: { src: string; alt: string; position: string; stamp?: string } = {
  src: "/dujiangyan.jpg",
  alt: "a pavilion above the min river at dujiangyan, sichuan, on a clear day",
  // where the plate's crop centers on this portrait shot
  position: "50% 47%",
};

export type Inline = string | { text: string; href: string };

// Case follows color: what's in ink (name, bio, company and project names) is
// capitalized; what's muted (role line, descriptions, roles, labels) is
// lowercase.

export const ROLE: Inline[] = ["engineering at ", { text: "upfront ventures", href: "https://upfront.com" }];

export const BIO: Inline[] = [
  "I'm interested in finding problems worth solving across product and engineering. I optimize for thoughtful design and compounding impact. I enjoy watching ",
  { text: "movies", href: "https://letterboxd.com/dzahwa/" },
  ", catching sunsets and staying active.",
];

// The first role is the one under the name, so the card's "previously" list
// starts from the second. The card shows CARD_COUNT roles and projects;
// /work shows every role, and projects link on to GitHub.
export const CARD_COUNT = 3;

export type Job = {
  name: string;
  role: string;
  start: string; // "Mon YYYY"
  end: string; // "Mon YYYY", or "now"
  href: string;
  // optional write-up the entry expands to on /work, one string per paragraph
  body?: string[];
};

export const WORK: Job[] = [
  { name: "Upfront Ventures", role: "engineering and venture", start: "Sep 2026", end: "now", href: "https://upfront.com" },
  { name: "Waterloo HX Lab", role: "undergraduate research assistant", start: "May 2026", end: "now", href: "https://uwaterloo.ca/haptic-experience-lab" },
  { name: "Inference Health", role: "engineering", start: "Jan 2026", end: "May 2026", href: "https://inferencehealth.com" },
  { name: "Greenhouse Juice", role: "engineering", start: "May 2025", end: "Dec 2025", href: "https://drinkgreenhouse.com" },
  { name: "WAT.ai", role: "engineering", start: "Feb 2025", end: "Aug 2025", href: "https://watai.ca" },
  { name: "Midnight Sun", role: "engineering", start: "Jan 2025", end: "Apr 2025", href: "https://www.uwmidsun.com" },
];

const year = (date: string) => date.split(" ")[1];

// "Jan – May 2026" within one year, "May 2025 – Jan 2026" across two.
export function span({ start, end }: Job) {
  if (end === "now") return `${start} \u2013 now`;
  const [startMonth, startYear] = start.split(" ");
  return startYear === year(end) ? `${startMonth} \u2013 ${end}` : `${start} \u2013 ${end}`;
}

// the year a role shows on the card: when it ended, or when it started if
// it's still going
export const cardYear = (job: Job) => year(job.end === "now" ? job.start : job.end);

export type Project = { name: string; detail: string; href: string };

export const PROJECTS: Project[] = [
  { name: "Lineage", detail: "agent code provenance", href: "https://github.com/d384zhan/lineage" },
  { name: "Steerio", detail: "voice agent guardrails", href: "https://github.com/d384zhan/steerio" },
  { name: "MGTE 29 Class Profile", detail: "class survey dashboard", href: "https://mgte-29-class-profile.vercel.app" },
  { name: "Coinpilot", detail: "ai market simulator", href: "https://github.com/d384zhan/htv-x" },
];

export const GITHUB = "https://github.com/d384zhan";

export const ELSEWHERE: { name: string; href: string }[] = [
  { name: "email", href: "mailto:d384zhan@uwaterloo.ca" },
  { name: "linkedin", href: "https://www.linkedin.com/in/dawang-zhang" },
  { name: "github", href: GITHUB },
  { name: "x", href: "https://x.com/dawangzh" },
];
