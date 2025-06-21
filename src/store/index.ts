import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './notifications/slice';

export const store = configureStore({
    reducer: {
        notifications: notificationsReducer,
    },
});

// Tipos globales
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
