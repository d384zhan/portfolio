import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 6,
    company: "Blair AI",
    roles: [
      {
        id: "6-1",
        title: "Software Engineer",
        startDate: "Jan 2026",
        endDate: "Present",
        description: "building healthcare AI voice agents",
      }
    ]
  },
  {
    id: 5,
    company: "Greenhouse Juice Company",
    sticker: "/ginger.png",
    stickerPosition: "top-right",
    roles: [
      {
        id: "5-1",
        title: "Data/Software Engineer",
        startDate: "Sep 2025",
        endDate: "Dec 2025",
        description: "dashboard maintenance, third-party data migrations, internal app development",
      },
      {
        id: "5-2",
        title: "Operations Analyst",
        startDate: "May 2025",
        endDate: "Aug 2025",
        description: "procurement, workflow automation, building internal apps & data engineering"
      }
    ]
  },
  {
    id: 3,
    company: "Wat.ai",
    roles: [
      {
        id: "3-1",
        title: "Product/Software Engineer",
        startDate: "Feb 2025",
        endDate: "Aug 2025",
        description: "forecast team, eda, product design, and benchmarking for machine learning in oil drilling applications"
      }
    ]
  },
  {
    id: 2,
    company: "Midnight Sun Solar Rayce Car Team",
    roles: [
      {
        id: "2-1",
        title: "Software Developer",
        startDate: "Jan 2025",
        endDate: "Apr 2025",
        description: "backend telemetry and signal decoding for solar car dashboards"
      }
    ]
  },
  {
    id: 1,
    company: "Sunnybrook Health Science Centre",
    sticker: "/prosthetic.png",
    stickerPosition: "bottom-left",
    roles: [
      {
        id: "1-1",
        title: "Data Intern",
        startDate: "Feb 2023",
        endDate: "June 2023",
        description: "data analysis, visualization, and financial reporting under finance and ops",
      }
    ]
  },
]
