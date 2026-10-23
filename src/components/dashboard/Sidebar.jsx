import { NavLink } from "react-router-dom";
import {
  Activity,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const navigationItems = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        label: "My Profile",
        path: "/dashboard/profile",
        icon: UserRound,
      },
      {
        label: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  isOpen,
  collapsed,
  onNavigate,
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Workspace User";

  return (
    <aside
      className={`app-sidebar
        ${isOpen ? "app-sidebar--open" : ""}
        ${collapsed ? "app-sidebar--collapsed" : ""}
      `}
    >
      <NavLink
        to="/dashboard"
        className="app-brand"
        onClick={onNavigate}
        aria-label="NEXORA Dashboard"
      >
        <span className="app-brand-icon">
          <Sparkles size={20} />
        </span>

        <span className="app-brand-copy">
          <strong>NEXORA</strong>
          <small>WORKSPACE</small>
        </span>
      </NavLink>

      <div className="app-sidebar-scroll">
        {navigationItems.map((section) => (
          <div className="app-nav-section" key={section.label}>
            <div className="app-nav-section-title">
              {section.label}
            </div>

            <nav className="app-nav-list">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    title={collapsed ? item.label : undefined}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `app-nav-link ${isActive ? "is-active" : ""}`
                    }
                  >
                    <Icon size={19} strokeWidth={1.8} />
                    <span className="app-nav-label">
                      {item.label}
                    </span>
                    <span className="app-nav-active-mark" />
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}

        {isAdmin && (
          <div className="app-nav-section">
            <div className="app-nav-section-title">
              Administration
            </div>

            <nav className="app-nav-list">
              <NavLink
                to="/dashboard/admin"
                title={collapsed ? "Admin Center" : undefined}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `app-nav-link ${isActive ? "is-active" : ""}`
                }
              >
                <ShieldCheck size={19} strokeWidth={1.8} />
                <span className="app-nav-label">Admin Center</span>
                <span className="app-nav-active-mark" />
              </NavLink>
            </nav>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="app-sidebar-promo">
          <div className="app-promo-icon">
            <Activity size={17} />
          </div>

          <strong>Your space, in sync.</strong>

          <p>
            Keep your goals, activity, and settings in one place.
          </p>
        </div>
      )}

      <div className="app-sidebar-account">
        <div className="app-avatar app-avatar--sidebar">
          {user?.image ? (
            <img src={user.image} alt="" />
          ) : (
            <span>{user?.firstName?.charAt(0) || "U"}</span>
          )}
          <i />
        </div>

        <div className="app-sidebar-user">
          <strong>{displayName}</strong>
          <span>{user?.role || "user"} account</span>
        </div>

        <span className="app-account-status" title="Signed in" />
      </div>
    </aside>
  );
}