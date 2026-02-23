import "./SubjectCard.css";

function SubjectCard({ icon, name, questions, selected, onClick }) {
  return (
    <div className={`subject-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className="subject-icon">{icon}</div>
      <h4>{name}</h4>
      <p>{questions} questions</p>
    </div>
  );
}

export default SubjectCard;