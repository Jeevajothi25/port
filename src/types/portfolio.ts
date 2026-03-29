export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  skills: string[];
  projects: Project[];
  theme: ThemeId;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export type ThemeId = "cyberpunk" | "glass" | "neon" | "gradient";

export const defaultPortfolio: PortfolioData = {
  name: "Alex Chen",
  title: "Full-Stack Developer",
  bio: "Passionate developer crafting digital experiences with modern web technologies. I love building tools that make a difference.",
  tagline: "Building the future, one commit at a time.",
  email: "alex@example.com",
  github: "alexchen",
  linkedin: "alexchen",
  website: "",
  skills: ["React", "TypeScript", "Node.js", "Python", "Tailwind CSS", "PostgreSQL"],
  projects: [
    {
      id: "1",
      name: "AI Dashboard",
      description: "Real-time analytics dashboard powered by machine learning.",
      tech: ["React", "Python", "TensorFlow"],
      link: "#",
    },
    {
      id: "2",
      name: "DevFlow",
      description: "Developer productivity tool with GitHub integration.",
      tech: ["TypeScript", "Node.js", "GraphQL"],
      link: "#",
    },
    {
      id: "3",
      name: "CloudSync",
      description: "Cross-platform file synchronization service.",
      tech: ["Go", "React", "AWS"],
      link: "#",
    },
  ],
  theme: "cyberpunk",
};
