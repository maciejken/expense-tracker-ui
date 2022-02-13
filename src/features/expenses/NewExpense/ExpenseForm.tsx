import classnames from "classnames";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEventHandler,
  useState,
} from "react";
import styles from "features/expenses/NewExpense/ExpenseForm.module.css";
import { InputType } from "common/types";
import { NewExpenseData } from "features/expenses/expensesTypes";

export interface ExpenseFormProps {
  date: string;
  onAddExpense: (data: NewExpenseData) => void;
}

const ExpenseForm: FC<ExpenseFormProps> = ({ date, onAddExpense }) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const titleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };
  const amountChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value);
  };
  const isPrivateClickHandler: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    setIsPrivate((isPrivate) => !isPrivate);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const expenseData = {
      date,
      title,
      amount: amount.replace(',', '.'),
      isPrivate,
    };
    onAddExpense(expenseData);
    setTitle("");
    setAmount("");
    setIsPrivate(false);
  };

  return (
    <form className={styles.newExpense__form} onSubmit={submitHandler}>
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
          type="button"
          onClick={isPrivateClickHandler}
          className={classnames(styles.newExpense__visibility, {
            [styles.newExpense__isPrivate]: isPrivate,
          })}
        >
          <i className={`fa fa-eye${isPrivate ? "-slash" : ""}`} />
        </button>
        <button title="Dodaj" type="submit" className={styles.newExpense__add}>
          <i className="fa fa-plus" />
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
