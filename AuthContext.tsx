import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from './types';
import { apiGetMe, apiLogin, apiSignup, supabase } from './api';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapSupabaseUserToUser = (supabaseUser: any): User => {
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email || '',
    role: supabaseUser.user_metadata?.role || 'customer',
    phone: supabaseUser.user_metadata?.phone,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session?.user) {
          setCurrentUser(mapSupabaseUserToUser(session.user));
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(mapSupabaseUserToUser(session.user));
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        const user = mapSupabaseUserToUser(data.user);
        setCurrentUser(user);
        setLoading(false);
        return user;
      }
      setLoading(false);
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      window.location.hash = '/login';
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<User | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      if (error) throw error;
      if (data.user) {
        const user = mapSupabaseUserToUser(data.user);
        setCurrentUser(user);
        setLoading(false);
        return user;
      }
      setLoading(false);
      return null;
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);
      return null;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};