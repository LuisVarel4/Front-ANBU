import { createSafeContext } from "../../utils/CreateSafeContext.tsx";
import type { AuthContextType } from "./auth.type.ts";

export const [AuthContext, useAuthContext] = createSafeContext<AuthContextType>(
  "useAuth must be used within an AuthProvider",
);
