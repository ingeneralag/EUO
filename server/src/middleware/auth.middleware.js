import { asyncHandler } from "../utils/response/error.response.js";
import { decodedToken } from "../utils/security/token.js";

export const authentication = () => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    const user = await decodedToken({ authorization, next });
    req.user = user;
    next();
  });
};

export const authorization = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("forbidden", { cause: 403 }));
    }
    next();
  });
};
