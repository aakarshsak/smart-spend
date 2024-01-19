import { Response, NextFunction } from "express";
import { Expense } from "../db/expense";
import CustomRequest from "../types/CustomRequest";

export const retrieveAllData = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenses = await Expense.find();
    req.middlewareRes = expenses;
  } catch (e) {
    console.log(e);
  }

  next();
};

export const formatDate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const date = new Date(req.body.date);
  req.body.date = date;
  console.log(date, "format");
  next();
};

export const validateExpenseData = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  next();
};
