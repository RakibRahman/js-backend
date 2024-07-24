import { NextFunction, Request, Response } from "express";

export const paginationValidationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const { take, skip } = query;
  //validate with zod
  const isValidTake = take && typeof take === "string" && parseInt(take) > 0;
  const isValidSkip = skip && typeof skip === "string" && parseInt(skip) > -1;

  if (isValidSkip && isValidTake) {
    return next();
  } else {
    const missingMessage =
      !take && !skip
        ? " : Provide take and skip parameters"
        : !skip
        ? " : Missing skip parameter"
        : !take
        ? " : Missing take parameter"
        : "";
    return res.status(400).json({
      status: 400,
      message: "Validation Failed" + `${missingMessage}`,
      details: "Take must be greater than 0 and skip must be greater than -1",
    });
  }
};
