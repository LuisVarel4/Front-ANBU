import type { Message } from "../../types/chat";
import MessageBubble from "./MessageBubble";
import React from "react";

type MessageListProps = {
  messages: Message[];
  currentUser: string;
};

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  return (
    <div className="space-y-1.5 py-1">
      {messages.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No hay mensajes aún.
        </div>
      ) : (
        messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.userId === currentUser}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;
