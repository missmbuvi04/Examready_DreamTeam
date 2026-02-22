import { progressData, recentQuizzes } from "../data/subjects";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Get progress data for a user
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export async function getProgress(userId) {
  return progressData;
}

/**
 * Get recent quiz history for a user
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export async function getRecentQuizzes(userId) {

  return recentQuizzes;
}
