const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Fetch questions for a given topic from the real backend
 */
export async function getQuestions(topic) {
  const response = await fetch(`${BASE_URL}/questions?subject=${encodeURIComponent(topic)}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch questions");
  }

  // Transform database format to frontend format
  return data.map(q => ({
    id: q.id,
    subject: q.subject,
    text: q.question_text,
    options: [q.option_a, q.option_b, q.option_c, q.option_d],
    correct: letterToIndex(q.correct_answer),
    explanation: q.explanation,
    difficulty: q.difficulty
  }));
}

/**
 * Convert letter answer (A/B/C/D) to index (0/1/2/3)
 */
function letterToIndex(letter) {
  const map = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  return map[letter] !== undefined ? map[letter] : 0;
}

/**
 * Submit quiz attempt result to backend
 */
export async function submitResult(result) {
  const response = await fetch(`${BASE_URL}/attempts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save result");
  }

  return data;
}