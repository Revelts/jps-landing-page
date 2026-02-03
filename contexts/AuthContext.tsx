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

const USER_CACHE_KEY = 'jps_user_cache';
const AUTH_CHECK_KEY = 'jps_auth_checking';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  // Load cached user from sessionStorage immediately
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(USER_CACHE_KEY);
      if (cached) {
        const cachedUser = JSON.parse(cached);
        setUser(cachedUser);
        setLoading(false); // Show cached user immediately
      }
    } catch (error) {
      console.error('Cache load error:', error);
    }
  }, []);

  // Memoize functions to prevent unnecessary re-renders
  const checkAuth = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isChecking) {
      console.log('Auth check already in progress, skipping...');
      return;
    }

    // Check if we recently verified (within last 5 seconds)
    const lastCheck = sessionStorage.getItem(AUTH_CHECK_KEY);
    if (lastCheck) {
      const lastCheckTime = parseInt(lastCheck, 10);
      const now = Date.now();
      if (now - lastCheckTime < 5000) {
        console.log('Auth recently checked, using cache...');
        setLoading(false);
        return;
      }
    }

    setIsChecking(true);
    
    try {
      const response = await fetch('/api/auth/me', {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        // Cache user info in sessionStorage
        sessionStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));
        sessionStorage.setItem(AUTH_CHECK_KEY, Date.now().toString());
      } else {
        setUser(null);
        sessionStorage.removeItem(USER_CACHE_KEY);
        sessionStorage.removeItem(AUTH_CHECK_KEY);
      }
    } catch (error) {
      console.error('Check auth error:', error);
      // Don't clear user on network error - keep cached version
    } finally {
      setLoading(false);
      setIsChecking(false);
    }
  }, [isChecking]);

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
    // Cache user info immediately after login
    sessionStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));
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
    // Cache user info immediately after registration
    sessionStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));
  }, []);

  const logout = useCallback(async () => {
    try {
      // Clear all auth-related cache immediately
      sessionStorage.removeItem(USER_CACHE_KEY);
      sessionStorage.removeItem(AUTH_CHECK_KEY);
      
      // Call logout API to clear server-side session (auth_token cookie)
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include', // Include cookies
      });
      
      // Clear client-side state
      setUser(null);
      
      // Only clear sessionStorage (keep cookies like consent, localStorage)
      sessionStorage.clear();
      
      // Force redirect to home with full page reload
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, still clear client-side and redirect
      setUser(null);
      sessionStorage.clear();
      window.location.href = '/';
    }
  }, []);

  // Check authentication status on mount - ONLY ONCE
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - run only once on mount

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
