import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth/context.ts";

type RoleGuardProps = {
  allowedRoles: string[];
};

const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated || !user) return <Navigate to="/auth" replace />;

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/homepage" replace />
  );
};

export default RoleGuard;
