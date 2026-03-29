import { useState } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Code, FolderGit2, Mail, Plus, Trash2, Sparkles } from "lucide-react";
import { PortfolioData, Project } from "@/types/portfolio";

interface Props {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

const PortfolioForm = ({ data, onChange }: Props) => {
  const [activeTab, setActiveTab] = useState<"basic" | "skills" | "projects">("basic");
  const [newSkill, setNewSkill] = useState("");

  const update = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      update("skills", [...data.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", data.skills.filter((s) => s !== skill));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      tech: [],
      link: "",
    };
    update("projects", [...data.projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    update(
      "projects",
      data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeProject = (id: string) => {
    update("projects", data.projects.filter((p) => p.id !== id));
  };

  const tabs = [
    { id: "basic" as const, label: "Basic Info", icon: <User className="h-4 w-4" /> },
    { id: "skills" as const, label: "Skills", icon: <Code className="h-4 w-4" /> },
    { id: "projects" as const, label: "Projects", icon: <FolderGit2 className="h-4 w-4" /> },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm";

  return (
    <div className="space-y-6">
      {/* AI Generate button */}
      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass gradient-border font-display font-semibold text-sm text-foreground transition-all hover:scale-[1.02] hover:neon-glow-violet">
        <Sparkles className="h-4 w-4 text-neon-violet" />
        AI Auto-Generate Portfolio
      </button>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Basic info tab */}
      {activeTab === "basic" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
              <input className={inputClass} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Title</label>
              <input className={inputClass} value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Full-Stack Developer" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tagline</label>
            <input className={inputClass} value={data.tagline} onChange={(e) => update("tagline", e.target.value)} placeholder="Your one-liner" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio</label>
            <textarea className={`${inputClass} min-h-[100px] resize-none`} value={data.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Tell the world about yourself..." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
              <input className={inputClass} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">GitHub Username</label>
              <input className={inputClass} value={data.github} onChange={(e) => update("github", e.target.value)} placeholder="github-username" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Skills tab */}
      {activeTab === "skills" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex gap-2">
            <input
              className={inputClass}
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add a skill..."
            />
            <button onClick={addSkill} className="px-4 py-3 rounded-lg bg-primary text-primary-foreground transition-all hover:scale-105">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm text-foreground">
                {skill}
                <button onClick={() => removeSkill(skill)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Projects tab */}
      {activeTab === "projects" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {data.projects.map((project) => (
            <div key={project.id} className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <input
                  className={`${inputClass} font-semibold`}
                  value={project.name}
                  onChange={(e) => updateProject(project.id, "name", e.target.value)}
                  placeholder="Project name"
                />
                <button onClick={() => removeProject(project.id)} className="ml-2 p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                className={`${inputClass} min-h-[60px] resize-none`}
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                placeholder="Brief description..."
              />
              <input
                className={inputClass}
                value={project.tech.join(", ")}
                onChange={(e) => updateProject(project.id, "tech", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
                placeholder="Tech stack (comma separated)"
              />
            </div>
          ))}
          <button onClick={addProject} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioForm;
