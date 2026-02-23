import "./StatCard.css";

function StatCard({ num, lbl, change }) {
  return (
    <div className="stat-card">
      <div className="stat-num">{num}</div>
      <div className="stat-lbl">{lbl}</div>
      {change && <div className="stat-change">{change}</div>}
    </div>
  );
}

export default StatCard;