import axios from "../../api/axios.config";

export interface Traitor {
  id: string;
  fullName: string;
  alias: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BountyMission {
  id: string;
  traitor: Traitor;
  reward: string;
  createdAt: string;
  completedAt: string | null;
  deletedAt: string | null;
}

export async function fetchBountyMissions(): Promise<BountyMission[]> {
  const { data } = await axios.get<BountyMission[]>("/bounty-missions");
  return data;
}
