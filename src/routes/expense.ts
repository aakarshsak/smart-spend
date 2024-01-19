import { Request, Response, Router } from "express";
import {
  StartOfWeekOptions,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getDate,
  getMonth,
  getYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import CustomRequest from "../types/CustomRequest";
import {
  formatDate,
  retrieveAllData,
  validateExpenseData,
  validateQueryParams,
} from "../middlewares/expenseData";
import { Expense } from "../db/expense";
import {
  ALL_TIME,
  DAY,
  MONTH,
  TransactionType,
  WEEK,
  YEAR,
} from "../constants/constants";

const routes = Router();

routes.get("/", retrieveAllData, async (req: CustomRequest, res: Response) => {
  res.send(req.middlewareRes);
});

routes.get(
  "/total-amount",
  validateQueryParams,
  async (req: Request, res: Response) => {
    let { period, year, month, day, account } = req.query;
    let savedExpenses;

    try {
      const currDate = new Date();
      day = day ?? getDate(currDate).toString();
      month = month ?? (getMonth(currDate) + 1).toString();
      year = year ?? getYear(currDate).toString();
      const checkDate = new Date(`${year}-${month}-${day}`);

      let endDate, startDate;

      switch (period) {
        case YEAR: {
          startDate = startOfYear(checkDate);
          endDate = endOfYear(checkDate);
          break;
        }
        case MONTH: {
          startDate = startOfMonth(checkDate);
          endDate = endOfMonth(checkDate);
          break;
        }
        case DAY: {
          startDate = startOfDay(checkDate);
          endDate = endOfDay(checkDate);
          break;
        }
        case WEEK: {
          const weekOption: StartOfWeekOptions = { weekStartsOn: 1 };
          startDate = startOfWeek(checkDate, weekOption);
          endDate = endOfWeek(checkDate, weekOption);
          break;
        }
        default:
          break;
      }

      let searchQuery;
      if (account) {
        searchQuery = {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          account,
        };
      } else {
        searchQuery = {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        };
      }

      console.log(startDate, endDate);
      savedExpenses = await Expense.find(searchQuery);

      const total = savedExpenses.reduce((acc, { amount, transactionType }) => {
        return transactionType === TransactionType.INCOME
          ? acc + (amount ?? 0)
          : acc - (amount ?? 0);
      }, 0);

      const categorySum: any = [];
      savedExpenses.forEach((e) => {
        const alreadyAdded = categorySum?.find(
          (c: any) =>
            c.category === e.category && c.transactionType === e.transactionType
        );
        const intialAmount =
          e.transactionType === TransactionType.INCOME
            ? e.amount
            : 0 - (e.amount as number);
        if (alreadyAdded) {
          alreadyAdded.total += intialAmount;
        } else {
          categorySum.push({
            category: e.category,
            total: intialAmount,
            transactionType: e.transactionType,
          });
        }
      });

      res.json({ total, categories: categorySum });
    } catch (e) {
      console.log(e);
    }
  }
);

routes.post("/", validateExpenseData, formatDate, (req, res) => {
  const expenseData = { ...req.body };
  //   expenseData.createdAt = new Date();
  console.log(expenseData);

  console.log(new Date(), "");

  const expenseInstance = new Expense(expenseData);
  expenseInstance.save();

  res.send(expenseInstance);
});

routes.put("/:id", validateExpenseData, async (req, res) => {
  try {
    req.body.updatedDate = new Date();
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    console.log(updatedExpense);
    res.send(updatedExpense);
  } catch (e) {
    console.log(e);
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Expense.findByIdAndDelete(id);

    console.log(deleted);
    res.send(deleted);
  } catch (e) {
    console.log(e);
  }
});

export default routes;
