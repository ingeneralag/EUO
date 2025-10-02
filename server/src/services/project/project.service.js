import { find, findById, findByIdAndDelete, findByIdAndUpdate, getAll } from "../../DB/dbService.js";
import projectModel from "../../DB/model/Project.model.js";
import { asyncHandler } from "../../utils/response/error.response.js";
import { successResponse } from "../../utils/response/success.response.js";

export const createProject = asyncHandler(async (req, res, next) => {
    const payload = req.body;
    const project = await projectModel.create(payload);
    if (!project) {
        return next(new Error("Failed to create project"));
    }
    successResponse({ res, data: project });
});

export const updateProject = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    const project = await findByIdAndUpdate({ model: projectModel, id, data: updates, options: { new: true } });
    if (!project) {
        return next(new Error("Project not found", { cause: 404 }));
    }
    successResponse({ res, data: project });
});

export const deleteProject = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await findByIdAndDelete({ model: projectModel, id });
    if (!deleted) {
        return next(new Error("Project not found", { cause: 404 }));
    }
    successResponse({ res, data: deleted });
});

export const getProjectById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const project = await findById({ model: projectModel, id });
    if (!project) {
        return next(new Error("Project not found", { cause: 404 }));
    }
    successResponse({ res, data: project });
});

export const getAllProjects = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10, category, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const [totalCount, projects] = await getAll({ model: projectModel, filter, skip, limit: parseInt(limit) });
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    successResponse({
        res,
        data: {
            currentPage: parseInt(page),
            totalPages,
            totalCount,
            limit: parseInt(limit),
            projects,
        },
    });
});


