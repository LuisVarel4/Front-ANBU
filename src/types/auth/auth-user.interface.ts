import type { UserRole } from './index.ts';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface IUser {
  id: string;
  fullName: string;
  alias: string;
  email: string;
  role: string;
  isActive: boolean;
}
