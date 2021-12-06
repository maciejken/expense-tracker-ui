import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classnames from "classnames";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEventHandler,
  useState,
} from "react";
import Add from "@material-ui/icons/Add";
import { getYearMonthDay } from "utils/date";
import { NewExpenseData } from "components/Expenses/types";
import styles from "./ExpenseForm.module.css";
import { ExpenseFormProps } from "components/NewExpense/types";
import { InputType } from "components/common";

const ExpenseForm: FC<ExpenseFormProps> = ({ onSaveExpenseData }) => {
  const [ year, month, day ] = getYearMonthDay(new Date().toISOString());
  const today = `${year}-${month}-${day}`;
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(today);
  const [category, setCategory] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const titleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };
  const amountChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value);
  };
  const dateChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setDate(evt.target.value);
  };
  const isPrivateClickHandler: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    setIsPrivate((isPrivate) => !isPrivate);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const [ year, month, day ] = getYearMonthDay(date);
    const expenseData: NewExpenseData = {
      title,
      amount,
      date: `${year}-${month}-${day}`,
      category,
      isPrivate,
    };
    onSaveExpenseData(expenseData);
    setTitle("");
    setAmount("");
    setDate(today);
    setCategory("");
    setIsPrivate(false);
  };

  return (
    <form className={styles.newExpense__form} onSubmit={submitHandler}>
      <div>
        <label className={styles.newExpense__label}>Data</label>
        <input
          type={InputType.Date}
          value={date}
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
          type={InputType.Text}
          value={title}
          onChange={titleChangeHandler}
          className={classnames(
            styles.newExpense__input,
            styles.newExpense__titleInput
          )}
        />
      </div>
      <div>
        <label className={styles.newExpense__label}>Kwota</label>
        <input
          type={InputType.Text}
          value={amount}
          onChange={amountChangeHandler}
          className={classnames(
            styles.newExpense__input,
            styles.newExpense__amountInput
          )}
        />
      </div>
      <div className={styles.newExpense__actions}>
        <button
          title={isPrivate ? "wydatek własny" : "wydatek wspólny"}
          onClick={isPrivateClickHandler}
          className={classnames(styles.newExpense__visibility, {
            [styles.newExpense__isPrivate]: isPrivate,
          })}
        >
          {isPrivate ? <VisibilityOff /> : <Visibility />}
        </button>
        <button title="Dodaj" type="submit" className={styles.newExpense__add}>
          <Add />
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
