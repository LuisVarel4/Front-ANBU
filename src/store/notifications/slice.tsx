import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "./notifications.types.ts";

type NotificationsState = {
  list: Notification[];
};

const initialState: NotificationsState = {
  list: [
    {
      id: "1",
      message: "Pedrito reportó un posible traidor.",
      createdAt: new Date().toISOString(),
      isRead: false,
      type: "mission",
    },
    {
      id: "2",
      message: "Alfonsito quiere unirse a la misión recuperar Panamá",
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      isRead: false,
      type: "decision",
    },
    {
      id: "3",
      message: "Pablito reportó que fracasó en ganar el semestre",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      isRead: true,
      type: "info",
    },
    {
      id: "4",
      message: "Danilito quiere que te unas a eliminar Perú",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
      isRead: false,
      type: "decision",
    },
  ],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      const exists = state.list.some(
        (n: Notification) => n.id === action.payload.id,
      );
      if (!exists) {
        state.list.unshift(action.payload);
      }
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
        status: "accepted" | "rejected";
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
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
  setDecisionStatus,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
