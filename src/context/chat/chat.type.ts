import type { ChatMessage } from "../../types/chat";

export interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  joinMission: (missionId: string) => void;
  leaveMission: () => void;
  currentMissionId: string | null;
}
