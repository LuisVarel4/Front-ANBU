import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { Message } from '../types/chat';
import { addMessage, confirmMessage } from '../store/chat/slice.ts';
import { createSocket } from '../services/socket/socket.ts';

const socket = createSocket('chat');

export const useChatSocket = (missionId: string, userId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!missionId) return;

    socket.emit('joinMissionRoom', missionId);

    const handleNewMessage = (message: Message) => {
      console.log(userId);
      console.log(message);
      if (message.userId === userId) return;

      dispatch(addMessage(message));
    };

    const handleMessageSent = (serverMessage: Message) => {

      dispatch(confirmMessage(serverMessage));
    };

    socket.on('newMessage', handleNewMessage);

    socket.on('message:sent', handleMessageSent);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('message:sent', handleMessageSent);
      socket.emit('leaveMissionRoom', missionId); // si es necesario
    };
  }, [missionId, dispatch, userId]);


};

export const sendMessageSocket = (payload: { message: string; missionId: string, tempId?: string }) => {
  socket.emit('sendMessage', payload);
};