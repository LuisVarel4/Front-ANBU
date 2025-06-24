import type { Message } from "../../types/chat";
import React from "react";

type MessageBubbleProps = {
  message: Message;
  isOwn: boolean;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const usernameColors = [
    "text-red-anbu",
    "text-yellow-anbu",
    "text-green-anbu",
    "text-blue-400",
    "text-pink-400",
    "text-purple-400",
    "text-teal-400",
    "text-orange-400",
    "text-indigo-400",
  ];

  const getUsernameColor = (username: string) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % usernameColors.length;
    return usernameColors[index];
  };

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start pl-2"}`}>
      <div
        className={`max-w-xs rounded-lg px-2 py-1 lg:max-w-md ${
          isOwn ? "bg-red-anbu text-white" : "bg-gray1-anbu text-gray2-anbu"
        }`}
      >
        {!isOwn && (
          <p
            className={`${getUsernameColor(message.username)} mb-1 text-xs font-semibold`}
          >
            {message.username}
          </p>
        )}
        <p className="text-[12px] leading-tight break-words">
          {message.content}
        </p>
        <p
          className={`mt-0.5 text-end text-[10px] ${
            isOwn ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
