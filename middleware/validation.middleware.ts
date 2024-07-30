import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const paginationValidationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const { take, skip } = query;

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

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { params, query, body } = req;
    const validationResult = await schema.safeParseAsync({
      body,
      query,
      params,
    });

    if (validationResult.success) {
      return next();
    }

    if (validationResult.error) {
      const issues = validationResult.error.issues;
      res.status(400).json({
        message: "Validation Failed!",
        details: issues.map((issue) => ({
          path: issue.path.join(": "),
          message: issue.message,
        })),
      });
    }
  };
