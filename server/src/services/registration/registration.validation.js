import Joi from "joi";
import { generalFeilds } from "../../middleware/validation.middileware.js";
import { countries, majors, qualifications } from "../../DB/model/registration.model.js";

export const createRegistrationSchema = Joi.object()
    .keys({
        studentName: Joi.string().min(2).max(100).required().messages({
            "string.min": "Student name must be at least 2 characters long.",
            "string.max": "Student name must not exceed 100 characters.",
            "string.empty": "Student name is required.",
        }),
        email: generalFeilds.email.required(),
        phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required().messages({
            "string.pattern.base": "Please enter a valid phone number (11 digits starting with 01).",
            "string.empty": "Phone number is required.",
        }),
        country: Joi.string().valid(...Object.values(countries)).required().messages({
            "any.only": "Please select a valid country from the list.",
            "string.empty": "Country is required.",
        }),
        major: Joi.string().valid(...majors).required().messages({
            "any.only": "Please select a valid major from the list.",
            "string.empty": "Major is required.",
        }),
        qualification: Joi.string().valid(...qualifications).required().messages({
            "any.only": "Please select a valid qualification from the list.",
            "string.empty": "Qualification is required.",
        }),
        dateOfQualification: Joi.date().max('now').required().messages({
            "date.max": "Qualification date cannot be in the future.",
            "date.base": "Please enter a valid date.",
            "any.required": "Qualification date is required.",
        })
    })
    .required();

export const getRegistrationByIdSchema = Joi.object()
    .keys({
        id: generalFeilds.id.required()
    })
    .required();

export const deleteRegistrationSchema = Joi.object()
    .keys({
        id: generalFeilds.id.required()
    })
    .required();

export const getAllRegistrationsSchema = Joi.object()
    .keys({
        page: Joi.number().min(1).default(1).messages({
            "number.min": "Page number must be at least 1.",
            "number.base": "Page must be a valid number.",
        }),
        limit: Joi.number().min(1).max(100).default(10).messages({
            "number.min": "Limit must be at least 1.",
            "number.max": "Limit cannot exceed 100.",
            "number.base": "Limit must be a valid number.",
        })
    })
    .required();
