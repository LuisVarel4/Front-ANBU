import { useAuthContext } from "../context/auth/context.ts";
import { Navigate, Outlet } from "react-router-dom";
import {
  GHOST_ENTRY_PATH,
  REDIRECT_URL_KEY,
} from "../constants/app.constant.ts";

const AuthGuard = () => {
  const { isFullyAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return isFullyAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={`${GHOST_ENTRY_PATH}?${REDIRECT_URL_KEY}=${location.pathname}`}
      replace
    />
  );
};

export default AuthGuard;
