import { useEffect, useState } from "react";
import {
  BellRing,
  Check,
  ChevronRight,
  MonitorCog,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const PREFERENCES_KEY = "nexora.workspace.preferences.v1";

const defaultPreferences = {
  emailNotifications: true,
  weeklySummary: false,
  compactSpacing: false,
};

function PreferenceToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="app-preference-row">
      <div className="app-preference-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <label className="app-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={title}
        />
        <span className="app-switch-track" />
      </label>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="app-panel app-settings-section">
      <div className="app-settings-section-heading">
        <span className="app-settings-section-icon">
          <Icon size={19} />
        </span>

        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="app-settings-section-content">
        {children}
      </div>
    </section>
  );
}

export default function SettingsPage() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [saved, setSaved] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setPreferences({
          ...defaultPreferences,
          ...parsed,
        });
      }
    } catch {
      setStorageError(
        "Saved preferences could not be loaded from this browser."
      );
    }
  }, []);

  function updatePreference(key) {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));

    setSaved(false);
    setStorageError("");
  }

  function savePreferences() {
    try {
      localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify(preferences)
      );

      setSaved(true);
      setStorageError("");
    } catch {
      setSaved(false);
      setStorageError(
        "Your browser could not save these preferences."
      );
    }
  }

  function resetPreferences() {
    setPreferences(defaultPreferences);
    setSaved(false);
    setStorageError("");
  }

  return (
    <div className="app-page app-inner-page">
      <section className="app-page-heading-row">
        <div>
          <span className="app-eyebrow">MAKE IT YOURS</span>
          <h1 className="app-page-title">Settings</h1>
          <p className="app-page-description">
            Fine-tune how your workspace looks and keeps you informed.
          </p>
        </div>
      </section>

      <div className="app-settings-layout">
        <div className="app-settings-main">
          <SettingsSection
            icon={BellRing}
            title="Notifications"
            description="Choose the updates you would like to receive."
          >
            <PreferenceToggle
              title="Email notifications"
              description="Receive important account and workspace updates."
              checked={preferences.emailNotifications}
              onChange={() =>
                updatePreference("emailNotifications")
              }
            />

            <PreferenceToggle
              title="Weekly summary"
              description="Keep a weekly summary preference enabled."
              checked={preferences.weeklySummary}
              onChange={() => updatePreference("weeklySummary")}
            />
          </SettingsSection>

          <SettingsSection
            icon={MonitorCog}
            title="Appearance"
            description="Adjust the density of workspace content."
          >
            <PreferenceToggle
              title="Compact spacing"
              description="Save space by using a more compact layout preference."
              checked={preferences.compactSpacing}
              onChange={() => updatePreference("compactSpacing")}
            />

            <div className="app-settings-info-row">
              <span className="app-settings-info-icon">
                <Sparkles size={17} />
              </span>

              <div>
                <strong>Visual theme</strong>
                <p>
                  NEXORA currently uses its default navy and violet theme.
                </p>
              </div>

              <span className="app-theme-label">Default</span>
            </div>
          </SettingsSection>

          <SettingsSection
            icon={ShieldCheck}
            title="Account security"
            description="Understand how this demonstration workspace handles access."
          >
            <div className="app-settings-security-card">
              <span className="app-settings-security-icon">
                <ShieldCheck size={22} />
              </span>

              <div>
                <strong>Protected routes are enabled</strong>
                <p>
                  Private pages check the current authentication
                  state, and the Admin page checks the assigned role.
                </p>
              </div>

              <Check size={17} className="app-security-check" />
            </div>

            <div className="app-settings-security-foot">
              <span>Session storage</span>
              <span>Remember Me controls persistence</span>
            </div>
          </SettingsSection>
        </div>

        <aside className="app-settings-sidebar">
          <div className="app-settings-save-card">
            <span className="app-settings-save-icon">
              <Check size={21} />
            </span>

            <h2>Preferences</h2>

            <p>
              Keep the workspace aligned with the way you prefer to work.
            </p>

            <div className="app-settings-save-divider" />

            <div className="app-settings-save-state">
              <span className="app-settings-state-dot" />
              <span>
                {saved ? "Changes saved" : "Unsaved changes may be present"}
              </span>
            </div>

            {storageError && (
              <p className="app-settings-error" role="alert">
                {storageError}
              </p>
            )}

            <button
              type="button"
              className="app-primary-button app-save-button"
              onClick={savePreferences}
            >
              {saved ? "Preferences saved" : "Save preferences"}
              <ChevronRight size={17} />
            </button>

            <button
              type="button"
              className="app-reset-button"
              onClick={resetPreferences}
            >
              <RotateCcw size={14} />
              Reset to defaults
            </button>

            {saved && (
              <div className="app-saved-message" role="status">
                <Check size={15} />
                Saved in this browser.
              </div>
            )}
          </div>

          <div className="app-settings-help">
            <div className="app-settings-help-icon">
              <ShieldCheck size={19} />
            </div>

            <strong>Demo environment</strong>

            <p>
              These preferences are stored locally. They are not
              synchronized to other devices or saved to an API.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}