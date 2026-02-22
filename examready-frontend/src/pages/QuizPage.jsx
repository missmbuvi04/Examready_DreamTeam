import { useState, useCallback } from "react";
import OptionButton from "../components/OptionButton";
import useTimer from "../hooks/useTimer";
import questions from "../data/questions";
import "./QuizPage.css";

function QuizPage({ setPage }) {
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results,  setResults]  = useState([]);
  const [done,     setDone]     = useState(false);

  const q     = questions[current];
  const total = questions.length;

  const handleExpire = useCallback(() => {
    if (!answered) {
      setAnswered(true);
      setResults((r) => [...r, { correct: false }]);
    }
  }, [answered]);

  const { seconds, formatted } = useTimer(30, !answered && !done, handleExpire);

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setResults((r) => [...r, { correct: idx === q.correct }]);
  };

  const next = () => {
    if (current + 1 >= total) { setDone(true); return; }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const restart = () => {
    setCurrent(0); setSelected(null); setAnswered(false);
    setResults([]); setDone(false);
  };

  // ── Results screen ──
  const score = results.filter((r) => r.correct).length;
  const pct   = Math.round((score / total) * 100);

  if (done) {
    return (
      <div className="quiz-page">
        <div className="result-card">
          <div className="score-circle">
            <div className="score-pct">{pct}%</div>
            <div className="score-sub">Score</div>
          </div>
          <h2>
            {pct >= 70 ? "Great Work! 🎉" : pct >= 50 ? "Good Effort! 💪" : "Keep Practising! 📚"}
          </h2>
          <p>
            {pct >= 70
              ? "You're well-prepared. Keep this momentum going!"
              : "Review the topics you missed and try again."}
          </p>
          <div className="result-breakdown">
            <div className="breakdown-item"><div className="val green">{score}</div><div className="bd-lbl">Correct</div></div>
            <div className="breakdown-item"><div className="val total-val">{total}</div><div className="bd-lbl">Total</div></div>
            <div className="breakdown-item"><div className="val red">{total - score}</div><div className="bd-lbl">Incorrect</div></div>
          </div>
          <div className="result-actions">
            <button className="btn btn-navy"  onClick={restart}>Try Again</button>
            <button className="btn btn-gold"  onClick={() => setPage("dashboard")}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz screen ──
  const getOptionState = (i) => {
    if (!answered) return i === selected ? "selected" : "default";
    if (i === q.correct)                    return "correct";
    if (i === selected && i !== q.correct)  return "incorrect";
    return "default";
  };

  return (
    <div className="quiz-page">
      {/* Top bar */}
      <div className="quiz-topbar">
        <div className="quiz-meta">
          <strong>{q.subject}</strong> · Question {current + 1} of {total}
        </div>
        <div className={`timer ${seconds <= 10 ? "warning" : ""}`}>
          ⏱ {formatted}
        </div>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${(current / total) * 100}%` }} />
      </div>

      {/* Question card */}
      <div className="question-card">
        <div className="question-num">Question {current + 1}</div>
        <div className="question-text">{q.text}</div>

        <div className="options-list">
          {q.options.map((opt, i) => (
            <OptionButton
              key={i}
              index={i}
              text={opt}
              state={getOptionState(i)}
              onClick={() => handleAnswer(i)}
              disabled={answered}
            />
          ))}
        </div>

        {answered && (
          <div className={`feedback-box ${selected === q.correct ? "correct" : "incorrect"}`}>
            <strong>{selected === q.correct ? "✅ Correct!" : "❌ Incorrect."}</strong>{" "}
            {q.explanation}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="quiz-nav">
        <button className="btn btn-ghost" onClick={() => setPage("dashboard")}>
          ← Exit Quiz
        </button>
        {answered && (
          <button className="btn btn-navy" onClick={next}>
            {current + 1 >= total ? "See Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;