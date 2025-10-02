import connectDB from "./DB/connection.js";
import registrationRouter from "./services/registration/registration.controller.js";
import projectRouter from "./services/project/project.controller.js";
import authRouter from "./services/auth/auth.controller.js";
import userRouter from "./services/user/user.controller.js";

import { globalErrorHandler } from "./utils/response/error.response.js";
import cors from "cors";

const bootstrap = (app, express) => {
  connectDB();

  app.use(express.json());
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/projects", projectRouter);
  // app.use("/registration", registrationRouter);

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Page Not Found" });
  });

  app.use(globalErrorHandler);
};

export default bootstrap;
