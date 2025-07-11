import { useAuthContext } from "../context/auth/context.ts";
import { Navigate, Outlet } from "react-router-dom";
import { HOME_PATH, REDIRECT_URL_KEY } from "../constants/app.constant.ts";

const GhostGuard = () => {
  const { isFullyAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  const redirectTo = new URLSearchParams(window.location.search).get(
    REDIRECT_URL_KEY,
  );

  return isFullyAuthenticated ? (
    <Navigate to={redirectTo || HOME_PATH} />
  ) : (
    <Outlet />
  );
};

export default GhostGuard;
