import Joi from "joi";
import mongoose from "mongoose";

const validObjectId = (value, helpers) => {
  return mongoose.Types.ObjectId.isValid(value) ? true : helpers.message("in-Valid id");
};
export const generalFeilds = {
  userName: Joi.string().min(6).max(20).messages({
    "string.min": "Username must be at least 6 characters long.",
    "string.max": "Username must not exceed 20 characters.",
    "string.empty": "Username is required.",
  }),

  email: Joi.string().email().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "string.pattern.base": "Password must be between 3 and 30 characters and contain only letters and numbers.",
    "string.empty": "Password is required.",
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Confirm password must match the password.",
    "string.empty": "Confirm password is required.",
  }),

  otp: Joi.string().min(4).max(4).messages({
    "string.min": "OTP must be exactly 4 digits.",
    "string.max": "OTP must be exactly 4 digits.",
    "string.empty": "OTP is required.",
  }),

  id: Joi.string().custom(validObjectId).messages({
    "string.empty": "ID is required.",
    "any.custom": "Invalid ID format.",
  }),
};

export const validate = (schema) => {
  return (req, res, next) => {
    const data = { ...req.params, ...req.query, ...req.body };

    const result = schema.validate(data, { abortEarly: false });

    if (result.error) {
      const messageList = result.error.details.map((obj) => obj.message);

      return res.status(400).json({ success: false, message: messageList });
    }

    return next();
  };
};
