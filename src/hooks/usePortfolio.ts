import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { portfolioService, PortfolioWithMeta } from '@/lib/portfolioService';
import { PortfolioData } from '@/types/portfolio';

export const usePortfolio = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<PortfolioWithMeta[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user's portfolios
  const loadUserPortfolios = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const userPortfolios = await portfolioService.getUserPortfolios(user.uid);
      setPortfolios(userPortfolios);
    } catch (err) {
      setError('Failed to load portfolios');
      console.error('Error loading portfolios:', err);
    } finally {
      setLoading(false);
    }
  };

  // Save current portfolio
  const savePortfolio = async (portfolioData: PortfolioData, isPublic = false) => {
    if (!user) {
      setError('You must be signed in to save portfolios');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const portfolioId = await portfolioService.create(user.uid, portfolioData, isPublic);
      await loadUserPortfolios(); // Refresh the list
      return portfolioId;
    } catch (err) {
      setError('Failed to save portfolio');
      console.error('Error saving portfolio:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update existing portfolio
  const updatePortfolio = async (portfolioId: string, updates: Partial<PortfolioData>) => {
    if (!user) {
      setError('You must be signed in to update portfolios');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await portfolioService.update(portfolioId, updates);
      await loadUserPortfolios(); // Refresh the list
      return true;
    } catch (err) {
      setError('Failed to update portfolio');
      console.error('Error updating portfolio:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load a specific portfolio
  const loadPortfolio = async (portfolioId: string) => {
    setLoading(true);
    setError(null);

    try {
      const portfolio = await portfolioService.getById(portfolioId);
      if (portfolio) {
        setCurrentPortfolio(portfolio);
        // Increment view count if it's not the owner's view
        if (user && portfolio.userId !== user.uid) {
          await portfolioService.incrementViewCount(portfolioId);
        }
      } else {
        setError('Portfolio not found');
      }
    } catch (err) {
      setError('Failed to load portfolio');
      console.error('Error loading portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete portfolio
  const deletePortfolio = async (portfolioId: string) => {
    if (!user) {
      setError('You must be signed in to delete portfolios');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await portfolioService.delete(portfolioId);
      await loadUserPortfolios(); // Refresh the list
      return true;
    } catch (err) {
      setError('Failed to delete portfolio');
      console.error('Error deleting portfolio:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Toggle public/private
  const togglePublic = async (portfolioId: string) => {
    if (!user) {
      setError('You must be signed in to change portfolio visibility');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await portfolioService.togglePublic(portfolioId);
      await loadUserPortfolios(); // Refresh the list
      return true;
    } catch (err) {
      setError('Failed to change portfolio visibility');
      console.error('Error toggling portfolio visibility:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load portfolios when user changes
  useEffect(() => {
    if (user) {
      loadUserPortfolios();
    } else {
      setPortfolios([]);
      setCurrentPortfolio(null);
    }
  }, [user]);

  return {
    portfolios,
    currentPortfolio,
    loading,
    error,
    savePortfolio,
    updatePortfolio,
    loadPortfolio,
    deletePortfolio,
    togglePublic,
    loadUserPortfolios,
    clearError: () => setError(null),
  };
};