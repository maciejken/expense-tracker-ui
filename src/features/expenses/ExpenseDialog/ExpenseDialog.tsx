import classnames from "classnames";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import styles from "./ExpenseDialog.module.css";
import { InputType } from "common/types";
import { NewExpenseData } from "../expensesTypes";

export interface ExpenseFormProps {
  date: string;
  onAddExpense: (data: NewExpenseData, shouldCloseDialog?: boolean) => void;
  onCancel: () => void;
}

const ExpenseForm: FC<ExpenseFormProps> = ({ date, onAddExpense, onCancel }) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [addMore, setAddMore] = useState<boolean>(false);

  const titleChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setTitle(evt.target.value);
  };
  const amountChangeHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAmount(evt.target.value);
  };
  const isPrivateClickHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setIsPrivate(evt.target.checked);
  };
  const addMoreClickHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAddMore(evt.target.checked);
  };

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const expenseData = {
      date,
      title,
      amount: amount.replace(",", "."),
      isPrivate,
    };
    onAddExpense(expenseData, !addMore);
    setTitle("");
    setAmount("");
    setIsPrivate(false);
  };

  const dialogCloseHandler: MouseEventHandler<HTMLButtonElement> = () => {
    onCancel();
  };

  return (
    <div className={styles.dialog}>
      <header className={styles.dialogHeader}>Nowy wydatek</header>
      <form className={styles.newExpense__form} onSubmit={formSubmitHandler}>
        <div className={styles.formControl}>
          <label className={styles.label}>Opis</label>
          <textarea
            value={title}
            onChange={titleChangeHandler}
            className={classnames(styles.input, styles.title)}
            autoFocus
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.label}>Kwota</label>
          <input
            type={InputType.Text}
            value={amount}
            onChange={amountChangeHandler}
            className={classnames(styles.input, styles.amount)}
          />
        </div>
        <div className={styles.formControl}>
          <label>
            <input
              type={InputType.Checkbox}
              checked={!isPrivate}
              onChange={isPrivateClickHandler}
              className={styles.checkbox}
            />
            Sumuj
          </label>
          <label>
            <input
              type={InputType.Checkbox}
              checked={addMore}
              onChange={addMoreClickHandler}
              className={styles.checkbox}
            />
            Dodaj więcej
          </label>
        </div>
        <div className={styles.formActions}>
          <button
            title="Odrzuć"
            type="button"
            className={classnames(styles.actionButton, styles.closeButton)}
            onClick={dialogCloseHandler}
          >
            Odrzuć
          </button>
          <button
            title="Zapisz"
            type="submit"
            className={classnames(styles.actionButton, styles.submitButton)}
          >
            Zapisz
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
