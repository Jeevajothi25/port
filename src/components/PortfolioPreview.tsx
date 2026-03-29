import { motion } from "framer-motion";
import { PortfolioData, ThemeId } from "@/types/portfolio";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";

interface Props {
  data: PortfolioData;
}

const themeStyles: Record<ThemeId, { wrapper: string; card: string; accent: string; badge: string }> = {
  cyberpunk: {
    wrapper: "bg-background bg-grid",
    card: "glass neon-glow-cyan",
    accent: "text-primary neon-text-cyan",
    badge: "bg-primary/10 text-primary border border-primary/20",
  },
  glass: {
    wrapper: "bg-gradient-to-br from-background via-card to-background",
    card: "glass-strong",
    accent: "text-foreground",
    badge: "bg-muted/60 text-foreground border border-border/30",
  },
  neon: {
    wrapper: "bg-background",
    card: "glass neon-glow-violet",
    accent: "text-neon-violet neon-text-violet",
    badge: "bg-neon-violet/10 text-neon-violet border border-neon-violet/20",
  },
  gradient: {
    wrapper: "bg-gradient-to-br from-background via-card to-muted",
    card: "bg-card/80 backdrop-blur-xl border border-border/40",
    accent: "text-gradient",
    badge: "bg-secondary/20 text-secondary border border-secondary/20",
  },
};

const PortfolioPreview = ({ data }: Props) => {
  const theme = themeStyles[data.theme];

  return (
    <div className={`rounded-2xl overflow-hidden ${theme.wrapper} p-6 space-y-6 min-h-full`}>
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${theme.card} rounded-xl p-8 text-center`}>
        <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-muted-foreground">
            {data.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
        </div>
        <h2 className={`font-display text-3xl font-bold mb-1 ${theme.accent}`}>{data.name || "Your Name"}</h2>
        <p className="text-muted-foreground font-medium">{data.title || "Your Title"}</p>
        <p className="text-sm text-muted-foreground mt-2 italic">"{data.tagline || "Your tagline"}"</p>
      </motion.div>

      {/* About */}
      <div className={`${theme.card} rounded-xl p-6`}>
        <h3 className="font-display font-semibold text-lg mb-3">About</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.bio || "Your bio goes here..."}</p>
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className="font-display font-semibold text-lg mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className={`px-3 py-1 rounded-full text-xs font-medium ${theme.badge}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg px-1">Projects</h3>
          {data.projects.map((project) => (
            <div key={project.id} className={`${theme.card} rounded-xl p-5`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-display font-semibold">{project.name || "Untitled"}</h4>
                {project.link && (
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              {project.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Contact */}
      <div className={`${theme.card} rounded-xl p-6`}>
        <h3 className="font-display font-semibold text-lg mb-3">Contact</h3>
        <div className="flex flex-wrap gap-3">
          {data.email && (
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" /> {data.email}
            </a>
          )}
          {data.github && (
            <a href={`https://github.com/${data.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" /> {data.github}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;
