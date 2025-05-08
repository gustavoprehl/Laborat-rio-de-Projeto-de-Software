import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'professor' | 'company';
  institution?: string;
  department?: string;
  coins?: number;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const foundUser = mockUsers.find((u) => u.email === email && u.password === password);

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser({
          ...userWithoutPassword,
          role: userWithoutPassword.role as 'student' | 'professor' | 'company',
        });
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const newUser = {
        id: `user-${Date.now()}`,
        ...userData,
        coins: userData.role === 'student' ? 0 : userData.role === 'professor' ? 1000 : undefined,
      };

      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};