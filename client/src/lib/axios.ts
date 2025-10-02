import axios from "axios";
import Cookies from "js-cookie";
import { clearToken } from "./auth";
import { useAuthStore } from "@/store/auth";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;

// Attach token on each request (client-side)
if (typeof window !== "undefined") {
    api.interceptors.request.use((config) => {
        const token = Cookies.get("access_token");
        if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error?.response?.status;
            if (status === 401) {
                clearToken();
                try {
                    // also reset store state
                    useAuthStore.getState().logout(undefined);
                } catch (_) { }
                try {
                    const segments = window.location.pathname.split("/").filter(Boolean);
                    const locale = segments[0] || "en";
                    window.location.replace(`/${locale}/auth/login?logout=1`);
                } catch (_) {
                    // noop
                }
            }
            return Promise.reject(error);
        }
    );
}


