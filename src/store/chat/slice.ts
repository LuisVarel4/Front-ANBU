import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '../../types/chat';

interface ChatState {
  liveMessages: Message[];
  messages: Message[]
}

const initialState: ChatState = {
  liveMessages: [],
  messages: []
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    prependMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...action.payload, ...state.messages];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.liveMessages.push(action.payload);
    },
    clearMessages: (state) => {
      state.liveMessages = [];
    },

    addLiveMessage: (state, action: PayloadAction<Message>) => {
      state.liveMessages.push(action.payload);
    },
    confirmMessage: (state, action) => {
      const { tempId, ...confirmed } = action.payload;
      const index = state.liveMessages.findIndex(m => m.id === tempId);
      if (index !== -1) {
        state.liveMessages[index] = {
          ...confirmed,
          status: "sent",
        };
      } else {
        state.liveMessages.push({
          ...confirmed,
          status: "sent",
        });
      }
    }
  },
});

export const { addMessage, prependMessages, confirmMessage, addLiveMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;