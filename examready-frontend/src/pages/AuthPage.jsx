import { useState } from "react";
import Navbar from "../components/Navbar";
import { login, register } from "../services/authService";
import "./AuthPage.css";

function AuthPage({ setPage, setUser }) {
  const [tab, setTab]     = useState("login");
  const [form, setForm]   = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const switchTab = (t) => { setTab(t); setError(""); };

  const handleLogin = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    try {
      const { user } = await login(form.email, form.password);
      setUser(user);
      setPage("dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (!form.firstName || !form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    try {
      const { user } = await register(`${form.firstName} ${form.lastName}`, form.email, form.password);
      setUser(user);
      setPage("dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  const handleGuest = () => {
    setUser({ name: "Guest Student", email: "guest@examready.com" });
    setPage("dashboard");
  };

  return (
    <div className="auth-page">
      <Navbar setPage={setPage} user={null} setUser={() => {}} />
      <div className="auth-body">
        <div className="auth-card">
          <div className="auth-logo">Exam<span>Ready</span></div>
          <div className="auth-sub">
            {tab === "login"
              ? "Welcome back — keep up the great work!"
              : "Start your exam prep journey today"}
          </div>

          <div className="tabs">
            <button className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>Sign In</button>
            <button className={`tab ${tab === "register" ? "active" : ""}`} onClick={() => switchTab("register")}>Register</button>
          </div>

          {error && <div className="error-msg">⚠️ {error}</div>}

          {tab === "login" ? (
            <>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} />
              </div>
              <button className="btn btn-navy btn-full" onClick={handleLogin}>Sign In →</button>
              <div className="divider">or continue as</div>
              <button className="btn btn-gold btn-full" onClick={handleGuest}>👤 Guest / Demo Mode</button>
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Amara" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Osei" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Repeat password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} />
              </div>
              <button className="btn btn-navy btn-full" onClick={handleRegister}>Create Account →</button>
            </>
          )}

          <div className="alt-link">
            {tab === "login" ? (
              <span>Don't have an account? <button onClick={() => switchTab("register")}>Register here</button></span>
            ) : (
              <span>Already have an account? <button onClick={() => switchTab("login")}>Sign in</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;