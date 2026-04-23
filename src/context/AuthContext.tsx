import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  role: string;
};

export type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('@taskflow:user');
        if (json) {
          setUser(JSON.parse(json));
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function login(username: string, password: string) {
    // simple fake authentication - replace with real API call
    let newUser: User | null = null;

    if (username === 'admin' && password === 'admin') {
      newUser = { name: 'Admin', role: 'admin' };
    } else if (username === 'user' && password === 'user') {
      newUser = { name: 'Usuário', role: 'user' };
    }

    if (!newUser) return false;

    setUser(newUser);
    try {
      await AsyncStorage.setItem('@taskflow:user', JSON.stringify(newUser));
    } catch (e) {
      // ignore
    }

    return true;
  }

  async function logout() {
    setUser(null);
    try {
      await AsyncStorage.removeItem('@taskflow:user');
    } catch (e) {
      // ignore
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
