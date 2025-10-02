import { asyncHandler } from "../../utils/response/error.response.js";
import { successResponse } from "../../utils/response/success.response.js";

export const getMe = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new Error("user not found", { cause: 404 }));
    }
    console.log(user);
    const { password, __v, ...safeUser } = user.toObject ? user.toObject() : user;
    return successResponse({ res, data: safeUser });
});


