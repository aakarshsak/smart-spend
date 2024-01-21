import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import ValidationError from "../errors/ValidationError";

export default (
  err: CustomError | ValidationError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("global catcher....", err);
  const statusCode = "statusCode" in err ? err.statusCode : 500;

  res.status(statusCode).json({
    type: "error",
    status: statusCode,
    message: err.message,
  });
};
