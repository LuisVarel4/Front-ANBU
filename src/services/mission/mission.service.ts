import api from '../../api/axios.config.ts';

export interface APIMission {
  id: string;
  codeName: string;
  objective: string;
  description: string;
  captain: {
    id: string;
    fullName: string;
    alias: string;
    email: string;
    role: string;
    active: boolean;
  };
  deadline: string;
  priority: string;
  status: string;
  participations: Array<{
    id: string;
    user_id: string;
    user: {
      id: string;
      fullName: string;
      alias: string;
      email: string;
      role: string;
    };
  }>;
}

export interface CreateMissionRequest {
  codeName: string;
  objective: string;
  description: string;
  captain_id: string;
  priority: string;
  deadline: string;
  status: string;
  assignedAgents?: string[];
}

export const missionService = {
  async getRegularMissions(): Promise<APIMission[]> {
    const response = await api.get('/regular-missions');
    return response.data;
  },

  async createMission(missionData: CreateMissionRequest): Promise<APIMission> {
    const response = await api.post('/regular-missions', missionData);
    return response.data;
  }
};