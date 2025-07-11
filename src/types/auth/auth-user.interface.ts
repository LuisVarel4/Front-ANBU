import type { UserRole } from './index.ts';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}