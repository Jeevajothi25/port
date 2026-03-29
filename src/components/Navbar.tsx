import { motion } from "framer-motion";
import { Zap, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "./LoginModal";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Builder", path: "/builder" },
  { label: "Themes", path: "/themes" },
  { label: "AI Mentor", path: "/mentor" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Zap className="h-7 w-7 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/40 animate-glow-pulse" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">
              PortfolioGen X
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10 neon-glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="px-4 py-2 rounded-lg font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  Sign In
                </button>
                <Link
                  to="/builder"
                  className="px-5 py-2.5 rounded-lg font-display font-semibold text-sm bg-primary text-primary-foreground neon-glow-cyan transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden glass-strong border-t border-border/50 px-6 py-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border/50 pt-2 mt-2">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-4 py-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {user.displayName || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-primary text-primary-foreground neon-glow-cyan transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
