import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { Notification } from '../store/notifications/notifications.types.ts';
import { addNotification } from '../store/notifications/slice.tsx';
import { createSocket } from '../services/socket/socket.ts';

const socket = createSocket('notifications');

export function useNotificationsSocket() {
  const dispatch = useDispatch();

  useEffect(() => {

    socket.on('connect', () => {
      console.log('🔌 Connected to notifications gateway');
    });

    socket.on('notifications:new', (notification: Notification) => {
      console.log('📩 New notification received:', notification);
      dispatch(addNotification(notification));
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from notifications gateway');
    });

    return () => {
      socket.off('notifications:new');
      socket.disconnect();
    };
  }, [dispatch]);
}
