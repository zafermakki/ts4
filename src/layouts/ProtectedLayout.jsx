import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

export default function ProtectedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`app-shell ${
        sidebarCollapsed ? "app-shell--collapsed" : ""
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        collapsed={sidebarCollapsed}
        onNavigate={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="app-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="app-main">
        <Navbar
          onMenuClick={() => setSidebarOpen((open) => !open)}
          onCollapseClick={() =>
            setSidebarCollapsed((collapsed) => !collapsed)
          }
        />

        <main className="app-content">
          <Outlet />
        </main>

        <footer className="app-footer">
          <span>© {new Date().getFullYear()} NEXORA</span>
          <span>Designed for focused work.</span>
        </footer>
      </div>
    </div>
  );
}