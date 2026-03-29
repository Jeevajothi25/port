import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
  UserCredential
} from 'firebase/auth';
import { auth } from './firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

class AuthService {
  private googleProvider = new GoogleAuthProvider();
  private githubProvider = new GithubAuthProvider();

  constructor() {
    // Configure providers
    this.googleProvider.setCustomParameters({
      prompt: 'select_account'
    });

    this.githubProvider.setCustomParameters({
      allow_signup: 'true'
    });
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  // Sign in with GitHub
  async signInWithGithub(): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(auth, this.githubProvider);
      return result;
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      throw error;
    }
  }

  // Sign in with email and password
  async signInWithEmail(email: string, password: string): Promise<UserCredential> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Email sign-in error:', error);
      throw error;
    }
  }

  // Sign up with email and password
  async signUpWithEmail(email: string, password: string): Promise<UserCredential> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Email sign-up error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Convert Firebase User to AuthUser
  toAuthUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
  }
}

export const authService = new AuthService();