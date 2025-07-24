import React, { createContext, useState, useContext, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const login = async (username: string, password: string) => {
    // In a real app, you'd make an API call here
    if (username === 'test' && password === 'password') {
      setIsAuthenticated(true);
      setUser({ name: 'Test User' });
      console.log('Logged in!');
    } else {
      console.error('Login failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    console.log('Logged out!');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};