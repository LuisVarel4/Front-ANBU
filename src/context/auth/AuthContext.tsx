import React, { type ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './context.ts';
import { authService } from '../../services/auth/auth.service.ts';
import type { IUser } from '../../types/auth/auth-user.interface.ts';

type AuthProvider = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [fullyAuth, setFullyAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const user = await authService.getMe();
        setUser(user);
        setFullyAuth(true);
      } catch (err) {
        console.warn('Fallo al obtener el usuario actual', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await authService.login({ email, password });
      const user = await authService.getMe(); // obtiene el usuario completo desde el backend
      setUser(user);
      return true;
    } catch (err) {
      console.warn('Fallo al obtener el usuario actual', err);
      return false;
    }
  };

  const completeLogin = () => {
    setFullyAuth(true);
  };

  const logout = async () => {
    setUser(null);
    setFullyAuth(false);

    try {
      await authService.logout();
    } catch {
      // incluso si falla, limpiamos
    } finally {
      setUser(null);
      setFullyAuth(false);
    }
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
