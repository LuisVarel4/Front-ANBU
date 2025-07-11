import type { AuthUser } from '../../types/auth/auth-user.interface.ts';

export type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isFullyAuthenticated: boolean;
  completeLogin: () => void;
  isLoading: boolean;
};
