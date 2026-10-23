import { Navigate, Route, Routes } from "react-router-dom";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import RoleGuard from "../components/auth/RoleGuard";

import ProtectedLayout from "../layouts/ProtectedLayout";

import LoginPage from "../pages/auth/LoginPage";
import DashboardHomePage from "../pages/dashboard/DashboardHomePage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import SettingsPage from "../pages/dashboard/SettingsPage";
import AdminPage from "../pages/dashboard/AdminPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardHomePage />}
          />

          <Route
            path="/dashboard/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/dashboard/settings"
            element={<SettingsPage />}
          />

          <Route
            path="/dashboard/admin"
            element={
              <RoleGuard>
                <AdminPage />
              </RoleGuard>
            }
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}