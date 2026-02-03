/**
 * Auth Context
 * Global authentication state management
 */
'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoize functions to prevent unnecessary re-renders
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Check auth error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    setUser(data.user);
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call logout API to clear server-side session
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include', // Include cookies
      });
      
      // Clear client-side state
      setUser(null);
      
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();
      
      // Force redirect to home with full page reload
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, still clear client-side and redirect
      setUser(null);
      window.location.href = '/';
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ user, loading, login, register, logout, checkAuth }),
    [user, loading, login, register, logout, checkAuth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
