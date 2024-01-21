import { FormEvent, useRef } from "react";
import axios from "axios";

const ExpenseForm = () => {
  const descriptionInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);
  const categoryInput = useRef<HTMLSelectElement>(null);
  const accountInput = useRef<HTMLSelectElement>(null);

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
      amount: amountInput.current?.value,
      account: accountInput.current?.value,
      category: categoryInput.current?.value,
    };
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/expenses",
      data: req,
    });

    console.log(res, "RESPONSE>......");
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
          <option value="vategory vaue h ye" selected>
            Choose a category
          </option>
          <option value="value2">value2</option>
          <option value="value3">value3</option>
          <option value="value4">value4</option>
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
          <option value="value2">value2</option>
          <option value="value3">value3</option>
          <option value="value4">value4</option>
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
    </form>
  );
};

export default ExpenseForm;
