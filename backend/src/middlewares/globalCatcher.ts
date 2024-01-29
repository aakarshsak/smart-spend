import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import ValidationError from "../errors/ValidationError";
import logger from "../utility/logger";

export default (
  err: CustomError | ValidationError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  const statusCode = "statusCode" in err ? err.statusCode : 500;

  res.status(statusCode).json({
    type: "error",
    status: statusCode,
    message: err.message,
  });
};
