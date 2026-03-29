import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PortfolioForm from "@/components/PortfolioForm";
import PortfolioPreview from "@/components/PortfolioPreview";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { PortfolioData, defaultPortfolio } from "@/types/portfolio";
import { Eye, Edit3, Save, FolderOpen, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePortfolio } from "@/hooks/usePortfolio";
import LoginModal from "@/components/LoginModal";

const Builder = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolio);
  const [view, setView] = useState<"split" | "preview">("split");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showPortfolioList, setShowPortfolioList] = useState(false);

  const { user } = useAuth();
  const {
    portfolios,
    loading,
    error,
    savePortfolio,
    loadPortfolio,
    deletePortfolio,
    togglePublic,
    clearError
  } = usePortfolio();

  const handleSave = async () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    clearError();
    const portfolioId = await savePortfolio(data);
    if (portfolioId) {
      // Show success message or notification
      console.log('Portfolio saved successfully!');
    }
  };

  const handleLoadPortfolio = async (portfolioId: string) => {
    clearError();
    await loadPortfolio(portfolioId);
    setShowPortfolioList(false);
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      await deletePortfolio(portfolioId);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="font-display text-2xl font-bold">
                Portfolio <span className="text-gradient">Builder</span>
              </h1>
              <p className="text-sm text-muted-foreground">Edit on the left, preview in real-time on the right.</p>
            </div>
            <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
              <button
                onClick={() => setView("split")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  view === "split" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <Edit3 className="h-3.5 w-3.5" /> Editor
              </button>
              <button
                onClick={() => setView("preview")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  view === "preview" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <Eye className="h-3.5 w-3.5" /> Preview
              </button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex flex-wrap gap-3 mb-6"
          >
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : 'Save Portfolio'}
            </button>

            {user && (
              <button
                onClick={() => setShowPortfolioList(!showPortfolioList)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium text-sm hover:bg-muted transition-colors"
              >
                <FolderOpen className="h-4 w-4" />
                Load Portfolio
              </button>
            )}

            {!user && (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium text-sm hover:bg-muted transition-colors"
              >
                <User className="h-4 w-4" />
                Sign In to Save
              </button>
            )}
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
            >
              {error}
              <button
                onClick={clearError}
                className="ml-2 text-destructive/70 hover:text-destructive"
              >
                ✕
              </button>
            </motion.div>
          )}

          {/* Portfolio List */}
          {showPortfolioList && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 glass-strong rounded-lg p-4"
            >
              <h3 className="font-semibold mb-3">Your Portfolios</h3>
              {portfolios.length === 0 ? (
                <p className="text-muted-foreground text-sm">No saved portfolios yet. Create one above!</p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {portfolios.map((portfolio) => (
                    <div
                      key={portfolio.id}
                      className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm truncate">{portfolio.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          portfolio.isPublic ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'
                        }`}>
                          {portfolio.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {portfolio.bio}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadPortfolio(portfolio.id)}
                          className="flex-1 text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => togglePublic(portfolio.id)}
                          className="text-xs px-2 py-1 border border-border rounded hover:bg-muted transition-colors"
                        >
                          {portfolio.isPublic ? 'Make Private' : 'Make Public'}
                        </button>
                        <button
                          onClick={() => handleDeletePortfolio(portfolio.id)}
                          className="text-xs px-2 py-1 border border-destructive text-destructive rounded hover:bg-destructive/10 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Theme Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <ThemeSwitcher active={data.theme} onChange={(theme) => setData({ ...data, theme })} />
          </motion.div>

          {/* Main content */}
          <div className={`grid gap-6 ${view === "split" ? "lg:grid-cols-2" : "grid-cols-1"}`}>
            {view === "split" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-strong rounded-2xl p-6 max-h-[calc(100vh-16rem)] overflow-y-auto"
              >
                <PortfolioForm data={data} onChange={setData} />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-strong rounded-2xl p-1 gradient-border max-h-[calc(100vh-16rem)] overflow-y-auto"
            >
              <PortfolioPreview data={data} />
            </motion.div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default Builder;
