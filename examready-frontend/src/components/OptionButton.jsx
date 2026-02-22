import "./OptionButton.css";

const KEYS = ["A", "B", "C", "D"];

function OptionButton({ index, text, state, onClick, disabled }) {
  // state: "default" | "selected" | "correct" | "incorrect"
  return (
    <button
      className={`option-btn ${state !== "default" ? state : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="option-key">{KEYS[index]}</span>
      {text}
    </button>
  );
}

export default OptionButton;