"use client";
import { create } from "zustand";
import { createProject, deleteProject, getProject, listProjects, updateProject, type Project, type ProjectPayload, type ListProjectsResponse } from "@/lib/services/projects";

type ProjectsState = {
    items: Project[];
    loading: boolean;
    error?: string | null;
    page: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    fetch: (params?: { page?: number; limit?: number; category?: string; status?: string }) => Promise<void>;
    create: (data: ProjectPayload) => Promise<Project>;
    update: (id: string, data: Partial<ProjectPayload>) => Promise<Project>;
    remove: (id: string) => Promise<void>;
};

export const useProjectsStore = create<ProjectsState>((set, get) => ({
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,

    fetch: async (params) => {
        set({ loading: true, error: null });
        try {
            const data = await listProjects(params);
            set({
                items: data.projects,
                page: data.currentPage,
                totalPages: data.totalPages,
                totalCount: data.totalCount,
                limit: data.limit,
            });
        } catch (err: any) {
            const message = Array.isArray(err?.response?.data?.message)
                ? err.response.data.message.join("\n")
                : err?.response?.data?.message || err?.message || "Failed to load projects";
            set({ error: message });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    create: async (payload) => {
        const project = await createProject(payload);
        set({ items: [project, ...get().items] });
        return project;
    },

    update: async (id, payload) => {
        const updated = await updateProject(id, payload);
        set({ items: get().items.map((p) => (p._id === id ? updated : p)) });
        return updated;
    },

    remove: async (id) => {
        await deleteProject(id);
        set({ items: get().items.filter((p) => p._id !== id) });
    },
}));


