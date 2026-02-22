import "./FeatureCard.css";

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feat-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default FeatureCard;