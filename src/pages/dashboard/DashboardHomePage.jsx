import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  Zap,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const weeklyActivity = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 67 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 84 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 34 },
  { day: "Sun", value: 46 },
];

const initialTasks = [
  {
    id: 1,
    title: "Review workspace goals",
    subtitle: "Plan your priorities for the week",
    done: true,
  },
  {
    id: 2,
    title: "Update your profile",
    subtitle: "Keep your account details current",
    done: false,
  },
  {
    id: 3,
    title: "Review security settings",
    subtitle: "Check your account preferences",
    done: false,
  },
];

const recentActivity = [
  {
    id: 1,
    title: "Session verified",
    description: "Your account was authenticated.",
    time: "Current session",
    type: "security",
  },
  {
    id: 2,
    title: "Workspace opened",
    description: "You entered your dashboard.",
    time: "Just now",
    type: "workspace",
  },
  {
    id: 3,
    title: "Profile ready",
    description: "Your account details are available.",
    time: "Account",
    type: "profile",
  },
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function DashboardHomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(initialTasks);

  const firstName = user?.firstName || user?.username || "there";

  const completedTasks = tasks.filter((task) => task.done).length;
  const completionPercentage = Math.round(
    (completedTasks / tasks.length) * 100
  );

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  return (
    <div className="app-page app-dashboard-home">
      <section className="app-page-heading-row">
        <div>
          <span className="app-eyebrow">YOUR OVERVIEW</span>

          <h1 className="app-page-title">
            {getGreeting()}, {firstName}
            <span className="app-title-sparkle">✦</span>
          </h1>

          <p className="app-page-description">
            A fresh look at your workspace and what matters today.
          </p>
        </div>

        <button
          type="button"
          className="app-secondary-button"
          onClick={() => navigate("/dashboard/profile")}
        >
          <span>View profile</span>
          <ArrowUpRight size={16} />
        </button>
      </section>

      <section className="app-welcome-banner">
        <div className="app-welcome-copy">
          <div className="app-banner-pill">
            <Sparkles size={13} />
            YOUR WEEKLY FOCUS
          </div>

          <h2>A little progress adds up.</h2>

          <p>
            Build good habits, stay intentional, and keep your
            next step in sight.
          </p>

          <button
            type="button"
            className="app-banner-button"
            onClick={() => navigate("/dashboard/settings")}
          >
            Personalize your workspace
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="app-banner-art" aria-hidden="true">
          <div className="app-banner-orbit app-banner-orbit-one" />
          <div className="app-banner-orbit app-banner-orbit-two" />

          <div className="app-banner-center">
            <Target size={34} strokeWidth={1.6} />
          </div>

          <span className="app-banner-float app-banner-float-one">
            <Zap size={18} />
          </span>

          <span className="app-banner-float app-banner-float-two">
            <Check size={18} />
          </span>
        </div>
      </section>

      <section className="app-stats-grid" aria-label="Workspace summary">
        <article className="app-stat-card">
          <div className="app-stat-top">
            <span className="app-stat-icon app-stat-purple">
              <FolderKanban size={19} />
            </span>

            <span className="app-stat-trend">
              <ArrowUpRight size={14} />
              12%
            </span>
          </div>

          <span className="app-stat-label">Active projects</span>

          <div className="app-stat-bottom">
            <strong>12</strong>
            <span>vs. last month</span>
          </div>

          <div className="app-stat-mini-line app-line-purple">
            <span />
          </div>
        </article>

        <article className="app-stat-card">
          <div className="app-stat-top">
            <span className="app-stat-icon app-stat-blue">
              <ListTodo size={19} />
            </span>

            <span className="app-stat-trend">
              <ArrowUpRight size={14} />
              8%
            </span>
          </div>

          <span className="app-stat-label">Tasks completed</span>

          <div className="app-stat-bottom">
            <strong>28</strong>
            <span>this week</span>
          </div>

          <div className="app-stat-mini-line app-line-blue">
            <span />
          </div>
        </article>

        <article className="app-stat-card">
          <div className="app-stat-top">
            <span className="app-stat-icon app-stat-green">
              <TrendingUp size={19} />
            </span>

            <span className="app-stat-trend">
              <ArrowUpRight size={14} />
              16%
            </span>
          </div>

          <span className="app-stat-label">Productivity score</span>

          <div className="app-stat-bottom">
            <strong>86<span className="app-stat-unit">/100</span></strong>
            <span>great momentum</span>
          </div>

          <div className="app-stat-mini-line app-line-green">
            <span />
          </div>
        </article>

        <article className="app-stat-card">
          <div className="app-stat-top">
            <span className="app-stat-icon app-stat-orange">
              <Clock3 size={19} />
            </span>

            <span className="app-stat-trend app-trend-neutral">
              <Activity size={14} />
              Steady
            </span>
          </div>

          <span className="app-stat-label">Focus time</span>

          <div className="app-stat-bottom">
            <strong>18.5<span className="app-stat-unit">h</span></strong>
            <span>this week</span>
          </div>

          <div className="app-stat-mini-line app-line-orange">
            <span />
          </div>
        </article>
      </section>

      <div className="app-dashboard-grid">
        <section className="app-panel app-activity-panel">
          <div className="app-panel-heading">
            <div>
              <h2>Activity overview</h2>
              <p>Your activity throughout the week.</p>
            </div>

            <span className="app-panel-period">Last 7 days</span>
          </div>

          <div className="app-chart-summary">
            <div>
              <strong>6.8h</strong>
              <span>Average daily focus</span>
            </div>

            <span className="app-chart-comparison">
              <ArrowUpRight size={14} />
              On track
            </span>
          </div>

          <div
            className="app-bar-chart"
            role="img"
            aria-label="Illustrative weekly activity chart"
          >
            <div className="app-chart-grid-lines">
              <span />
              <span />
              <span />
              <span />
            </div>

            {weeklyActivity.map((item, index) => (
              <div className="app-chart-column" key={item.day}>
                <div className="app-chart-bar-track">
                  <div
                    className={`app-chart-bar ${
                      index === 3 ? "app-chart-bar-highlight" : ""
                    }`}
                    style={{ height: `${item.value}%` }}
                  >
                    <span className="app-chart-tooltip">
                      {item.value}%
                    </span>
                  </div>
                </div>

                <span className="app-chart-day">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="app-chart-legend">
            <span className="app-legend-dot" />
            Weekly activity
            <span className="app-chart-note">
              Illustrative demo data
            </span>
          </div>
        </section>

        <section className="app-panel app-tasks-panel">
          <div className="app-panel-heading">
            <div>
              <h2>Today's focus</h2>
              <p>Small steps, meaningful progress.</p>
            </div>

            <span className="app-task-count">
              {completedTasks}/{tasks.length}
            </span>
          </div>

          <div className="app-task-progress">
            <div>
              <span>Completion</span>
              <strong>{completionPercentage}%</strong>
            </div>

            <div className="app-task-progress-track">
              <span style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>

          <div className="app-task-list">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                className={`app-task-item ${
                  task.done ? "is-complete" : ""
                }`}
                onClick={() => toggleTask(task.id)}
                aria-pressed={task.done}
              >
                <span className="app-task-check">
                  {task.done && <Check size={13} />}
                </span>

                <span className="app-task-copy">
                  <strong>{task.title}</strong>
                  <small>{task.subtitle}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="app-task-footnote">
            <CheckCircle2 size={15} />
            Your checklist updates instantly.
          </div>
        </section>
      </div>

      <div className="app-dashboard-bottom-grid">
        <section className="app-panel app-recent-panel">
          <div className="app-panel-heading">
            <div>
              <h2>Recent activity</h2>
              <p>A quick look at your workspace activity.</p>
            </div>

            <span className="app-live-indicator">
              <span />
              Live session
            </span>
          </div>

          <div className="app-timeline">
            {recentActivity.map((item) => (
              <div className="app-timeline-item" key={item.id}>
                <div
                  className={`app-timeline-icon app-timeline-${item.type}`}
                >
                  {item.type === "security" && (
                    <CheckCircle2 size={16} />
                  )}

                  {item.type === "workspace" && (
                    <BriefcaseBusiness size={16} />
                  )}

                  {item.type === "profile" && (
                    <UsersRound size={16} />
                  )}
                </div>

                <div className="app-timeline-copy">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>

                <span className="app-timeline-time">{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="app-focus-card">
          <div className="app-focus-decoration" />

          <span className="app-focus-icon">
            <Sparkles size={20} />
          </span>

          <span className="app-focus-kicker">A MOMENT FOR YOU</span>

          <h2>Give your best work your best attention.</h2>

          <p>
            A quick review of your goals can turn a busy day into
            a purposeful one.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/settings")}
          >
            Explore preferences
            <ArrowRight size={15} />
          </button>

          <div className="app-focus-foot">
            <span>Keep going</span>
            <ArrowDownRight size={15} />
          </div>
        </section>
      </div>

      <p className="app-demo-disclaimer">
        <Sparkles size={13} />
        Workspace metrics and activity examples are demonstration data,
        not live analytics from a backend.
      </p>
    </div>
  );
}