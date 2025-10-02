"use client";
import { create } from "zustand";
import api from "@/lib/axios";
import { setToken as setCookieToken, clearToken as clearCookieToken, getToken as getCookieToken } from "@/lib/auth";

type User = { id?: string; email?: string; username?: string; role?: string } | null;

type AuthState = {
    user: User;
    token?: string;
    loading: boolean;
    error?: string | null;
    init: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: (redirect?: string) => void;
    fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: undefined,
    loading: false,
    error: null,

    init: async () => {
        const token = getCookieToken();
        if (token) {
            set({ token });
            try {
                await get().fetchMe();
            } catch (e) {
                // handled by interceptor
            }
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post("/auth/login", { email, password });
            const token = res.data?.data?.access_token as string | undefined;
            const role = res.data?.data?.role as string | undefined;
            if (!token) throw new Error("No token returned");
            setCookieToken(token);
            set({ token });
            await get().fetchMe();
        } catch (err: any) {
            const message = Array.isArray(err?.response?.data?.message)
                ? err.response.data.message.join("\n")
                : err?.response?.data?.message || err?.message || "Login failed";
            set({ error: message });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    logout: (redirect) => {
        clearCookieToken();
        set({ token: undefined, user: null });
        if (redirect && typeof window !== "undefined") {
            window.location.replace(redirect);
        }
    },

    fetchMe: async () => {
        const res = await api.get("/user/me");
        const user = res.data?.data;
        set({ user });
    },
}));


