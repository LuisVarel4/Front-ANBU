import { useEffect, useRef } from "react";
import { createSocket } from "../../services/socket/socket";
import type { ChatMessage } from "../../types/chat";

export const useChatSocket = (
  missionId: string | null,
  onNewMessage: (msg: ChatMessage) => void,
) => {
  const hasJoined = useRef(false);
  const socket = createSocket("chat");

  useEffect(() => {
    if (missionId && !socket.connected) {
      socket.connect(); // 🔌 conectar solo si no está conectado
    }

    if (missionId && socket.connected && !hasJoined.current) {
      socket.emit("joinMissionRoom", missionId);
      hasJoined.current = true;
    }

    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);

      if (hasJoined.current && missionId) {
        socket.emit("leaveMissionRoom", missionId); // opcional si implementas
        hasJoined.current = false;
      }

      // Desconectamos solo si no hay misión activa
      if (!missionId && socket.connected) {
        socket.disconnect();
      }
    };
  }, [missionId, onNewMessage, socket]);

  const sendMessage = (content: string) => {
    if (socket.connected && missionId) {
      socket.emit("sendMessage", { missionId, message: content });
    }
  };

  return { sendMessage };
};
