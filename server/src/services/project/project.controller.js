import { Router } from "express";
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middileware.js";
import {
    createProjectSchema,
    updateProjectSchema,
    deleteProjectSchema,
    getProjectByIdSchema,
    getAllProjectsSchema,
} from "./project.validation.js";
import {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllProjects,
} from "./project.service.js";

const router = Router();

router.post(
    "/",
    authentication(),
    authorization("admin"),
    validate(createProjectSchema),
    createProject
);

router.put(
    "/:id",
    authentication(),
    authorization("admin"),
    validate(updateProjectSchema),
    updateProject
);

router.delete(
    "/:id",
    authentication(),
    authorization("admin"),
    validate(deleteProjectSchema),
    deleteProject
);

router.get(
    "/:id",
    validate(getProjectByIdSchema),
    getProjectById
);

router.get(
    "/",
    validate(getAllProjectsSchema),
    getAllProjects
);

export default router;


