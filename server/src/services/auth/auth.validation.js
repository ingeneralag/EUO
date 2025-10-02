import Joi from "joi";
import { generalFeilds } from "../../middleware/validation.middileware.js";

export const signupSchema = Joi.object()
  .keys({
    username: generalFeilds.userName.required(),
    email: generalFeilds.email.required(),
    password: generalFeilds.password.required(),
    confirmPassword: generalFeilds.confirmPassword.required(),
  })
  .required();

export const confirmEmailSchema = Joi.object()
  .keys({
    email: generalFeilds.email.required(),
    otp: generalFeilds.otp.required(),
  })
  .required();

export const loginSchema = Joi.object()
  .keys({
    email: generalFeilds.email.required(),
    password: generalFeilds.password.required(),
  })
  .required();
