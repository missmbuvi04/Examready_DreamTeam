import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import SubjectCard from "../components/SubjectCard";
import { getUserStats, getRecentQuizzes } from "../services/progressService";
import subjects from "../data/subjects";
import "./DashboardPage.css";

function DashboardPage({ user, setPage, setTopic }) {
  const [activeNav, setActiveNav] = useState("overview");
  const [stats, setStats] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user stats on mount
  useEffect(() => {
    async function fetchData() {
      try {
        if (user?.id) {
          const userStats = await getUserStats(user.id);
          setStats(userStats);
          
          const attempts = await getRecentQuizzes(user.id);
          setRecentQuizzes(attempts.slice(0, 4)); // Show last 4 quizzes
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user?.id]);

  const navItems = [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "practice", icon: "📝", label: "Practice" },
    { id: "progress", icon: "📊", label: "My Progress" },
  ];

  // Build dynamic stats from real data
  const STATS = [
    {
      num: stats?.total_questions || "0",
      lbl: "Questions Answered",
      change: "All time",
    },
    {
      num: (stats?.average_score || 0) + "%",
      lbl: "Average Score",
      change: "Overall",
    },
    {
      num: stats?.total_quizzes || "0",
      lbl: "Quizzes Completed",
      change: "All time",
    },
    {
      num: "🔥",
      lbl: "Keep Practicing",
      change: "Build your streak!",
    },
  ];

  // Simple progress by subject (aggregate from attempts)
  const progressBySubject = subjects.reduce((acc, subject) => {
    const subjectAttempts = recentQuizzes.filter((q) => q.topic === subject.name);
    if (subjectAttempts.length > 0) {
      const avgScore = Math.round(
        (subjectAttempts.reduce((sum, q) => sum + (q.score / q.total_questions) * 100, 0) /
          subjectAttempts.length)
      );
      acc.push({ subject: subject.name, pct: avgScore });
    }
    return acc;
  }, []);

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
                  if (item.id === "practice") {
                    setTopic(null);
                    setPage("quiz");
                  }
                }}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Subjects</div>
            {subjects.slice(0, 4).map((s) => (
              <button
                key={s.name}
                className="sidebar-item"
                onClick={() => {
                  setTopic(s.name);
                  setPage("quiz");
                }}
              >
                <span>{s.icon}</span> {s.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <div className="dash-header">
            <h1>Welcome back, {user?.username} 👋</h1>
            <p>
              {loading
                ? "Loading your progress..."
                : `You've completed ${stats?.total_quizzes || 0} quizzes!`}
            </p>
          </div>

          {/* Stats row */}
          <div className="stats-row">
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>

          {/* Two-col grid */}
          <div className="dash-grid">
            <div className="dash-card">
              <h3>Subject Progress</h3>
              {progressBySubject.length > 0 ? (
                progressBySubject.map((p) => (
                  <ProgressBar key={p.subject} subject={p.subject} pct={p.pct} />
                ))
              ) : (
                <p style={{ color: "#999" }}>
                  Start taking quizzes to see your progress!
                </p>
              )}
            </div>

            <div className="dash-card">
              <h3>Recent Quizzes</h3>
              {recentQuizzes.length > 0 ? (
                <ul className="quiz-list">
                  {recentQuizzes.map((q, i) => (
                    <li key={i}>
                      <span>{q.topic}</span>
                      <div className="quiz-list-meta">
                        <span className="quiz-badge">
                          {q.score}/{q.total_questions}
                        </span>
                        <span className="quiz-date">
                          {new Date(q.attempted_at).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#999" }}>
                  No quizzes yet. Start practicing!
                </p>
              )}
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
                  onClick={() => {
                    setTopic(s.name);
                    setPage("quiz");
                  }}
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