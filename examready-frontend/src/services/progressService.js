const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Get stats for a user
 * @param {string} userId
 * @returns {Promise<Object>}
 */
export async function getUserStats(userId) {
  const response = await fetch(`${BASE_URL}/attempts/${userId}/stats`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch stats");
  }

  return data;
}

/**
 * Get recent quiz history for a user
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export async function getRecentQuizzes(userId) {
  const response = await fetch(`${BASE_URL}/attempts/${userId}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch quiz attempts");
  }

  return data;
}
