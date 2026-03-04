// services/API.js

// -----------------------------
// BASE URL
// -----------------------------
// Use environment variable for production, fallback to local backend for development
const BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

/**
 * Helper function to call API endpoints
 * @param {string} endpoint - e.g., "auth/login"
 * @param {object} options - fetch options (method, headers, body)
 */
const callAPI = async (endpoint, options = {}) => {
    try {
        const isRenderBackend = BASE_URL.includes("render.com");

        // For local dev, we remove credentials to avoid HTTP->HTTPS issues
        const fetchOptions = {
            ...options,
            ...(isRenderBackend ? { credentials: "include" } : {}),
        };

        const response = await fetch(`${BASE_URL}/${endpoint}`, fetchOptions);

        // Safely parse JSON
        const data = await response.json().catch(() => ({}));

        // Throw error if response is not ok
        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        return data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// -----------------------------
// Auth API wrapper
// -----------------------------
export const authAPI = {
    register: (userData) =>
        callAPI("auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        }),

    login: (credentials) =>
        callAPI("auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        }),
};