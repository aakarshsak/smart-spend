import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";

export default (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("global catcher....");
  const statusCode = "statusCode" in err ? err.statusCode : 500;
  res
    .status(statusCode)
    .json({ type: "error", status: statusCode, message: err.message });
};
