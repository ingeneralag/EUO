import { validate } from "../../middleware/validation.middileware.js";
import * as authService from "./auth.service.js";
import {Router} from "express";
import { signupSchema, confirmEmailSchema, loginSchema } from "./auth.validation.js";


const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), authService.signup);
authRouter.post("/login", validate(loginSchema), authService.login);

export default authRouter;
