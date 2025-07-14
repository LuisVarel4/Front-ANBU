import { createSafeContext } from "../../utils/CreateSafeContext.tsx";
import type { ChatContextType } from "./chat.type.ts";

export const [ChatContext, useChatContext] = createSafeContext<ChatContextType>(
  "useChat must be used within an ChatProvider",
);
