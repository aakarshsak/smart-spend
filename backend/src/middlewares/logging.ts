import { NextFunction, Request, Response } from "express";
import logger from "../utility/logger";

export const httpLogging = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;
  const start = new Date().getTime();

  res.on("finish", () => {
    const duration = new Date().getTime() - start;
    const message = `${method} ${url} ${res.statusCode} - ${duration}ms`;
    logger.log({
      level: "info",
      message: message,
      httpStatusCode: res.statusCode,
    });
  });

  next();
};
