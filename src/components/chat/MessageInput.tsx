import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button, Input } from "../ui";

type MessageInputProps = {
  onSend: (message: string) => void;
  disabled: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex rounded-lg">
      <Input
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mensaje"
        disabled={disabled}
        maxLength={500}
        className="bg-gray3-anbu mx-2 py-0 text-black placeholder-gray-500"
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        color="bg-red-anbu hover:bg-yellow-anbu"
        textColor="text-white hover:text-black"
        isIcon
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default MessageInput;
