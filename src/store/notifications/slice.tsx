import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from './notifications.types.ts';

type NotificationsState = {
    list: Notification[];
};

const initialState: NotificationsState = {
    list: [
        {
            id: '1',
            message: 'Has recibido una nueva misión.',
            createdAt: new Date().toISOString(),
            isRead: false,
            type: 'mission',
        },
        {
            id: '2',
            message: 'Se ha tomado una decisión importante en tu equipo.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // hace 1 hora
            isRead: false,
            type: 'decision',
        },
        {
            id: '3',
            message: 'Actualización del sistema completada.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // hace 1 día
            isRead: true,
            type: 'info',
        },
    ],
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            const exists = state.list.some((n: Notification) => n.id === action.payload.id);
            if (!exists) {
                state.list.unshift(action.payload);
            }
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notif = state.list.find((n: Notification) => n.id === action.payload);
            if (notif) {
                notif.isRead = true;
            }
        },
        markAllAsRead: (state) => {
            state.list.forEach((n: Notification) => {
                n.isRead = true;
            });
        },
        clearNotifications: (state) => {
            state.list = [];
        },
    },
});

export const {
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
