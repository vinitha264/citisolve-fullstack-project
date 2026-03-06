export const BASE_URL = "https://citisolve-fullstack-project.onrender.com";

const callAPI = async (endpoint, options = {}) => {
    try {
        const fetchOptions = {
            ...options,
            credentials: "include",
        };

        const response = await fetch(`${BASE_URL}/${endpoint}`, fetchOptions);

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        return data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};


export const authAPI = {
    register: (userData) =>
        callAPI("api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        }),

    login: (credentials) =>
        callAPI("api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        }),
};
