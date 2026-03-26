const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Login a user
 */
export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

return { user: { ...data.user, name: data.user.username }, token: data.token };}

/**
 * Register a new user
 */
export async function register(firstName, lastName, email, password, confirmPassword) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  // Now returns { token, user } just like login
  return { user: { ...data.user, name: data.user.username }, token: data.token };
}