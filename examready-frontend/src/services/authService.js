const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Login a user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user, token}>}
 */
export async function login(email, password) {

  return { user: { name: email.split("@")[0], email }, token: "token" };
}

/**
 * Register a new user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user, token}>}
 */
export async function register(name, email, password) {

  return { user: { name, email }, token: "mock-token" };
}
