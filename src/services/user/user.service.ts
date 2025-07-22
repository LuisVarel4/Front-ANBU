import api from '../../api/axios.config.ts';

export interface APIUser {
  id: string;
  fullName: string;
  alias: string;
  email: string;
  role: string;
}

export interface CreateUserRequest {
  fullName: string;
  alias: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  fullName: string;
  alias: string;
  email: string;
  password?: string;
  role: string;
  active: boolean;
}

export const userService = {
  async getUsers(): Promise<APIUser[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async createUser(userData: CreateUserRequest): Promise<APIUser> {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async updateUser(id: string, userData: UpdateUserRequest): Promise<APIUser> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
};