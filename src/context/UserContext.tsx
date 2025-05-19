
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define user type
export interface User {
  name: string;
  email: string;
  role: string;
}

// Define context type
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateUser: () => {},
});

// Define props for provider
interface UserProviderProps {
  children: ReactNode;
}

// Default user data
const DEFAULT_USER: User = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Administrator",
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in a real app, this would call an API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo - check if the user exists in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = storedUsers.some((user: any) => user.email === email);
      
      if (userExists) {
        return false;
      }
      
      const newUser = { 
        name, 
        email, 
        password,
        role: "User"  // Default role for new users
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      // Auto-login after signup
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update the stored users array
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = storedUsers.map((u: any) => 
        u.email === user.email ? { ...u, ...userData } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => useContext(UserContext);

// Function to initialize default user for development
export const initializeDefaultUser = () => {
  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  if (storedUsers.length === 0) {
    // Add default user
    storedUsers.push({
      ...DEFAULT_USER,
      password: 'password123'
    });
    localStorage.setItem('users', JSON.stringify(storedUsers));
  }
};
