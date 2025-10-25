import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Admin {
  id: number;
  username: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  admin: Admin | null;
  adminToken: string | null;
  user: User | null;
  userToken: string | null;
  loginAdmin: (token: string, admin: Admin) => void;
  logoutAdmin: () => void;
  loginUser: (token: string, user: User) => void;
  logoutUser: () => void;
  isAdminAuthenticated: boolean;
  isUserAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAdminToken = localStorage.getItem('adminToken');
    const storedAdmin = localStorage.getItem('adminData');
    const storedUserToken = localStorage.getItem('userToken');
    const storedUser = localStorage.getItem('userData');

    if (storedAdminToken && storedAdmin) {
      setAdminToken(storedAdminToken);
      setAdmin(JSON.parse(storedAdmin));
    }

    if (storedUserToken && storedUser) {
      setUserToken(storedUserToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginAdmin = (newToken: string, adminData: Admin) => {
    setAdminToken(newToken);
    setAdmin(adminData);
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminData', JSON.stringify(adminData));
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  const loginUser = (newToken: string, userData: User) => {
    setUserToken(newToken);
    setUser(userData);
    localStorage.setItem('userToken', newToken);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUserToken(null);
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{
      admin,
      adminToken,
      user,
      userToken,
      loginAdmin,
      logoutAdmin,
      loginUser,
      logoutUser,
      isAdminAuthenticated: !!adminToken,
      isUserAuthenticated: !!userToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
