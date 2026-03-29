import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { PortfolioData } from '@/types/portfolio';

export interface PortfolioWithMeta extends PortfolioData {
  id: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPublic: boolean;
  viewCount: number;
}

// Portfolio CRUD operations
export const portfolioService = {
  // Create a new portfolio
  async create(userId: string, portfolioData: PortfolioData, isPublic = false): Promise<string> {
    const portfolioId = doc(collection(db, 'portfolios')).id;
    const portfolioWithMeta: PortfolioWithMeta = {
      ...portfolioData,
      id: portfolioId,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isPublic,
      viewCount: 0,
    };

    await setDoc(doc(db, 'portfolios', portfolioId), portfolioWithMeta);
    return portfolioId;
  },

  // Get portfolio by ID
  async getById(portfolioId: string): Promise<PortfolioWithMeta | null> {
    const docRef = doc(db, 'portfolios', portfolioId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PortfolioWithMeta;
    }
    return null;
  },

  // Update portfolio
  async update(portfolioId: string, updates: Partial<PortfolioData>): Promise<void> {
    const docRef = doc(db, 'portfolios', portfolioId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete portfolio
  async delete(portfolioId: string): Promise<void> {
    await deleteDoc(doc(db, 'portfolios', portfolioId));
  },

  // Get user's portfolios
  async getUserPortfolios(userId: string): Promise<PortfolioWithMeta[]> {
    const q = query(
      collection(db, 'portfolios'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as PortfolioWithMeta);
  },

  // Get public portfolios (for showcase)
  async getPublicPortfolios(limitCount = 20): Promise<PortfolioWithMeta[]> {
    const q = query(
      collection(db, 'portfolios'),
      where('isPublic', '==', true),
      orderBy('viewCount', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as PortfolioWithMeta);
  },

  // Increment view count
  async incrementViewCount(portfolioId: string): Promise<void> {
    const docRef = doc(db, 'portfolios', portfolioId);
    const portfolio = await this.getById(portfolioId);

    if (portfolio) {
      await updateDoc(docRef, {
        viewCount: portfolio.viewCount + 1,
      });
    }
  },

  // Toggle public/private
  async togglePublic(portfolioId: string): Promise<void> {
    const portfolio = await this.getById(portfolioId);
    if (portfolio) {
      await updateDoc(doc(db, 'portfolios', portfolioId), {
        isPublic: !portfolio.isPublic,
        updatedAt: Timestamp.now(),
      });
    }
  },
};