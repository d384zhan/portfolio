export type FontId = "switzer" | "general" | "satoshi" | "geist" | "instrument" | "clash" | "overused";
export type TextKey = "name" | "bio" | "previously" | "projects";

export type Design = {
  fonts: Record<TextKey, FontId>;
  crop: [number, number];
  nameScale: number;
  bioScale: number;
  aspect: number;
};

export const FONTS: Record<FontId, { label: string; family: string }> = {
  switzer: { label: "Switzer", family: "'Switzer', sans-serif" },
  general: { label: "General Sans", family: "'General Sans', sans-serif" },
  satoshi: { label: "Satoshi", family: "'Satoshi', sans-serif" },
  geist: { label: "Geist", family: "var(--font-geist), sans-serif" },
  instrument: { label: "Instrument Serif", family: "var(--font-instrument-serif), serif" },
  clash: { label: "Clash Display", family: "'Clash Display', sans-serif" },
  overused: { label: "Overused Grotesk", family: "'Overused Grotesk', sans-serif" },
};

// The name may take the serif; running text stays sans.
export const FONT_CHOICES: Record<TextKey, FontId[]> = {
  name: ["switzer", "instrument", "overused", "clash"],
  bio: ["switzer", "overused", "general", "satoshi", "geist"],
  previously: ["switzer", "overused", "general", "satoshi", "geist"],
  projects: ["switzer", "overused", "general", "satoshi", "geist"],
};

export const TEXT_KEYS: TextKey[] = ["name", "bio", "previously", "projects"];

// object-position of the photo, in percent. Panning moves between the trees
// and the face; x stays near center so the tower stays in frame.
export const CROP_RANGE = { x: [38, 62] as [number, number], y: [0, 46] as [number, number] };

export const NAME_SCALE: [number, number] = [1, 2.4];
export const BIO_SCALES = [1, 1.45];
export const ASPECT: [number, number] = [2.3, 6.2];

export const DEFAULT_DESIGN: Design = {
  fonts: { name: "switzer", bio: "switzer", previously: "switzer", projects: "switzer" },
  crop: [50, 44],
  nameScale: 1,
  bioScale: 1,
  aspect: 4.2,
};

export const clamp = (v: number, [lo, hi]: [number, number]) => Math.max(lo, Math.min(hi, v));
