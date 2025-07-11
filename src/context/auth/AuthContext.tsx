import React, { type ReactNode, useEffect, useState } from "react";
import { fakeUsers } from "../../temporal/fakeUsers.ts";
import { AuthContext } from "./context.ts";
import type { AuthContextType } from "./auth.type.ts";

type AuthProvider = {
  children: ReactNode;
};

const LOCAL_STORAGE_KEY = "auth_user";
const FULLY_AUTH_KEY = "auth_fully";

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [fullyAuth, setFullyAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    const fullyAuth = localStorage.getItem(FULLY_AUTH_KEY);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setFullyAuth(fullyAuth === "true"); // Restaurar estado
      } catch (err) {
        console.error("Error parsing stored user", err);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(FULLY_AUTH_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (fakeUsers[email] && password.length >= 8) {
      const userData = { email, role: fakeUsers[email] };
      setUser(userData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const completeLogin = () => {
    setFullyAuth(true);
    localStorage.setItem(FULLY_AUTH_KEY, "true");
  };

  const logout = () => {
    setUser(null);
    setFullyAuth(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(FULLY_AUTH_KEY);
  };

  return (
    <AuthContext
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isFullyAuthenticated: !!user && fullyAuth,
        completeLogin,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
};
