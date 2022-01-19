import React, {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { getLocaleYearMonthDay } from "utils/date";
import classNames from "classnames";
import { InputType } from "common/types";
import Loader from "common/components/Loader/Loader";
import styles from "./ExpenseItem.module.css";
import { ExpenseData, ExpenseUpdate } from "../expensesTypes";
import { getLocalAmount, getLocalFloat } from "utils/number";

interface ExpenseItemProps extends ExpenseData {
  isDraggable: boolean;
  onDelete: (data: ExpenseData) => void;
  onUpdate: (data: ExpenseUpdate) => void;
}

const ExpenseItem: FC<ExpenseItemProps> = ({
  id,
  amount,
  date,
  isPrivate,
  title,
  isDraggable,
  onUpdate,
  onDelete,
}) => {
  const [updatedTitle, setTitle] = useState<string>(title);
  const [updatedAmount, setAmount] = useState<string>(getLocalFloat(amount));
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
    if (getLocalFloat(updatedAmount) !== getLocalFloat(amount)) {
      waitForIt(async () =>
        onUpdate({ amount: updatedAmount.replace(",", ".") })
      );
    }
  };

  const deleteHandler = () => {
    const isConfirmed = window.confirm(
      `Usunąć ${title} (${getLocalAmount(amount)})?`
    );
    if (isConfirmed) {
      waitForIt(async () =>
        onDelete({ id, date, title, amount, isPrivate } as ExpenseData)
      );
    }
  };

  const tooltip = title.concat(isPrivate ? " (własny)" : " (wspólny)");

  const dragStartHandler: DragEventHandler<HTMLLIElement> = (e) => {
    e.dataTransfer.setData("itemId", id);
  };

  return (
    <li
      className={classNames(styles.container, {
        [styles.draggable]: isDraggable,
      })}
      title={tooltip}
      draggable={isDraggable}
      onDragStart={dragStartHandler}
    >
      <div className={styles.date}>
        <div className={styles.month}>{month}</div>
        <div className={styles.day}>{day}</div>
        <div className={styles.year}>{year}</div>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={classNames(styles.textInput, styles.title)}
          type={InputType.Text}
          value={updatedTitle}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
        />
        <input
          className={classNames(styles.textInput, styles.amount, {
            [styles.amountPrivate]: isPrivate,
          })}
          type={InputType.Text}
          value={updatedAmount}
          onChange={amountChangeHandler}
          onBlur={amountBlurHandler}
        />
        <div className={styles.actions}>
          <button
            onClick={visibilityClickHandler}
            className={classNames(styles.visibility, {
              [styles.isPrivate]: isPrivate,
              [styles.isPublic]: !isPrivate,
            })}
          >
            <i className={`fa fa-eye${isPrivate ? "-slash" : ""}`} />
          </button>
          <button
            title={`Usuń "${title} (${amount} zł)"`}
            className={styles.delete}
            onClick={deleteHandler}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
      {isLoading && <Loader overlay />}
    </li>
  );
};

export default ExpenseItem;
