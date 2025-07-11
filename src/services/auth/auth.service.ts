import api from '../../api/axios.config.ts';
import type { LoginPayload } from '../../types/auth/login-payload.interface.ts';
import type { AuthUser } from '../../types/auth/auth-user.interface.ts';


export class AuthService {
  async login(payload: LoginPayload): Promise<AuthUser> {
    const response = await api.post<AuthUser>('/auth/login', payload);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  async getMe(): Promise<AuthUser> {
    const response = await api.post<AuthUser>('/auth/me');
    return response.data;
  }
}

export const authService = new AuthService();