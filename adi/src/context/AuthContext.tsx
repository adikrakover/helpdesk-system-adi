import {useContext,useEffect,useState,createContext} from "react";
import axios from 'axios';  

interface User{
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'agent' | 'customer';
}
interface AuthContextType{
    user: User | null;
    token: string | null;
    login: (email:string,password:string)=>Promise<void>;
    logout: ()=>void;
    loading: boolean;
    // register: (name:string,email:string,password:string,role:'admin' | 'agent' | 'customer')=>Promise<void>;
}
const AuthContext=createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
}, []);
const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { email, password });
      const { token, user } = response.data;

      // שמירה ב-State וב-LocalStorage
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
  
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }