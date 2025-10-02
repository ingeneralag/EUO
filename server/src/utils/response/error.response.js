export const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((err) => {
      if (!err.cause) {
        err.cause = 500;
      }
      next(err);
    });
  };
};

export const globalErrorHandler = (err, req, res, next) => {
  if (process.env.MODE === "DEV") {
    return res
      .status(err.cause || 500)
      .json({ success: false, message: err.message, stack: err.stack });
  }

  return res
    .status(err.cause || 500)
    .json({ success: false, message: err.message });
};
