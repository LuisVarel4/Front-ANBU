import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollArea } from '../../components/ui/Scroll/ScrollArea';
import ChatHeader from '../../components/chat/ChatHeader';
import MessageList from '../../components/chat/MessageList';
import MessageInput from '../../components/chat/MessageInput';
import { useAppDispatch, useAppSelector } from '../../store';
import { Card, CardContent, CardFooter } from '../../components/ui';
import { useParams } from 'react-router-dom';
import { chatApi, useGetMessagesQuery } from '../../api/chat.api.ts';
import { sendMessageSocket, useChatSocket } from '../../hooks/useChatSocket.ts';
import { addLiveMessage, prependMessages } from '../../store/chat/slice.ts';
import { useAuthContext } from '../../context/auth/context.ts';
import type { Message } from '../../types/chat';

export const ChatContainer: React.FC = () => {

  const { user } = useAuthContext();
  const userId = user!.id;
  const userAlias = user!.alias;

  const { missionId } = useParams<{ missionId: string }>();
  const dispatch = useAppDispatch();


  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);


  const { data, isLoading } = useGetMessagesQuery({ missionId: missionId!, pagination: { take: 10 } });
  // const messages = useAppSelector((state) => state.chat.messages);
  const messages = useAppSelector((state) => {
    const { messages, liveMessages } = state.chat;
    return [...messages, ...liveMessages];
  });
  useEffect(() => {
    if (data?.data) {
      dispatch(prependMessages(data.data));
      setCursor(data.meta.nextCursor ?? null);
      setHasMore(data.meta.hasMore);
    }
  }, [data, dispatch]);

  useChatSocket(missionId!, userId); // Escucha mensajes en vivo

  const handleSend = (message: string) => {
    if (!missionId) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      missionId,
      userId,
      message: message,
      isSystem: false,
      user: {
        id: userId,
        alias: userAlias,
      },
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    dispatch(addLiveMessage(optimisticMessage));

    sendMessageSocket({ message, missionId, tempId });
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || !cursor || !hasMore || !missionId) return;


    setLoadingMore(true);
    setAutoScroll(false);

    try {
      const result = await dispatch(
        chatApi.endpoints.getMessages.initiate({
          missionId,
          pagination: { take: 5, before: cursor },
        }),
      ).unwrap();

      dispatch(prependMessages(result.data));
      setCursor(result.meta.nextCursor ?? null);
      setHasMore(result.meta.hasMore);
    } finally {
      setLoadingMore(false);

    }
  }, [cursor, hasMore, missionId, dispatch, loadingMore]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isLoading || !hasMore) return;
    if (el.scrollTop < 50) {
      void loadMore();
    }
  }, [hasMore, isLoading, loadMore]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [cursor, isLoading, hasMore, handleScroll]);

  return (
    <div
      className="from-grayBlue-anbu to-black-anbu flex h-full items-center justify-center bg-gradient-to-br px-4 py-2">
      <Card
        className="bg-grayBlue-anbu flex h-[60vh] w-full max-w-4xl flex-col rounded-xl text-sm leading-tight shadow-lg md:text-base lg:text-sm">
        <ChatHeader title={'mission'} />
        <CardContent className="flex flex-1 flex-col overflow-hidden pr-2">
          <ScrollArea autoScroll={autoScroll} ref={scrollRef} className="h-full w-full">
            <MessageList messages={messages} currentUser={userId} />
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
