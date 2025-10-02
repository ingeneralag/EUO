import Joi from "joi";
import { generalFeilds } from "../../middleware/validation.middileware.js";
import { projectCategories, projectStatuses } from "../../DB/model/Project.model.js";

export const createProjectSchema = Joi.object()
    .keys({
        title: Joi.string().min(2).max(150).required(),
        description: Joi.string().min(10).max(5000).required(),
        image: Joi.string().uri().optional(),
        category: Joi.string().valid(...projectCategories).required(),
        status: Joi.string().valid(...projectStatuses).optional(),
        client: Joi.string().min(2).max(150).optional(),
        technologies: Joi.array().items(Joi.string().min(1)).optional(),
        progress: Joi.number().min(0).max(100).optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
        featured: Joi.boolean().optional(),
    })
    .required();

export const updateProjectSchema = Joi.object()
    .keys({
        id: generalFeilds.id.required(),
        title: Joi.string().min(2).max(150).optional(),
        description: Joi.string().min(10).max(5000).optional(),
        image: Joi.string().uri().optional(),
        category: Joi.string().valid(...projectCategories).optional(),
        status: Joi.string().valid(...projectStatuses).optional(),
        client: Joi.string().min(2).max(150).optional(),
        technologies: Joi.array().items(Joi.string().min(1)).optional(),
        progress: Joi.number().min(0).max(100).optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
        featured: Joi.boolean().optional(),
    })
    .required();

export const getProjectByIdSchema = Joi.object()
    .keys({
        id: generalFeilds.id.required(),
    })
    .required();

export const deleteProjectSchema = Joi.object()
    .keys({
        id: generalFeilds.id.required(),
    })
    .required();

export const getAllProjectsSchema = Joi.object()
    .keys({
        page: Joi.number().min(1).default(1),
        limit: Joi.number().min(1).max(100).default(10),
        category: Joi.string().valid(...projectCategories).optional(),
        status: Joi.string().valid(...projectStatuses).optional(),
    })
    .required();


