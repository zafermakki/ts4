import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const demoMembers = [
  {
    id: 1,
    name: "Workspace Owner",
    email: "owner@example.com",
    role: "Admin",
    status: "Active",
    initials: "WO",
  },
  {
    id: 2,
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "Member",
    status: "Active",
    initials: "AM",
  },
  {
    id: 3,
    name: "Taylor Brooks",
    email: "taylor@example.com",
    role: "Member",
    status: "Pending",
    initials: "TB",
  },
];

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="app-page app-inner-page">
      <section className="app-page-heading-row">
        <div>
          <span className="app-eyebrow">ADMINISTRATION</span>
          <h1 className="app-page-title">Admin Center</h1>
          <p className="app-page-description">
            Review role-based access and the sample workspace roster.
          </p>
        </div>

        <span className="app-admin-access-badge">
          <ShieldCheck size={15} />
          Admin access
        </span>
      </section>

      <section className="app-admin-welcome">
        <div>
          <span>CONTROL YOUR WORKSPACE</span>

          <h2>
            Welcome to the control room
            <span> ✦</span>
          </h2>

          <p>
            Your current demo role gives you access to this
            administrative view.
          </p>
        </div>

        <div className="app-admin-welcome-icon">
          <ShieldCheck size={35} />
        </div>
      </section>

      <div className="app-admin-stats">
        <article className="app-panel app-admin-stat-card">
          <span className="app-admin-stat-icon app-stat-purple">
            <UsersRound size={20} />
          </span>

          <span>Sample members</span>
          <strong>03</strong>
          <small>Example roster only</small>
        </article>

        <article className="app-panel app-admin-stat-card">
          <span className="app-admin-stat-icon app-stat-green">
            <CheckCircle2 size={20} />
          </span>

          <span>Active examples</span>
          <strong>02</strong>
          <small>Illustrative status</small>
        </article>

        <article className="app-panel app-admin-stat-card">
          <span className="app-admin-stat-icon app-stat-blue">
            <Activity size={20} />
          </span>

          <span>Access policy</span>
          <strong>RBAC</strong>
          <small>Role-based route guard</small>
        </article>
      </div>

      <section className="app-panel app-admin-members-panel">
        <div className="app-panel-heading">
          <div>
            <h2>Workspace members</h2>
            <p>Illustrative roster for the admin interface.</p>
          </div>

          <span className="app-demo-table-badge">Demo data</span>
        </div>

        <div className="app-admin-table-wrap">
          <table className="app-admin-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Access</th>
              </tr>
            </thead>

            <tbody>
              {demoMembers.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="app-admin-member-cell">
                      <span className="app-admin-member-avatar">
                        {member.initials}
                      </span>

                      <span>
                        <strong>{member.name}</strong>
                        <small>{member.email}</small>
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`app-admin-role ${
                        member.role === "Admin" ? "is-admin" : ""
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`app-admin-status ${
                        member.status === "Pending" ? "is-pending" : ""
                      }`}
                    >
                      <span />
                      {member.status}
                    </span>
                  </td>

                  <td>
                    <span className="app-admin-view-only">
                      <ShieldCheck size={14} />
                      {member.role === "Admin" ? "Elevated" : "Standard"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="app-admin-notice">
        <ShieldCheck size={19} />

        <div>
          <strong>Role-based access is active in the frontend.</strong>

          <p>
            You are signed in as {user?.username || "the current user"}.
            The role mapping is for this demo; production authorization
            must also be enforced by the backend.
          </p>
        </div>

        <ArrowUpRight size={17} />
      </div>
    </div>
  );
}