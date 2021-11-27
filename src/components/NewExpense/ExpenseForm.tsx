import classnames from "classnames";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEventHandler,
  useState,
} from "react";
import { getYearMonthDay } from "../../utils/date";
import { ExpenseData } from "../Expenses/types";
import styles from "./ExpenseForm.module.scss";
import { ExpenseFormProps } from "./types";

const ExpenseForm: FC<ExpenseFormProps> = ({ onSaveExpenseData }) => {
  const { year, month, day } = getYearMonthDay(new Date().toISOString());
  const today = `${year}-${month}-${day}`;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today);
  const [category, setCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const titleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };
  const amountChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value);
  };
  const dateChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setDate(evt.target.value);
  };
  const categoryChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setCategory(evt.target.value);
  };
  const isPrivateClickHandler: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    setIsPrivate((isPrivate) => !isPrivate);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { year, month, day } = getYearMonthDay(date);
    const expenseData: ExpenseData = {
      title,
      amount: +amount,
      date: `${year}-${month}-${day}`,
      category,
      isPrivate,
    };
    onSaveExpenseData(expenseData);
    setTitle("");
    setAmount("");
    setDate(today);
    setCategory("");
  };

  return (
    <form className={styles.newExpense__form} onSubmit={submitHandler}>
      <div>
        <label className={styles.newExpense__label}>Data</label>
        <input
          type="date"
          value={date}
          defaultValue={new Date().toISOString()}
          onChange={dateChangeHandler}
          className={classnames(
            styles.newExpense__input,
            styles.newExpense__dateInput
          )}
        />
      </div>
      <div>
        <label className={styles.newExpense__label}>Nazwa</label>
        <input
          type="text"
          value={title}
          onChange={titleChangeHandler}
          className={classnames(
            styles.newExpense__input,
            styles.newExpense__titleInput
          )}
        />
      </div>
      <div>
        <label className={styles.newExpense__label}>Kategoria</label>
        <input
          type="text"
          value={category}
          onChange={categoryChangeHandler}
          className={classnames(
            styles.newExpense__input,
            styles.newExpense__categoryInput
          )}
        />
      </div>
      <div>
        <label className={styles.newExpense__label}>Kwota</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={amountChangeHandler}
          className={classnames(
            styles.newExpense__input,
            styles.newExpense__amountInput
          )}
        />
      </div>
      <div>
        <button
          title={isPrivate ? "wydatek własny" : "wydatek wspólny"}
          onClick={isPrivateClickHandler}
          className={classnames({
            [styles.newExpense__isPrivate]: isPrivate,
            [styles.newExpense__isPublic]: !isPrivate,
          })}
        >
          {isPrivate ? "#" : "&"}
        </button>
      </div>
      <button type="submit" className={styles.newExpense__add}>
        +
      </button>
    </form>
  );
};

export default ExpenseForm;
