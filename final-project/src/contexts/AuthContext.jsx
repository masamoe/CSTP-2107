import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../apis/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const user = await getUserInfo();
    setUser(user);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, fetchData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
