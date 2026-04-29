import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const users = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
  { id: 2, username: 'user', password: '123', role: 'user', name: 'Usuário Comum' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@taskflow_user');
      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(username: string, password: string) {
    setError(null);
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userData } = foundUser;
      setUser(userData as User);
      await AsyncStorage.setItem('@taskflow_user', JSON.stringify(userData));
    } else {
      setError('Credenciais inválidas');
      throw new Error('Invalid credentials');
    }
  }

  function signOut() {
    AsyncStorage.removeItem('@taskflow_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};
