import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  PanelLeftClose,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const pageInfo = {
  "/dashboard": {
    title: "Overview",
    subtitle: "Your workspace at a glance.",
  },
  "/dashboard/profile": {
    title: "My Profile",
    subtitle: "Your personal information and account details.",
  },
  "/dashboard/settings": {
    title: "Settings",
    subtitle: "Make your workspace work for you.",
  },
  "/dashboard/admin": {
    title: "Admin Center",
    subtitle: "Workspace administration and access overview.",
  },
};

export default function Navbar({
  onMenuClick,
  onCollapseClick,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const currentPage =
    pageInfo[location.pathname] || pageInfo["/dashboard"];

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Workspace User";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function closeMenus() {
    setNotificationsOpen(false);
    setAccountOpen(false);
  }

  return (
    <header className="app-topbar">
      <div className="app-topbar-leading">
        <button
          type="button"
          className="app-icon-button app-mobile-menu"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          className="app-icon-button app-desktop-collapse"
          aria-label="Collapse or expand navigation"
          onClick={onCollapseClick}
        >
          <PanelLeftClose size={19} />
        </button>

        <div className="app-page-heading">
          <div className="app-breadcrumb">
            <span>Workspace</span>
            <span className="app-breadcrumb-separator">/</span>
            <strong>{currentPage.title}</strong>
          </div>

          <p>{currentPage.subtitle}</p>
        </div>
      </div>

      <div className="app-topbar-actions">
        <div className="app-date-chip">
          <span className="app-date-dot" />
          {formattedDate}
        </div>

        <div className="app-dropdown-wrap">
          <button
            type="button"
            className={`app-icon-button app-notification-button ${
              notificationsOpen ? "is-open" : ""
            }`}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setAccountOpen(false);
            }}
          >
            <Bell size={19} />
            <span className="app-notification-dot" />
          </button>

          {notificationsOpen && (
            <div className="app-dropdown app-notifications-dropdown">
              <div className="app-dropdown-header">
                <strong>Notifications</strong>
                <span>Demo</span>
              </div>

              <div className="app-notification-item">
                <span className="app-notification-symbol">
                  <ShieldCheck size={17} />
                </span>

                <div>
                  <strong>Secure session active</strong>
                  <p>Your workspace session is ready.</p>
                </div>
              </div>

              <div className="app-notification-item">
                <span className="app-notification-symbol app-symbol-purple">
                  <Settings size={17} />
                </span>

                <div>
                  <strong>Personalize your space</strong>
                  <p>Visit settings to review your preferences.</p>
                  <Link
                    to="/dashboard/settings"
                    onClick={closeMenus}
                  >
                    Open settings
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="app-account-dropdown-wrap">
          <button
            type="button"
            className={`app-user-menu ${
              accountOpen ? "is-open" : ""
            }`}
            aria-expanded={accountOpen}
            onClick={() => {
              setAccountOpen((open) => !open);
              setNotificationsOpen(false);
            }}
          >
            <span className="app-avatar app-avatar--topbar">
              {user?.image ? (
                <img src={user.image} alt="" />
              ) : (
                <span>{user?.firstName?.charAt(0) || "U"}</span>
              )}
            </span>

            <span className="app-user-menu-copy">
              <strong>{displayName}</strong>
              <small>{user?.role || "user"}</small>
            </span>

            <ChevronDown size={15} />
          </button>

          {accountOpen && (
            <div className="app-dropdown app-user-dropdown">
              <div className="app-dropdown-user-info">
                <strong>{displayName}</strong>
                <span>{user?.email}</span>
              </div>

              <Link
                to="/dashboard/profile"
                onClick={closeMenus}
              >
                <UserRound size={16} />
                My profile
              </Link>

              <Link
                to="/dashboard/settings"
                onClick={closeMenus}
              >
                <Settings size={16} />
                Settings
              </Link>

              <button type="button" onClick={handleLogout}>
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}