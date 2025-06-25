import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Message } from "../../types/chat";

const fakeApiMessages: Message[] = [
  {
    id: "3",
    username: "Kakashi",
    content: "Equipo 7, reúnanse en la entrada del bosque.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
  },
  {
    id: "4",
    username: "Sakura",
    content: "¡Entendido, Kakashi-sensei!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1 + 10000).toISOString(),
  },
  {
    id: "5",
    username: "Naruto",
    content: "¡Ya voy, espérenme!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1 + 20000).toISOString(),
  },
  {
    id: "6",
    username: "Sasuke",
    content: "No llegues tarde otra vez, usuratonkachi.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1 + 30000).toISOString(),
  },
  {
    id: "7",
    username: "Hinata",
    content: "Naruto-kun... ¡buena suerte en la misión!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 0.5).toISOString(),
  },
  {
    id: "8",
    username: "Shikamaru",
    content: "Qué fastidio... otra misión de patrullaje.",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "9",
    username: "Temari",
    content: "Deja de quejarte, Shikamaru.",
    createdAt: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
  },
  {
    id: "10",
    username: "Tsunade",
    content: "Todos los ANBU, a la torre del Hokage, ¡de inmediato! ",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "11",
    username: "Yamato",
    content: "Entendido, Lady Tsunade.",
    createdAt: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
  },
];

// Estado inicial
interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
};

// Simula una petición GET
export const fetchMessages = createAsyncThunk<Message[]>(
  "chat/fetchMessages",
  async () => {
    return new Promise<Message[]>((resolve) =>
      setTimeout(() => {
        resolve(fakeApiMessages);
      }, 500),
    );
  },
);

// Simula una petición POST
export const sendMessage = createAsyncThunk<
  Message,
  Omit<Message, "id" | "createdAt">
>("chat/sendMessage", async (message) => {
  const newMessage: Message = {
    ...message,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  return new Promise<Message>((resolve) =>
    setTimeout(() => resolve(newMessage), 300),
  );
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<Message[]>) => {
          state.messages = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<Message>) => {
          state.messages.push(action.payload);
        },
      );
  },
});

export default chatSlice.reducer;
