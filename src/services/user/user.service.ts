import api from '../../api/axios.config.ts';

export interface APIUser {
  id: string;
  fullName: string;
  alias: string;
  email: string;
  role: string;
}

export const userService = {
  async getUsers(): Promise<APIUser[]> {
    const response = await api.get('/users');
    return response.data;
  }
};