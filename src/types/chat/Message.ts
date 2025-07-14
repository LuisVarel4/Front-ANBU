// TODO: quitar luego este type y usar el ChatMessage
export interface Message {
  id: string;
  missionId: string;
  message: string;
  createdAt: string;
  userId: string;
  isSystem: boolean;
  user: {
    id: string;
    alias: string;
  };
  status: "pending" | "sent" | "failed";
}
