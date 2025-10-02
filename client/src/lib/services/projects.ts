import api from "@/lib/axios";

export type ProjectPayload = {
    title: string;
    description: string;
    image?: string;
    category: string;
    status?: string;
    client?: string;
    technologies?: string[];
    progress?: number;
    startDate?: string;
    endDate?: string;
    featured?: boolean;
};

export type Project = {
    _id: string;
    title: string;
    description: string;
    image?: string;
    category: string;
    status: string;
    client?: string;
    technologies: string[];
    progress: number;
    startDate?: string;
    endDate?: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
};

export type ListProjectsResponse = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    projects: Project[];
};

export async function listProjects(params: { page?: number; limit?: number; category?: string; status?: string } = {}) {
    const res = await api.get("/projects", { params });
    return res.data?.data as ListProjectsResponse;
}

export async function getProject(id: string) {
    const res = await api.get(`/projects/${id}`);
    return res.data?.data as Project;
}

export async function createProject(data: ProjectPayload) {
    const res = await api.post("/projects", data);
    return res.data?.data as Project;
}

export async function updateProject(id: string, data: Partial<ProjectPayload>) {
    const res = await api.put(`/projects/${id}`, data);
    return res.data?.data as Project;
}

export async function deleteProject(id: string) {
    const res = await api.delete(`/projects/${id}`);
    return res.data?.data as Project;
}


