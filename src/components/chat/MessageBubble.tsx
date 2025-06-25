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
    <div
      className={`flex ${isOwn ? "justify-end pr-2" : "justify-start pl-2"}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isOwn ? "bg-green-anbu text-white" : "bg-gray1-anbu text-gray2-anbu"
        }`}
      >
        {!isOwn && (
          <p
            className={`${getUsernameColor(message.username)} mb-1 text-xs font-semibold sm:text-sm`}
          >
            {message.username}
          </p>
        )}
        <p className="text-xs leading-tight break-words sm:text-sm md:text-base">
          {message.content}
        </p>

        <p
          className={`mt-0.5 text-end text-[10px] sm:text-xs ${
            isOwn ? "text-white/70" : "text-gray-500"
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
