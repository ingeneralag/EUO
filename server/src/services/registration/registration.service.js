import { find, findByIdAndDelete, findById, getAll, findOne } from "../../DB/dbService.js";
import registrationModel from "../../DB/model/registration.model.js";
import { asyncHandler } from "../../utils/response/error.response.js";
import { successResponse } from "../../utils/response/success.response.js";

export const createRegistration = asyncHandler(async (req, res, next) => {
    const registrationData = req.body;

    const existingRegistration = await findOne({
        model: registrationModel,
        filter: {
            email: registrationData.email,
            country: registrationData.country
        }
    });

    if (existingRegistration) {
        return next(new Error(`You have already registered in ${registrationData.country}. Please choose a different country.`));
    }

    const newRegistration = await registrationModel.create(registrationData);

    if (!newRegistration) {
        return next(new Error("Failed to create registration"));
    }

    successResponse({
        res,
        data: newRegistration,
        message: "Registration created successfully",
    });
});

export const getAllRegistrations = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [totalCount, registrations] = await getAll({
        model: registrationModel,
        skip,
        limit: parseInt(limit),
        sort: { createdAt: -1 } // Descending order by createdAt (newest registration first)
    });

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    successResponse({
        res,
        data: {
            currentPage: parseInt(page),
            totalPages,
            totalCount,
            limit: parseInt(limit),
            registrations
        },
        message: "Registrations retrieved successfully",
    });
});

export const getRegistrationById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const registration = await findById({
        model: registrationModel,
        id
    });

    if (!registration) {
        return next(new Error("Registration not found"));
    }

    successResponse({
        res,
        data: registration,
        message: "Registration retrieved successfully",
    });
});

export const deleteRegistration = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedRegistration = await findByIdAndDelete({
        model: registrationModel,
        id
    });

    if (!deletedRegistration) {
        return next(new Error("Registration not found"));
    }

    successResponse({
        res,
        data: deletedRegistration,
        message: "Registration deleted successfully",
    });
});
