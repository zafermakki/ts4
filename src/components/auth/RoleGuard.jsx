import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RoleGuard({ children }) {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}