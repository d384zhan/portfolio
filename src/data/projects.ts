import { Project } from '@/types'

export const projects: Project[] = [
  {
    title: "coinpilot",
    description: "ai-powered crypto market sim",
    subtitle: "built for hack the valley x",
    extendedDescription: "• wanted to make a lightweight market sim for learning to invest in crypto\n• frontend news ticker style animations were frustrating\n• learned lots about context injection, prompt response regex rendering, parallel data fetching, etc!",
    technologies: ["next.js", "python", "flask", "supabase", "gemini api", "coinbase api"],
    github: "https://github.com/d384zhan/htv-x",
    maxTags: 6,
    image: "/coinpilot.png"
  },
  {
    title: "familink",
    description: "family connection platform",
    subtitle: "built for uofthacks 12",
    extendedDescription: "• made an app for prompting deeper conversations w/ ai\n• first hackathon (learned not to expose api keys!)\n• awesome exercise in git workflows, fullstack",
    technologies: ["react.js", "node.js", "firebase", "openai api"],
    github: "https://github.com/d384zhan/familink.ai",
    maxTags: 4,
    image: "/familink.png"
  },
  {
    title: "financial planner",
    description: "excel financial tracker",
    subtitle: "mse100 project",
    extendedDescription: "• excel workbook that allows you to track transactions\n• active goal monitoring and customized feedback\n• vba is too hard",
    technologies: ["vba", "userforms"],
    github: "https://github.com/d384zhan/Financial_Planner",
    maxTags: 2,
    image: "/financial-planner.png"
  },
  {
    title: "excel calendar",
    description: "interactive calendar system",
    subtitle: "mse100 project",
    extendedDescription: "• excel workbook decision support system (dss)\n• acts as a calendar to help schedule tasks and determine priorities",
    technologies: ["vba", "userforms"],
    github: "https://github.com/d384zhan/TimeManagement_Tool",
    maxTags: 2,
    image: "/excel-calendar.png"
  },
  {
    title: "rnow rewards",
    description: "loyalty program design, 3rd national",
    subtitle: "designed for rotman boardroom competition",
    extendedDescription: "• achieved 3rd out of 55+ teams nationally\n• focus on data-driven retention strategies and gamification elements\n• sparked a passion for technically designing and creating useful products",
    technologies: ["case competition"],
    github: "#",
    maxTags: 1,
    image: "/rnow-rewards.png"
  },
  {
    title: "connect four",
    description: "classic game with OOP design",
    subtitle: "my first ever cs project in hs!",
    extendedDescription: "• fully functional connect four game with serialized game states and GUI in java\n• implements clean OOP principles (100/100 on the project!)\n• zero ai was used :D",
    technologies: ["java", "swing", "awt"],
    github: "https://github.com/d384zhan/ConnectFour",
    maxTags: 3,
    image: "/connect-four.png"
  },
]
