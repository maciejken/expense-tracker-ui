import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { getLocaleYearMonthDay } from "utils/date";
import styles from "./ExpenseItem.module.scss";
import { ExpenseData, ExpenseItemProps } from "components/Expenses/types";
import { locale } from "config";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Delete from "@material-ui/icons/Delete";
import classNames from "classnames";
import { InputType } from "components/common";

const ExpenseItem: FC<ExpenseItemProps> = ({
  id,
  amount,
  date,
  isPrivate,
  title,
  onUpdate,
  onDelete,
}) => {
  // const [updatedDate, setDate] = useState<string>(date);
  // const [isDateLoading, setDateLoading] = useState<boolean>(false);
  // const [updatedTitle, setTitle] = useState<string>(title);
  // const [isTitleLoading, setTitleLoading] = useState<boolean>(false);
  // const [isPrivateLoading, setIsPrivateLoading] = useState<boolean>(false);
  const [updatedAmount, setAmount] = useState<string>(amount);
  // const [isAmountLoading, setAmountLoading] = useState<boolean>(false);

  const { year, month, day } = getLocaleYearMonthDay(date, locale);

  const amountChangeHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAmount(evt.target.value);
  };

  const visibilityClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const isConfirmed = window.confirm(
      "Czy chcesz zmienić widoczność wydatku?"
    );
    if (isConfirmed) {
      onUpdate(id, { isPrivate: !isPrivate });
    }
  };

  const amountBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    onUpdate(id, { amount: updatedAmount });
  };

  const deleteHandler = () => {
    onDelete({ id, date, title, amount, isPrivate } as ExpenseData);
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
        <h2 className={styles.expenseItem__title}>{title}</h2>
        <input
          className={classNames(styles.expenseItem__amount, {
            [styles.isPrivate]: isPrivate,
          })}
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
    </li>
  );
};

export default ExpenseItem;
