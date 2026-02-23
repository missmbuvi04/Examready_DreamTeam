import "./Navbar.css";

function Navbar({ setPage, user, setUser }) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setPage("landing")}>
        Exam<span>Ready</span>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <button className="nav-btn" onClick={() => setPage("dashboard")}>Dashboard</button>
            <button className="nav-btn" onClick={() => setPage("quiz")}>Practice</button>
            <button
              className="nav-btn"
              onClick={() => { setUser(null); setPage("landing"); }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={() => setPage("landing")}>Home</button>
            <button className="nav-btn primary" onClick={() => setPage("auth")}>Get Started</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;