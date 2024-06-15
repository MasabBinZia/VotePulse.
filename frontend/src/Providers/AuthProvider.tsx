import  { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import axios from "axios";

export type User = {
  id: number;
  name?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({ children, isSignedIn }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(isSignedIn ? { id: 1 } : null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    fetchProfile();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3001/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error('Error fetching profile:', err);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
