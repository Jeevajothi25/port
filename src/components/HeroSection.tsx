import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neon-cyan/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neon-violet/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" style={{ animation: "scan-line 8s linear infinite" }} />
      </div>

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass gradient-border mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Personal Brand Builder
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Build Your{" "}
            <span className="text-gradient neon-text-cyan">Digital Identity</span>
            <br />
            <span className="text-muted-foreground">In Seconds</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate stunning portfolios, AI-crafted bios, resumes, and career roadmaps.
            Just speak or type — your personal brand, powered by AI.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/builder"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl font-display font-semibold bg-primary text-primary-foreground neon-glow-cyan transition-all duration-300 hover:scale-105"
            >
              Start Building
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/builder"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-display font-semibold glass gradient-border text-foreground transition-all duration-300 hover:scale-105"
            >
              <Mic className="h-5 w-5 text-neon-violet" />
              Voice Create
            </Link>
          </div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { icon: <Sparkles className="h-4 w-4" />, label: "AI Portfolio" },
              { icon: <Github className="h-4 w-4" />, label: "GitHub Analyzer" },
              { icon: <Mic className="h-4 w-4" />, label: "Voice Input" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground"
              >
                <span className="text-primary">{pill.icon}</span>
                {pill.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="glass-strong rounded-2xl p-1 gradient-border neon-glow-cyan">
            <div className="rounded-xl bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-neon-pink" />
                <div className="w-3 h-3 rounded-full bg-neon-green" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">portfolio-preview.tsx</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded-full bg-muted animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="h-3 w-2/3 rounded-full bg-muted animate-pulse" style={{ animationDelay: "0.4s" }} />
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-20 rounded-lg bg-muted/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
