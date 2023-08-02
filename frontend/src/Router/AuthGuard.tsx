import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    // Redirecionar para /login
    return <Navigate to="/login" replace />
  }

  if (signedIn && !isPrivate) {
    // Redirecionar para / (dashboard)
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
