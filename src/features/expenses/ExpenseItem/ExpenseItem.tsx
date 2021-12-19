import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { getLocaleYearMonthDay } from "utils/date";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Delete from "@material-ui/icons/Delete";
import classNames from "classnames";
import { InputType } from "common/types";
import Loader from "common/components/Loader";
import styles from "./ExpenseItem.module.css";
import { ExpenseData, ExpenseUpdate } from "../expensesTypes";

interface ExpenseItemProps extends ExpenseData {
  onDelete: (data: ExpenseData) => void;
  onUpdate: (data: ExpenseUpdate) => void;
}

const ExpenseItem: FC<ExpenseItemProps> = ({
  id,
  amount,
  date,
  isPrivate,
  title,
  onUpdate,
  onDelete,
}) => {
  const [updatedTitle, setTitle] = useState<string>(title);
  const [updatedAmount, setAmount] = useState<string>(amount);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { year, month, day } = getLocaleYearMonthDay(date);

  const titleChangeHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setTitle(evt.target.value);
  };

  const amountChangeHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAmount(evt.target.value);
  };

  const waitForIt = async (fn: () => Promise<void>) => {
    setIsLoading(true);
    await fn();
    setIsLoading(false);
  };

  const visibilityClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const isConfirmed = window.confirm(
      "Czy chcesz zmienić widoczność wydatku?"
    );
    if (isConfirmed) {
      waitForIt(async () => onUpdate({ isPrivate: !isPrivate }));
    }
  };

  const titleBlurHandler: FocusEventHandler<HTMLInputElement> = async () => {
    if (updatedTitle !== title) {
      waitForIt(async () => onUpdate({ title: updatedTitle }));
    }
  };

  const amountBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    if ('' + updatedAmount !== '' + amount) {
      waitForIt(async () => onUpdate({ amount: updatedAmount }));
    }
  };

  const deleteHandler = () => {
    const isConfirmed = window.confirm(
      `Usunąć ${title} (${amount} zł)?`
    );
    if (isConfirmed) {
      waitForIt(async () =>
        onDelete({ id, date, title, amount, isPrivate } as ExpenseData)
      );      
    }
  };

  const tooltip = title.concat(isPrivate ? " (własny)" : " (wspólny)");
  return (
    <li className={styles.expenseItem} title={tooltip}>
      <div className={styles.expenseItem__date}>
        <div className={styles.expenseItem__month}>{month}</div>
        <div className={styles.expenseItem__day}>{day}</div>
        <div className={styles.expenseItem__year}>{year}</div>
      </div>
      <div className={styles.expenseItem__description}>
        <input
          className={classNames(
            styles.expenseItem__textInput,
            styles.expenseItem__title
          )}
          type={InputType.Text}
          value={updatedTitle}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
        />
        <input
          className={classNames(
            styles.expenseItem__textInput,
            styles.expenseItem__amount,
            {
              [styles.expenseItem__amountPrivate]: isPrivate,
            }
          )}
          type={InputType.Text}
          value={updatedAmount}
          onChange={amountChangeHandler}
          onBlur={amountBlurHandler}
        />
        <div className={styles.expenseItem__actions}>
          <button
            onClick={visibilityClickHandler}
            className={classNames(styles.expenseItem__visibility, {
              [styles.expenseItem__isPrivate]: isPrivate,
              [styles.expenseItem__isPublic]: !isPrivate,
            })}
          >
            {isPrivate ? <VisibilityOff /> : <Visibility />}
          </button>
          <button
            title={`Usuń "${title} (${amount} zł)"`}
            className={styles.expenseItem__delete}
            onClick={deleteHandler}
          >
            <Delete />
          </button>
        </div>
      </div>
      {isLoading && <Loader isOverlay />}
    </li>
  );
};

export default ExpenseItem;
