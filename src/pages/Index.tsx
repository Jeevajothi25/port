import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="container px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="text-gradient font-display font-semibold">PortfolioGen X</span>. Built with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
