import jwt from "jsonwebtoken";
import { findOne } from "../../DB/dbService.js";
import userModel from "../../DB/model/User.model.js";

export const tokenTypes = {
  access: "access",
};

export const decodedToken = async ({ authorization, next, }) => {
  const [bearer, token] = authorization?.split(" ") || [];
  if (!bearer || !token) {
    return next(new Error("invalid token", { cause: 401 }));
  }

  let decoded;
  try {
    decoded = verifyToken({
      token,
      signature: process.env.USER_ACCESS_TOKEN,
    });
  } catch (error) {
    const message = error?.name === "TokenExpiredError" ? "token expired" : "invalid token";
    return next(new Error(message, { cause: 401 }));
  }

  if (!decoded) {
    return next(new Error("invalid token", { cause: 401 }));
  }
  if (!decoded?.id) {
    return next(new Error("invalid token", { cause: 401 }));
  }

  const user = await findOne({
    model: userModel,
    filter: { _id: decoded.id },
  });
  if (!user) {
    return next(new Error("unauthorized", { cause: 401 }));
  }



  return user;
};

export const createToken = ({ payload = {}, signature = process.env.USER_ACCESS_TOKEN, expiresIn = 60 * 60 * 180 }) => {
  const token = jwt.sign(payload, signature, {
    expiresIn: expiresIn,
  });

  return token;
};

export const verifyToken = ({ token, signature = process.env.USER_ACCESS_TOKEN }) => {
  const decoded = jwt.verify(token, signature);

  return decoded;
};
