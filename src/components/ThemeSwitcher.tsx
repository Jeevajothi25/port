import { motion } from "framer-motion";
import { ThemeId } from "@/types/portfolio";
import { Check } from "lucide-react";

interface Props {
  active: ThemeId;
  onChange: (theme: ThemeId) => void;
}

const themes: { id: ThemeId; name: string; colors: string[] }[] = [
  { id: "cyberpunk", name: "Cyberpunk", colors: ["#0ff", "#0a0a1a", "#111"] },
  { id: "glass", name: "Minimal Glass", colors: ["#e0e0e0", "#1a1a2e", "#16213e"] },
  { id: "neon", name: "Neon Dev", colors: ["#a855f7", "#0a0a1a", "#1a0a2e"] },
  { id: "gradient", name: "Gradient", colors: ["#8b5cf6", "#06b6d4", "#111"] },
];

const ThemeSwitcher = ({ active, onChange }: Props) => {
  return (
    <div className="flex gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onChange(theme.id)}
          className={`relative flex-1 p-3 rounded-xl transition-all duration-300 ${
            active === theme.id ? "ring-2 ring-primary scale-105" : "glass hover:scale-[1.02]"
          }`}
        >
          <div className="flex gap-1 mb-2">
            {theme.colors.map((c, i) => (
              <div key={i} className="w-4 h-4 rounded-full border border-border/30" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">{theme.name}</span>
          {active === theme.id && (
            <motion.div
              layoutId="theme-check"
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
            >
              <Check className="h-3 w-3 text-primary-foreground" />
            </motion.div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
