import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { ActionType, IExpense } from "./@types/types";
import { AppContext } from "./context/context";

function App() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [changing, setChanging] = useState<boolean>(false); /// a flag to show changing expense

  const dispatchExpenseEvent = async (
    actionType: ActionType,
    payload: IExpense[]
  ) => {
    switch (actionType) {
      case ActionType.ADD_EXPENSE: {
        setChanging(!changing);
        return;
      }
      case ActionType.DELETE_EXPENSE: {
        setChanging(!changing);
        return;
      }
      case ActionType.ADD_ALL_EXPENSE: {
        setExpenses(payload);
        return;
      }
    }
  };

  return (
    <div className="bg-primary">
      <AppContext.Provider value={{ expenses, changing, dispatchExpenseEvent }}>
        <ExpenseForm />
        <ExpenseTable width={"50%"} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
