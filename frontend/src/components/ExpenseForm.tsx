import {
  EffectCallback,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { AxiosError } from "axios";
const valuesss: any[] = [
  {
    _id: "65aab0689767092c5bed9354",
    name: "eating out",
    transactionType: "expense",
    __v: 0,
  },
  {
    _id: "65aab0689767092c5bed9355",
    name: "travel",
    transactionType: "expense",
    __v: 0,
  },
  {
    _id: "65aab0689767092c5bed9356",
    name: "entertainment",
    transactionType: "expense",
    __v: 0,
  },
  {
    _id: "65aab0689767092c5bed9359",
    name: "splitwise",
    transactionType: "income",
    __v: 0,
  },
  {
    _id: "65aab0689767092c5bed935a",
    name: "refund",
    transactionType: "income",
    __v: 0,
  },
  {
    _id: "65aab0689767092c5bed9357",
    name: "shopping",
    transactionType: "expense",
    __v: 0,
  },
  {
    _id: "65aab0689767092c5bed9358",
    name: "salary",
    transactionType: "income",
    __v: 0,
  },
];

const ExpenseForm = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const descriptionInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);
  const categoryInput = useRef<HTMLSelectElement>(null);
  const accountInput = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const getCategoryData = async () => {
      const { data } = await axios.get("http://localhost:8080/categories");
      console.log(data);
      setCategories(data);
    };

    getCategoryData();
  }, []);

  const submitExpenseForm = async (e: FormEvent) => {
    e.preventDefault();
    console.log(
      descriptionInput.current?.value,
      dateInput.current?.value,
      amountInput.current?.value,
      accountInput.current?.value,
      categoryInput.current?.value
    );

    const req = {
      description: descriptionInput.current?.value,
      date: dateInput.current?.value,
      amount: parseInt(amountInput.current?.value ?? ""),
      account: accountInput.current?.value,
      category: categoryInput.current?.value,
      transactionType: "expense",
    };

    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:8080/expenses",
        data: req,
      });

      console.log(res, "RESPONSE>......");
    } catch (e: any) {
      console.log(e.response);
    }
  };

  return (
    <form className="w-[40rem]" onSubmit={submitExpenseForm}>
      <div className="mb-5 flex gap-4 items-center">
        <label htmlFor="date" className="w-1/6 capitalize font-medium text-end">
          date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className="w-5/6 rounded-md border py-3 px-6 font-medium text-date"
          ref={dateInput}
        />
      </div>
      <div className="mb-5 flex gap-4 items-center">
        <label
          htmlFor="category"
          className="w-1/6 capitalize font-medium text-end"
        >
          category
        </label>
        <select
          id="category"
          className="w-5/6 rounded-md border py-3 px-6 font-medium text-date"
          ref={categoryInput}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((option) => (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5 flex gap-4 items-center">
        <label
          htmlFor="amount"
          className="w-1/6 capitalize font-medium text-end"
        >
          amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          ref={amountInput}
          className="w-5/6 rounded-md border py-3 px-6 font-medium text-date"
        />
      </div>
      <div className="mb-5 flex gap-4 items-center">
        <label
          htmlFor="account"
          className="w-1/6 capitalize font-medium text-end"
        >
          account
        </label>
        <select
          id="account"
          className="w-5/6 rounded-md border py-3 px-6 font-medium text-date"
          ref={accountInput}
        >
          <option value="account vaue h ye">Choose an account</option>
          <option value="HDFC">HDFC</option>
          <option value="SBI">SBI</option>
          <option value="ICICI">ICICI</option>
        </select>
      </div>
      <div className="mb-5 flex gap-4 items-center">
        <label
          htmlFor="description"
          className="w-1/6 capitalize font-medium text-end"
        >
          description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          ref={descriptionInput}
          className="w-5/6 rounded-md border py-3 px-6 font-medium text-date"
        />
      </div>
      <input
        type="submit"
        className="w-full bg-green-200 text-green-700 py-2 tracking-widest uppercase font-bold text-3xl hover:cursor-pointer"
        value="Submit"
      />

      {/* <h1>{JSON.stringify(categories)}</h1> */}
    </form>
  );
};

export default ExpenseForm;
