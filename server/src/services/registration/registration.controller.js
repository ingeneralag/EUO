import { Router } from "express";
import { createRegistration, deleteRegistration, getAllRegistrations, getRegistrationById } from "./registration.service.js";
import { validate } from "../../middleware/validation.middileware.js";
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import {
    createRegistrationSchema,
    getAllRegistrationsSchema,
    getRegistrationByIdSchema,
    deleteRegistrationSchema
} from "./registration.validation.js";

const router = Router();

router.post('/', validate(createRegistrationSchema), createRegistration);

router.get('/all',
    authentication(),
    authorization('admin'),
    validate(getAllRegistrationsSchema),
    getAllRegistrations
);

router.get('/:id',
    authentication(),
    authorization('admin'),
    validate(getRegistrationByIdSchema),
    getRegistrationById
);

router.delete('/:id',
    authentication(),
    authorization('admin'),
    validate(deleteRegistrationSchema),
    deleteRegistration
);

export default router;
