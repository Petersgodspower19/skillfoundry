// context/AuthContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "./api/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasToken, setHasToken] = useState(false);
  const [isStudent, setIsStudent] = useState(true);

  const fetchUser = async () => {
    const res = await getUser();
    if (res) {
      setUser(res);
      setIsStudent(res.role !== "teacher");
      setHasToken(true);
    } else {
      setUser(null);
      setHasToken(false);
      setIsStudent(true);
    }
  };

  useEffect(() => {
    fetchUser();
    window.addEventListener("token-change", fetchUser);
    return () => window.removeEventListener("token-change", fetchUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, hasToken, isStudent, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
