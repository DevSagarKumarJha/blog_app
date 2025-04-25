import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (formData) => {
    const res = await api.post("/auth/login", formData);
    setUser(res.data.user);
  };

  const register = async (formData) => {
    const res = await api.post("/auth/register", formData);
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, login, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
