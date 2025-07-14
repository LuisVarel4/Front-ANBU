import React, { useState } from "react";
import { ChatContext } from "./chat.context";
import { useChatSocket } from "./useChatContext.ts";
import type { ChatMessage } from "../../types/chat";
import type { ChatContextType } from "./chat.type.ts";

type Props = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMissionId, setCurrentMissionId] = useState<string | null>(null);

  const handleNewMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const { sendMessage } = useChatSocket(currentMissionId, handleNewMessage);

  const joinMission = (missionId: string) => {
    setMessages([]); // limpiar mensajes anteriores
    setCurrentMissionId(missionId);
  };

  const leaveMission = () => {
    setCurrentMissionId(null);
    setMessages([]);
  };

  const value: ChatContextType = {
    messages,
    sendMessage,
    joinMission,
    leaveMission,
    currentMissionId,
  };

  return <ChatContext value={value}>{children}</ChatContext>;
};
