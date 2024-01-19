import { Schema, model } from "mongoose";

const ExpenseSchema = new Schema({
  amount: Number,
  category: String,
  account: String,
  description: String,
  date: Date,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

export const Expense = model("Expense", ExpenseSchema);
