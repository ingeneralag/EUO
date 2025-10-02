import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication } from "../../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/me", authentication(), userService.getMe);

export default userRouter;


