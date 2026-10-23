import { ShieldAlert, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <main className="app-unauthorized-page">
      <div className="app-unauthorized-glow" />

      <section className="app-unauthorized-card">
        <span className="app-unauthorized-icon">
          <ShieldAlert size={32} />
        </span>

        <span className="app-eyebrow">ACCESS RESTRICTED</span>

        <h1>This area is for administrators.</h1>

        <p>
          Your account does not have the required role to open this page.
          You can return to your workspace and continue from there.
        </p>

        <Link
          to="/dashboard"
          className="app-primary-button app-unauthorized-button"
        >
          <LayoutDashboard size={17} />
          Back to dashboard
        </Link>

        <Link to="/dashboard/profile" className="app-unauthorized-back">
          <ArrowLeft size={14} />
          View your profile
        </Link>
      </section>
    </main>
  );
}