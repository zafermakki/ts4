import {
  CalendarDays,
  CheckCircle2,
  Fingerprint,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="app-profile-detail">
      <span className="app-profile-detail-icon">
        <Icon size={17} />
      </span>

      <div className="app-profile-detail-copy">
        <span>{label}</span>
        <strong>{value || "Not provided"}</strong>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Workspace User";

  return (
    <div className="app-page app-inner-page">
      <section className="app-page-heading-row">
        <div>
          <span className="app-eyebrow">YOUR IDENTITY</span>
          <h1 className="app-page-title">My Profile</h1>
          <p className="app-page-description">
            View your account details and access information.
          </p>
        </div>
      </section>

      <section className="app-profile-hero">
        <div className="app-profile-cover">
          <span className="app-profile-cover-orb app-cover-orb-one" />
          <span className="app-profile-cover-orb app-cover-orb-two" />
          <span className="app-profile-cover-orb app-cover-orb-three" />
        </div>

        <div className="app-profile-summary">
          <div className="app-avatar app-profile-avatar">
            {user?.image ? (
              <img src={user.image} alt="" />
            ) : (
              <span>{user?.firstName?.charAt(0) || "U"}</span>
            )}
          </div>

          <div className="app-profile-summary-copy">
            <div className="app-profile-name-line">
              <h2>{fullName}</h2>

              <span className="app-verified-badge">
                <CheckCircle2 size={14} />
                Verified session
              </span>
            </div>

            <p>{user?.email || "No email provided"}</p>

            <div className="app-profile-meta">
              <span>
                <UserRound size={14} />
                @{user?.username || "user"}
              </span>

              <span className="app-profile-role">
                <ShieldCheck size={14} />
                {user?.role || "user"} account
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="app-profile-grid">
        <section className="app-panel app-profile-details-panel">
          <div className="app-panel-heading">
            <div>
              <h2>Personal information</h2>
              <p>Details returned by your demo account.</p>
            </div>

            <span className="app-panel-heading-icon">
              <UserRound size={18} />
            </span>
          </div>

          <div className="app-profile-details-list">
            <DetailRow
              icon={UserRound}
              label="First name"
              value={user?.firstName}
            />

            <DetailRow
              icon={UserRound}
              label="Last name"
              value={user?.lastName}
            />

            <DetailRow
              icon={Mail}
              label="Email address"
              value={user?.email}
            />

            <DetailRow
              icon={Fingerprint}
              label="Username"
              value={user?.username}
            />

            <DetailRow
              icon={MapPin}
              label="Location"
              value={
                [user?.address?.city, user?.address?.country]
                  .filter(Boolean)
                  .join(", ") || null
              }
            />
          </div>
        </section>

        <div className="app-profile-side-column">
          <section className="app-panel app-account-status-panel">
            <div className="app-panel-heading">
              <div>
                <h2>Account status</h2>
                <p>Your current access state.</p>
              </div>
            </div>

            <div className="app-account-status-row">
              <span className="app-account-status-icon">
                <ShieldCheck size={20} />
              </span>

              <div>
                <strong>Authenticated</strong>
                <span>Your session is active.</span>
              </div>

              <span className="app-status-pill">Active</span>
            </div>

            <div className="app-account-status-row">
              <span className="app-account-status-icon app-status-icon-purple">
                <Fingerprint size={20} />
              </span>

              <div>
                <strong>Access level</strong>
                <span>Based on your assigned role.</span>
              </div>

              <span className="app-status-pill app-role-pill">
                {user?.role || "user"}
              </span>
            </div>
          </section>

          <section className="app-profile-note-card">
            <span className="app-profile-note-icon">
              <CalendarDays size={20} />
            </span>

            <h3>Keep your account current</h3>

            <p>
              This demo profile is read-only. Editing and saving
              profile changes requires a backend endpoint.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}