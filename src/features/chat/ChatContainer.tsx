import React, { useEffect } from "react";
import { ScrollArea } from "../../components/ui/Scroll/ScrollArea.tsx";
import ChatHeader from "../../components/chat/ChatHeader.tsx";
import MessageList from "../../components/chat/MessageList.tsx";
import MessageInput from "../../components/chat/MessageInput.tsx";
import { fetchMessages, sendMessage } from "../../store/chat/slice.ts";
import { useAppDispatch, useAppSelector } from "../../store";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../../components/ui";

export const ChatContainer: React.FC = () => {
  const username = "Juan";
  const location = useLocation();
  const objective = location.state?.objective ?? "Chat de misión";
  const dispatch = useAppDispatch();
  const { messages, isLoading } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = (content: string) => {
    if (!content.trim()) return;
    dispatch(sendMessage({ username, content }));
  };

  return (
    <div className="from-grayBlue-anbu to-black-anbu flex h-full items-center justify-center bg-gradient-to-br px-4 py-2">
      <Card className="bg-grayBlue-anbu flex h-full w-full max-w-4xl flex-col rounded-xl text-sm leading-tight shadow-lg md:text-base lg:text-sm">
        <ChatHeader title={objective} />
        <CardContent className="flex flex-1 flex-col overflow-hidden pr-2">
          <ScrollArea autoScroll className="flex-1">
            <MessageList messages={messages} currentUser={username} />
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <MessageInput onSend={handleSend} disabled={isLoading} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatContainer;
