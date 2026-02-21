import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Id } from '../../convex/_generated/dataModel';

const USER_ID_KEY = 'cleanair_user_id';

type AuthContextValue = {
  userId: Id<'users'> | null;
  isLoading: boolean;
  login: (userId: Id<'users'>) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserIdState] = useState<Id<'users'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_ID_KEY).then((stored) => {
      setUserIdState(stored as Id<'users'> | null);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (id: Id<'users'>) => {
    await AsyncStorage.setItem(USER_ID_KEY, id);
    setUserIdState(id);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(USER_ID_KEY);
    setUserIdState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
