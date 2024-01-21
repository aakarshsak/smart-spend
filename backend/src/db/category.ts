import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: String,
  transactionType: String,
});

export const Category = model("Category", CategorySchema);
