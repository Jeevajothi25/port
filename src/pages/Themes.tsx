import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Palette } from "lucide-react";

const themes = [
  {
    name: "Cyberpunk",
    description: "Neon-lit dark interface with electric cyan accents and grid overlays.",
    gradient: "from-cyan-500/20 via-background to-background",
    accent: "bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan",
  },
  {
    name: "Minimal Glass",
    description: "Clean frosted-glass surfaces with subtle transparency effects.",
    gradient: "from-muted/20 via-background to-background",
    accent: "bg-muted/30 border-border/30 text-foreground",
  },
  {
    name: "Neon Developer",
    description: "Vibrant purple neon glow with deep dark backgrounds.",
    gradient: "from-purple-500/20 via-background to-background",
    accent: "bg-neon-violet/10 border-neon-violet/20 text-neon-violet",
  },
  {
    name: "Animated Gradient",
    description: "Smooth flowing gradients with dynamic color transitions.",
    gradient: "from-secondary/20 via-primary/10 to-background",
    accent: "bg-secondary/10 border-secondary/20 text-secondary",
  },
];

const Themes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-6 pb-12 container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Palette className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Theme Gallery</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">
            Choose Your <span className="text-gradient">Look</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Switch between stunning themes instantly. Each is designed to make your portfolio unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                <div className="w-3/4 space-y-2">
                  <div className="h-3 w-2/3 rounded-full bg-muted/50" />
                  <div className="h-3 w-1/2 rounded-full bg-muted/30" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-8 w-16 rounded bg-muted/40" />
                    <div className="h-8 w-16 rounded bg-muted/30" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${theme.accent}`}>
                  {theme.name}
                </span>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Themes;
