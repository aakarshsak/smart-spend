import {
  EffectCallback,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { AxiosError } from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { ActionType, Dimensions, ExpenseContextType } from "../@types/types";
import { AppContext } from "../context/context";

const ExpenseForm = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const descriptionInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);
  const categoryInput = useRef<HTMLSelectElement>(null);
  const accountInput = useRef<HTMLSelectElement>(null);

  const { dispatchExpenseEvent } = useContext(AppContext) as ExpenseContextType;

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const { data, status } = await axios.get(
          "http://localhost:8080/categories"
        );
        if (status === 200) {
          console.log(data);
          setCategories(data);
          setIsLoading(false);
          return;
        }
        throw new Error(data.message);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getCategoryData();
  }, []);

  const submitExpenseForm = async (e: FormEvent) => {
    e.preventDefault();
    const req = {
      description: descriptionInput.current?.value,
      date: dateInput.current?.value,
      amount: parseInt(amountInput.current?.value ?? ""),
      account: accountInput.current?.value,
      category: categoryInput.current?.value,
      transactionType: "expense",
    };

    try {
      setIsLoading(true);
      const res = await axios({
        method: "post",
        url: "http://localhost:8080/expenses",
        data: req,
      });
      setErrorMessage("");
      console.log(res, "RESPONSE>......");
      dispatchExpenseEvent(ActionType.ADD_EXPENSE, [res.data]);
    } catch (e: any) {
      const errror = JSON.parse(e.response.data.message);
      console.log(errror, "json error");
      setErrorMessage(errror[0].message);
    }
    setIsLoading(false);
  };

  const inputGroupClassNames = "mb-5 flex gap-4 items-center";
  const inputClassNames =
    "w-2/3 rounded-md border py-3 px-6 font-thin tracking-wide text-sm text-word";
  const inputLabelClassNames =
    "w-1/3 capitalize font-medium text-end text-accent";

  return (
    <>
      <LoadingSpinner loading={isLoading} />
      <form
        className={`w-[23rem] bg-secondary border border-opacity-40 rounded-sm p-5 opacity-${
          isLoading ? 20 : 100
        }`}
        onSubmit={submitExpenseForm}
      >
        <div className={inputGroupClassNames}>
          <label htmlFor="date" className={inputLabelClassNames}>
            date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className={inputClassNames}
            ref={dateInput}
          />
        </div>
        <div className={inputGroupClassNames}>
          <label htmlFor="category" className={inputLabelClassNames}>
            category
          </label>
          <select id="category" className={inputClassNames} ref={categoryInput}>
            <option value="">Select a category</option>
            {categories.map((option) => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className={inputGroupClassNames}>
          <label htmlFor="amount" className={inputLabelClassNames}>
            amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            ref={amountInput}
            className={inputClassNames}
          />
        </div>
        <div className={inputGroupClassNames}>
          <label htmlFor="account" className={inputLabelClassNames}>
            account
          </label>
          <select id="account" className={inputClassNames} ref={accountInput}>
            <option value="account vaue h ye">Choose an account</option>
            <option value="HDFC">HDFC</option>
            <option value="SBI">SBI</option>
            <option value="ICICI">ICICI</option>
          </select>
        </div>
        <div className={inputGroupClassNames}>
          <label htmlFor="description" className={inputLabelClassNames}>
            description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            ref={descriptionInput}
            className={inputClassNames}
          />
        </div>
        <input
          type="submit"
          className="w-full bg-button text-button-word py-2 tracking-widest uppercase font-bold text-3xl hover:cursor-pointer"
          value="Submit"
        />
        <span className="text-red-500">{errorMessage}</span>
      </form>
    </>
  );
};

export default ExpenseForm;
