import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import {
  markAsRead,
  markAllAsRead, setNotifications,
} from '../../store/notifications/slice';
import { useNotificationsSocket } from '../../hooks/useNotificationsSocket.ts';
import type { Notification } from '../../store/notifications/notifications.types.ts';

const NotificationsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notifications.list);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // ✅ Hook para suscripción al socket
  useNotificationsSocket();

  // ✅ Carga inicial de notificaciones
  useEffect(() => {
    fetch('http://localhost:3000/api/notifications', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data: Notification[]) => {
        dispatch(setNotifications(data));
      })
      .catch((err) => {
        console.error('❌ Error al cargar notificaciones:', err);
      });
  }, [dispatch]);

  // ✅ Marcar una como leída (frontend + backend)
  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/notifications/${id}/read`, {
        method: 'PATCH',
        credentials: 'include',
      });
      dispatch(markAsRead(id));
    } catch (err) {
      console.error(`❌ Error al marcar como leída: ${id}`, err);
    }
  };

  // ✅ Marcar todas como leídas (frontend + backend)
  const handleMarkAll = async () => {
    try {
      await fetch('http://localhost:3000/api/notifications/read-all', {
        method: 'PATCH',
        credentials: 'include',
      });
      dispatch(markAllAsRead());
    } catch (err) {
      console.error('❌ Error al marcar todas como leídas:', err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Centro de Notificaciones</h2>
      <p>🔔 Notificaciones no leídas: {unreadCount}</p>

      <button onClick={handleMarkAll}>Marcar todas como leídas</button>

      <ul style={{ marginTop: '1rem' }}>
        {notifications.map((notif) => (
          <li
            key={notif.id}
            style={{
              marginBottom: '0.5rem',
              backgroundColor: notif.isRead ? '#eee' : '#fff8dc',
              padding: '0.5rem',
              border: '1px solid #ccc',
            }}
          >
            <p>{notif.message}</p>
            <small>{new Date(notif.createdAt).toLocaleString()}</small>
            {!notif.isRead && (
              <div>
                <button onClick={() => handleMarkAsRead(notif.id)}>
                  Marcar como leída
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsScreen;
