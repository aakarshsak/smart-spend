import {
  addExpenseToDB,
  deleteExpenseByIdFromDB,
  getAllExpenseTotalsFromDB,
  getAllExpensesFromDB,
  updateExpenseByIdInDB,
} from "../services/expense";

export const getAllExpenses = async () => await getAllExpensesFromDB();

export const addExpense = async (expense: any) => await addExpenseToDB(expense);

export const getAllExpensesTotals = async (query: any) =>
  await getAllExpenseTotalsFromDB(query);

export const updateExpenseById = async (id: string, expense: any) =>
  await updateExpenseByIdInDB(id, expense);

export const deleteExpenseById = async (id: string) => {
  await deleteExpenseByIdFromDB(id);
};
