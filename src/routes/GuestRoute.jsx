import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="route-loading">
        <span className="loading-spinner" />
        <p>Preparing your workspace...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}