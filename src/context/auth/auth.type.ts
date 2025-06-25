import type { UserRole } from "../../types/auth";

export type AuthContextType = {
  user: {
    email: string;
    role: UserRole;
  } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isFullyAuthenticated: boolean;
  completeLogin: () => void;
  isLoading: boolean;
};
