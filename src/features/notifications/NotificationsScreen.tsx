import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import {
    markAsRead,
    markAllAsRead,
} from '../../store/notifications/slice';

const NotificationsScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector(
        (state: RootState) => state.notifications.list
    );

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAsRead = (id: string) => {
        dispatch(markAsRead(id));
    };

    const handleMarkAll = () => {
        dispatch(markAllAsRead());
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
