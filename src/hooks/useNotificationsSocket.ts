import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { Notification } from '../store/notifications/notifications.types.ts';
import { addNotification } from '../store/notifications/slice.tsx';
import { createSocket } from '../services/socket/socket.ts';

const socket = createSocket('notifications');

export function useNotificationsSocket(enabled = true) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) return;

    socket.on('connect', () => {
      console.log('🔌 Connected to notifications gateway');
    });

    socket.on('notifications:new', (notification: Notification) => {
      console.log('📩 New notification received:', notification);
      dispatch(addNotification(notification));
    });

    return () => {
      socket.off('notifications:new');
    };
  }, [dispatch, enabled]);
}
