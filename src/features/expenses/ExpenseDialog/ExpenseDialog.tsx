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
import Button, {
  ButtonType,
  ButtonVariant,
} from "common/components/Button/Button";
import Dialog from "common/components/Dialog/Dialog";

export interface ExpenseFormProps {
  date: string;
  onAddExpense: (data: NewExpenseData) => void;
  onCancel: () => void;
}

const maxTitleLength = 140;

const ExpenseForm: FC<ExpenseFormProps> = ({
  date,
  onAddExpense,
  onCancel,
}) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const titleChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setTitle(evt.target.value);
  };
  const amountChangeHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAmount(evt.target.value);
  };
  const isPrivateClickHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setIsPrivate((isPrivate) => !isPrivate);
  };

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const expenseData = {
      date,
      title,
      amount: amount.replace(",", "."),
      isPrivate,
    };
    onAddExpense(expenseData);
    setTitle("");
    setAmount("");
    setIsPrivate(false);
  };

  const dialogCloseHandler: MouseEventHandler<HTMLButtonElement> = () => {
    onCancel();
  };

  return (
    <Dialog title="Nowy wydatek" onClose={dialogCloseHandler}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <div className={styles.formControl}>
          <label className={styles.label}>
            <span
              className={classnames({
                [styles.hasError]: title.length > maxTitleLength,
              })}
            >
              Opis ({title.length}/{maxTitleLength})
            </span>
            <textarea
              value={title}
              onChange={titleChangeHandler}
              className={styles.textArea}
              autoFocus
              rows={3}
            />
          </label>
        </div>
        <div className={styles.row}>
          <div className={classnames(styles.formControl, styles.amount)}>
            <label className={styles.label}>
              Kwota
              <input
                type={InputType.Number}
                step={0.01}
                min={0}
                max={99999999.99}
                value={amount}
                onChange={amountChangeHandler}
                className={classnames(styles.input)}
              />
            </label>
          </div>
          <div
            className={classnames(styles.formControl)}
          >
            <label className={styles.checkboxLabel}>
              <input
                type={InputType.Checkbox}
                checked={!isPrivate}
                onChange={isPrivateClickHandler}
                className={classnames(styles.checkbox, styles.isPrivate)}
              />
              Sumuj
            </label>
          </div>
        </div>
        <div className={styles.formActions}>
          <Button
            title="Odrzuć"
            variant={ButtonVariant.Secondary}
            onClick={dialogCloseHandler}
          >
            Odrzuć
          </Button>
          <Button title="Zapisz" type={ButtonType.Submit}>
            Zapisz
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ExpenseForm;
