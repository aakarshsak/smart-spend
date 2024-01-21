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

import { Expense } from "../db/expense";
import {
  DAY,
  MONTH,
  TransactionType,
  WEEK,
  YEAR,
} from "../constants/constants";

export const getAllExpensesFromDB = async () => {
  const responses = await Expense.find();

  const sortedResponses = responses.sort((a: any, b: any): any => {
    return b.date - a.date;
  });

  return sortedResponses;
};

export const addExpenseToDB = async (expenseData: any) => {
  const expenseInstance = new Expense(expenseData);
  await expenseInstance.save();

  return expenseInstance;
};

export const getAllExpenseTotalsFromDB = async ({
  period,
  year,
  month,
  day,
  account,
}: any) => {
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

  const savedExpenses = await Expense.find(searchQuery);

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

  return { total, categories: categorySum };
};

export const updateExpenseByIdInDB = async (id: string, expense: any) => {
  expense.updatedDate = new Date();
  const updatedExpense = await Expense.findOneAndUpdate({ _id: id }, expense, {
    new: true,
  });
  return updatedExpense;
};

export const deleteExpenseByIdFromDB = async (id: string) =>
  await Expense.findByIdAndDelete(id);
