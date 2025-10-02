import { asyncHandler } from "../../utils/response/error.response.js";
import userModel from "../../DB/model/User.model.js";
import { compareHash, hashPassword } from "../../utils/security/hash.js";
import { successResponse } from "../../utils/response/success.response.js";
import { createToken } from "../../utils/security/token.js";
import { create, findOne } from "../../DB/dbService.js";

/* Sign up */
export const signup = asyncHandler(async (req, res, next) => {
  if (await findOne({ model: userModel, filter: { email: req.body.email } })) {
    return next(new Error("email already exist"));
  }

  await create({
    model: userModel,
    data: { ...req.body, password: hashPassword({ plainText: req.body.password }) },
  });

  return res.json({ success: true, message: "user created successfully" });
});

/* Login */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findOne({ model: userModel, filter: { email } });

  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }

  if (!compareHash({ plainText: password, hash: user.password })) {
    return next(new Error("invalid password", { cause: 400 }));
  }

  const access_token = createToken({
    payload: { email: user.email, id: user._id, role: user.role },
    signature: process.env.USER_ACCESS_TOKEN,
  });

  successResponse({ res, data: { access_token, role: user.role } });
});
