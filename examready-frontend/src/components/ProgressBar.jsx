import "./ProgressBar.css";

function ProgressBar({ subject, pct }) {
  return (
    <div className="progress-item">
      <div className="progress-label">
        <span>{subject}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;