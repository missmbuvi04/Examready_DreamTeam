import questions from "../data/questions";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Fetch questions for a given subject
 * @param {string} subject - e.g. "Mathematics"
 * @returns {Promise<Array>}
 */
export async function getQuestions(subject) {
  if (subject) return questions.filter((q) => q.subject === subject);
  return questions;
}

/**
 * Submit quiz results to backend
 * @param {object} result - { userId, subject, score, total, answers }
 * @returns {Promise<object>}
 */
export async function submitResult(result) {

  console.log(" submitting result", result);
  return { success: true };
}
