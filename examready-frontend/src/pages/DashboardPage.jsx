import { useState } from "react";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import SubjectCard from "../components/SubjectCard";
import { progressData, recentQuizzes } from "../data/subjects";
import subjects from "../data/subjects";
import "./DashboardPage.css";

const STATS = [
  { num: "247",  lbl: "Questions Answered", change: "+12 this week"       },
  { num: "73%",  lbl: "Average Score",       change: "+5% from last week"  },
  { num: "18",   lbl: "Quizzes Completed",   change: "+3 this week"        },
  { num: "5🔥",  lbl: "Day Streak",          change: "Keep it up!"         },
];

function DashboardPage({ user, setPage }) {
  const [activeNav, setActiveNav] = useState("overview");

  const navItems = [
    { id: "overview", icon: "🏠", label: "Overview"    },
    { id: "practice", icon: "📝", label: "Practice"    },
    { id: "progress", icon: "📊", label: "My Progress" },
  ];

  return (
    <div className="page">
      <div className="dashboard-layout">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Main</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.id === "practice") setPage("quiz");
                }}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Subjects</div>
            {subjects.slice(0, 4).map((s) => (
              <button key={s.name} className="sidebar-item" onClick={() => setPage("quiz")}>
                <span>{s.icon}</span> {s.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <div className="dash-header">
            <h1>Welcome back, {user?.name} 👋</h1>
            <p>You're on a 5-day streak — keep it going!</p>
          </div>

          {/* Stats row */}
          <div className="stats-row">
            {STATS.map((s, i) => <StatCard key={i} {...s} />)}
          </div>

          {/* Two-col grid */}
          <div className="dash-grid">
            <div className="dash-card">
              <h3>Subject Progress</h3>
              {progressData.map((p) => (
                <ProgressBar key={p.subject} subject={p.subject} pct={p.pct} />
              ))}
            </div>

            <div className="dash-card">
              <h3>Recent Quizzes</h3>
              <ul className="quiz-list">
                {recentQuizzes.map((q, i) => (
                  <li key={i}>
                    <span>{q.name}</span>
                    <div className="quiz-list-meta">
                      <span className="quiz-badge">{q.score}</span>
                      <span className="quiz-date">{q.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subject picker */}
          <div className="dash-card">
            <h3>Choose a Subject to Practice</h3>
            <div className="subjects-grid">
              {subjects.map((s) => (
                <SubjectCard
                  key={s.name}
                  {...s}
                  onClick={() => setPage("quiz")}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;