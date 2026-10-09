// The site lives at the apex domain; www redirects there, so every URL in
// the metadata, sitemap and structured data uses the apex. Pointing crawlers
// at a redirect splits the signal between the two hosts.
export const SITE = "https://dawang.tech";

export const DESCRIPTION =
  "Dawang Zhang builds software at Upfront Ventures, researches haptic teleoperation at the Waterloo HX Lab, and studies management engineering at Waterloo.";

// schema.org Person, so search engines tie the name to this site and to the
// profiles listed under sameAs.
export const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dawang Zhang",
  url: SITE,
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Upfront Ventures", url: "https://upfront.com" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Waterloo", url: "https://uwaterloo.ca" },
  sameAs: [
    "https://www.linkedin.com/in/dawang-zhang",
    "https://github.com/d384zhan",
    "https://x.com/dawangzh",
    "https://letterboxd.com/dzahwa/",
  ],
};
