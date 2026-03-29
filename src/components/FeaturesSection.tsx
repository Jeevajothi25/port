import { motion } from "framer-motion";
import { Brain, Github, Palette, FileText, BarChart3, Share2, Mic, Lightbulb } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Branding Engine",
    description: "Generate professional bios, taglines, and elevator pitches instantly.",
    color: "neon-cyan",
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: "GitHub Analyzer",
    description: "Auto-analyze repos to detect skills, level, and auto-fill your portfolio.",
    color: "neon-violet",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Premium Themes",
    description: "Cyberpunk, glass, neon, gradient — switch themes in real-time.",
    color: "neon-pink",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "AI Resume",
    description: "Generate ATS-friendly resumes and download as PDF.",
    color: "neon-green",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics",
    description: "Track profile views and engagement with real-time stats.",
    color: "neon-cyan",
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Shareable Links",
    description: "Get a custom public URL for your portfolio.",
    color: "neon-violet",
  },
  {
    icon: <Mic className="h-6 w-6" />,
    title: "Voice Creation",
    description: "Speak and let AI fill your entire portfolio for you.",
    color: "neon-pink",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "AI Mentor",
    description: "Get career advice, skill suggestions, and interview prep.",
    color: "neon-green",
  },
];

const colorMap: Record<string, string> = {
  "neon-cyan": "text-neon-cyan",
  "neon-violet": "text-neon-violet",
  "neon-pink": "text-neon-pink",
  "neon-green": "text-neon-green",
};

const bgMap: Record<string, string> = {
  "neon-cyan": "bg-neon-cyan/10",
  "neon-violet": "bg-neon-violet/10",
  "neon-pink": "bg-neon-pink/10",
  "neon-green": "bg-neon-green/10",
};

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-violet/5 blur-[150px]" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Stand Out</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete AI toolkit for building your professional identity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group glass rounded-xl p-6 transition-all duration-300 hover:neon-glow-cyan hover:scale-[1.02]"
            >
              <div className={`inline-flex p-3 rounded-lg ${bgMap[feature.color]} mb-4`}>
                <span className={colorMap[feature.color]}>{feature.icon}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
