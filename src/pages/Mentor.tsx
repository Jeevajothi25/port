import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Lightbulb, TrendingUp, BookOpen, Target, Sparkles } from "lucide-react";

const mentorCards = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Skills to Learn",
    description: "AI analyzes your current stack and suggests the most impactful skills to learn next based on market demand.",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Projects to Build",
    description: "Get personalized project ideas that showcase your skills and fill gaps in your portfolio.",
    color: "text-neon-violet",
    bg: "bg-neon-violet/10",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Interview Prep",
    description: "Custom interview roadmaps based on your target role, with practice questions and topics.",
    color: "text-neon-green",
    bg: "bg-neon-green/10",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Career Direction",
    description: "AI evaluates your profile and suggests the best career paths tailored to your strengths.",
    color: "text-neon-pink",
    bg: "bg-neon-pink/10",
  },
];

const Mentor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-6 pb-12 container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Lightbulb className="h-4 w-4 text-neon-green" />
            <span className="text-sm text-muted-foreground">AI Career Mentor</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">
            Your AI <span className="text-gradient">Mentor</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Get personalized career advice, skill recommendations, and interview preparation powered by AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {mentorCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:neon-glow-cyan"
            >
              <div className={`inline-flex p-3 rounded-xl ${card.bg} mb-4`}>
                <span className={card.color}>{card.icon}</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Placeholder chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto glass-strong rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-neon-green" />
            </div>
            <span className="font-display font-semibold text-sm">AI Mentor</span>
            <span className="px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green text-xs">Coming Soon</span>
          </div>
          <div className="space-y-3 mb-4">
            <div className="glass rounded-xl p-4 max-w-[80%]">
              <p className="text-sm text-muted-foreground">
                Hi! I'm your AI career mentor. Connect your portfolio and I'll analyze your skills to give personalized advice. Enable Lovable Cloud to activate this feature!
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm"
              placeholder="Ask your mentor anything..."
              disabled
            />
            <button disabled className="px-4 py-3 rounded-lg bg-primary/50 text-primary-foreground text-sm font-medium opacity-50">
              Send
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mentor;
