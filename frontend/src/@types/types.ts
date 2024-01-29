export type Dimensions = {
  width: string;
  height?: string;
};

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  TRANSFER = "transfer",
  ALL = "all",
}

export interface IExpense {
  _id: string;
  amount: number;
  transactionType: TransactionType;
  category: string;
  account: string;
  description: string;
  date: Date;
}

export type ExpenseContextType = {
  expenses: IExpense[];
  changing: boolean;
  dispatchExpenseEvent: (actionType: ActionType, payload: any) => void;
};

export enum ActionType {
  ADD_EXPENSE = "ADD_EXPENSE",
  DELETE_EXPENSE = "DELETE_EXPENSE",
  ADD_ALL_EXPENSE = "ADD_ALL_EXPENSE",
}
