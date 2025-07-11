import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// reducers
import chatReducer from "./chat/slice.ts";
import notificationsReducer from "./notifications/slice";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    chat: chatReducer,
  },
});

// Tipos globales
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
