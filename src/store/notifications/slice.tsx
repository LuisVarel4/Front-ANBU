import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from './notifications.types.ts';

type NotificationsState = {
  list: Notification[];
};

const initialState: NotificationsState = {
  list: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      const notif = action.payload;

      console.log('addNotification', notif);

      if (notif.type === 'message' && notif.contextId) {
        const existing = state.list.find(
          (n) => n.type === 'message' && n.contextId === notif.contextId,
        );
        if (existing) {
          existing.count = (existing.count ?? 1) + 1;
          existing.message = notif.message;
          existing.createdAt = notif.createdAt;
          existing.isRead = false; // opcional: marcar como no leída
          // Mover al inicio
          state.list = [
            existing,
            ...state.list.filter((n) => n !== existing),
          ];
          return;
        }
      }

      const exists = state.list.some((n) => n.id === notif.id);
      if (!exists) {
        state.list.unshift({ ...notif, count: 1 });
      }
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.list.find(
        (n: Notification) => n.id === action.payload,
      );
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
    setDecisionStatus(
      state,
      action: PayloadAction<{
        id: string;
        status: 'accepted' | 'rejected';
      }>,
    ) {
      const n = state.list.find((n) => n.id === action.payload.id);
      if (n) {
        n.decisionStatus = action.payload.status;
        n.isRead = true;
      }
    },
  },
});

export const {
  addNotification,
  setNotifications,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
  setDecisionStatus,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
