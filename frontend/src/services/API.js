const BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";


const callAPI = async (endpoint, options = {}) => {
    try {
        const isRenderBackend = BASE_URL.includes("render.com");

        const fetchOptions = {
            ...options,
            ...(isRenderBackend ? { credentials: "include" } : {}),
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
