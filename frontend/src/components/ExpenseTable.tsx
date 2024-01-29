import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { ActionType, Dimensions, ExpenseContextType } from "../@types/types";
import { TransactionType } from "../@types/types";
import { formatDate } from "date-fns";
import { AppContext } from "../context/context";

const ExpenseTable: FC<Dimensions> = ({ width }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTransactionType, setActiveTransaction] = useState<string>(
    TransactionType.ALL
  );

  const { expenses, changing, dispatchExpenseEvent } = useContext(
    AppContext
  ) as ExpenseContextType;

  useEffect(() => {
    const getAllExpenseData = async () => {
      try {
        const { data, status } = await axios.get(
          "http://localhost:8080/expenses"
        );
        if (status === 200) {
          dispatchExpenseEvent(ActionType.ADD_ALL_EXPENSE, data);
          setIsLoading(false);
          return;
        }
        throw new Error(data.message);
      } catch (e) {
        console.log(e);
      }
    };
    getAllExpenseData();
  }, [changing]);

  return (
    <>
      <LoadingSpinner loading={isLoading} />
      <div className={`w-[${width}] p-5 bg-secondary border rounded-sm`}>
        <ul className="flex flex-row gap-8 text-disabled font-extrabold mb-5 tracking-wider text-lg">
          <li
            key={1}
            className={`hover:cursor-pointer ${
              activeTransactionType === TransactionType.ALL && "text-dark"
            }`}
            onClick={() => setActiveTransaction(TransactionType.ALL)}
          >
            ALL
          </li>
          <li
            key={2}
            className={`hover:cursor-pointer ${
              activeTransactionType === TransactionType.EXPENSE && "text-dark"
            }`}
            onClick={() => setActiveTransaction(TransactionType.EXPENSE)}
          >
            Expenses
          </li>
          <li
            key={3}
            className={`hover:cursor-pointer ${
              activeTransactionType === TransactionType.INCOME && "text-dark"
            }`}
            onClick={() => setActiveTransaction(TransactionType.INCOME)}
          >
            Income
          </li>
        </ul>
        <div className="w-full text-center">
          {expenses
            .filter(
              ({ transactionType }: any) =>
                transactionType === activeTransactionType ||
                activeTransactionType === TransactionType.ALL
            )
            .slice(0, 10)
            .map(
              ({
                _id,
                date,
                description,
                amount,
                account,
                category,
                transactionType,
              }: any) => {
                return (
                  <div key={_id}>
                    <div className="flex capitalize text-accent font-medium tracking-wide py-5">
                      <div className="flex flex-col items-start w-2/3">
                        <div className="text-start">{description}</div>
                        <div className="flex text-proxy gap-2 text-sm">
                          <div className="">{category}, </div>
                          <div className="text-end">
                            {formatDate(new Date(date), "dd-MM-yyyy")}
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div
                          className={`${
                            transactionType === TransactionType.EXPENSE
                              ? "text-error"
                              : transactionType === TransactionType.INCOME
                              ? "text-highlight"
                              : "text-warning"
                          }`}
                        >
                          ₹{amount}
                        </div>
                        <div className="uppercase text-sm text-proxy">
                          {account}
                        </div>
                      </div>
                    </div>
                    <hr className="border-accent border-opacity-20" />
                  </div>
                );
              }
            )}
        </div>
      </div>
    </>
  );
};

export default ExpenseTable;
