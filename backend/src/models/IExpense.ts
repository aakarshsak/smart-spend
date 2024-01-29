import { TransactionType } from "../constants/constants";

export default interface IExpense {
  amount: number;
  transactionType: TransactionType;
  category: string;
  account: string;
  description: string;
  date: Date;
  createdDate: Date;
  updatedDate: Date;
}
