import { Response, NextFunction, Request } from "express";
import { Expense } from "../db/expense";
import CustomRequest from "../types/CustomRequest";
import { z } from "zod";
import { Category } from "../db/category";
import { TransactionType } from "../constants/constants";

const getCategoryList = async () => {
  try {
    const categories = await Category.find();
    return categories.map((item) => item.name);
  } catch (e) {
    return [];
  }
};

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
  const values = (await getCategoryList()) as [string, ...string[]];

  if (!values || values.length < 1)
    return res.status(500).json({ status: 400, msg: "Internal server error" });

  const expenseObject = z.object({
    amount: z.number().positive(),
    category: z.enum(values),
    transactionType: z.nativeEnum(TransactionType),
    account: z.string().min(1),
    description: z.string().min(5),
    date: z.coerce.date(),
  });

  req.body.category = req.body?.category?.toLowerCase();
  req.body.account = req.body?.account?.toLowerCase();
  const validated = expenseObject.safeParse(req.body);

  if (!validated || !validated.success)
    return res.status(400).json({ status: 400, msg: validated });

  next();
};

export const validateQueryParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accountSchema = z
    .string()
    .min(2)
    .optional()
    .refine((v) => !v || v === v.toLowerCase(), {
      message: "account should be lower case",
    });

  const periodSchema = z.string().min(2);

  const validatedAccount = accountSchema.safeParse(req.query.account);
  const validatedPeriod = periodSchema.safeParse(req.query.period);

  if (
    !validatedAccount ||
    !validatedAccount.success ||
    !validatedPeriod ||
    !validatedPeriod.success
  ) {
    console.log(validatedAccount, validatedPeriod);
    return res.status(400).json({ status: 400, msg: "Invalid query params" });
  }
  next();
};
