import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login({
        email,
        password,
        rememberMe,
      });

      const destination =
        location.state?.from?.pathname || "/dashboard";

      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.message || "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function fillDemoCredentials() {
    setEmail("emily.johnson@x.dummyjson.com");
    setPassword("emilyspass");
    setError("");
    setShowDemo(false);
  }

  return (
    <main className="auth-page">
      <section className="auth-story">
        <div className="story-glow story-glow-one" />
        <div className="story-glow story-glow-two" />

        <header className="brand-lockup">
          <div className="brand-icon">
            <Sparkles size={21} strokeWidth={2.2} />
          </div>

          <span className="brand-name">NEXORA</span>
          <span className="brand-divider" />
          <span className="brand-caption">WORKSPACE</span>
        </header>

        <div className="story-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR SPACE. YOUR MOMENTUM.
          </div>

          <h1>
            Great work
            <br />
            starts with
            <br />
            <span className="gradient-text">a clear mind.</span>
          </h1>

          <p className="story-description">
            A calmer, smarter way to manage your workspace.
            Bring your focus, your people, and your progress
            together in one beautifully organized place.
          </p>

          <div className="story-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">
                <ShieldCheck size={19} />
              </span>

              <div>
                <strong>Protected by design</strong>
                <span>Your workspace stays yours.</span>
              </div>
            </div>

            <div className="benefit-item">
              <span className="benefit-icon">
                <Zap size={19} />
              </span>

              <div>
                <strong>Less noise, more focus</strong>
                <span>Keep your next move in sight.</span>
              </div>
            </div>
          </div>

          <div className="story-preview">
            <div className="preview-topbar">
              <div className="preview-brand">
                <span className="preview-brand-mark">
                  <Activity size={15} />
                </span>

                <span>Workspace overview</span>
              </div>

              <span className="preview-status">
                <span />
                All systems ready
              </span>
            </div>

            <div className="preview-body">
              <div className="preview-heading">
                <div>
                  <span className="preview-muted">
                    YOUR PERSONAL SPACE
                  </span>

                  <strong>Make room for great ideas.</strong>
                </div>

                <div className="preview-avatar">
                  N
                </div>
              </div>

              <div className="preview-cards">
                <div className="preview-card">
                  <span className="preview-card-icon purple">
                    <Fingerprint size={17} />
                  </span>

                  <span>Identity</span>
                  <strong>Verified access</strong>
                  <div className="preview-progress purple-progress">
                    <span />
                  </div>
                </div>

                <div className="preview-card">
                  <span className="preview-card-icon blue">
                    <Activity size={17} />
                  </span>

                  <span>Session</span>
                  <strong>Ready to focus</strong>
                  <div className="preview-progress blue-progress">
                    <span />
                  </div>
                </div>
              </div>

              <div className="preview-footer">
                <span className="preview-footer-check">
                  <ShieldCheck size={15} />
                </span>

                <span>One secure entry to everything you need.</span>

                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        </div>

        <footer className="story-footer">
          <span>Thoughtfully designed for better work.</span>
          <span>© {new Date().getFullYear()} NEXORA</span>
        </footer>
      </section>

      <section className="auth-form-panel">
        <div className="mobile-brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>

          <span className="brand-name">NEXORA</span>
        </div>

        <div className="login-container">
          <div className="login-heading">
            <div className="login-icon">
              <LockKeyhole size={23} strokeWidth={1.9} />
            </div>

            <div className="login-welcome">
              <span className="login-kicker">
                WELCOME BACK
              </span>

              <h2>Sign in to your space</h2>

              <p>
                Enter your details to access your workspace.
              </p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="email">Email address</label>

              <div className="input-shell">
                <Mail size={18} className="input-icon" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field-label-row">
                <label htmlFor="password">Password</label>
                <span className="secure-label">
                  <ShieldCheck size={13} />
                  Secure sign-in
                </span>
              </div>

              <div className="input-shell">
                <LockKeyhole size={18} className="input-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span className="custom-checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-action"
                onClick={() => setShowDemo((visible) => !visible)}
              >
                Demo access
                <ArrowUpRight size={14} />
              </button>
            </div>

            {showDemo && (
              <div className="demo-panel">
                <div>
                  <strong>Explore with a demo account</strong>

                  <span>
                    Uses the public DummyJSON test account.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={fillDemoCredentials}
                >
                  Fill credentials
                </button>
              </div>
            )}

            {error && (
              <div className="form-error" role="alert">
                <span className="error-indicator">!</span>
                <span>{error}</span>
              </div>
            )}

            <button
              className="sign-in-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="button-spinner" />
                  Signing you in...
                </>
              ) : (
                <>
                  <span>Sign in to workspace</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="login-security-note">
            <ShieldCheck size={17} />

            <p>
              Your session is verified before your workspace opens.
            </p>
          </div>

          <div className="login-bottom">
            <span>New here? This is a demonstration workspace.</span>
          </div>
        </div>
      </section>
    </main>
  );
}