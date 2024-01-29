import { NextFunction, Request, Response, Router } from "express";
import {
  formatDate,
  validateExpenseData,
  validateQueryParams,
} from "../middlewares/expenseData";
import {
  addExpense,
  deleteExpenseById,
  getAllExpenses,
  getAllExpensesTotals,
  updateExpenseById,
} from "../controllers/expense";

const routes = Router();

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getAllExpenses());
  } catch (e) {
    next(e);
  }
});

routes.get(
  "/total-amount",
  validateQueryParams,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await getAllExpensesTotals(req.query));
    } catch (e) {
      next(e);
    }
  }
);

routes.post(
  "/",
  validateExpenseData,
  formatDate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseData = { ...req.body };
      res.json(await addExpense(expenseData));
    } catch (e) {
      next(e);
    }
  }
);

routes.put(
  "/:id",
  validateExpenseData,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await updateExpenseById(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  }
);

routes.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await deleteExpenseById(req.params.id));
    } catch (e) {
      next(e);
    }
  }
);

export default routes;
