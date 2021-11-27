import classnames from "classnames";
import React, { FC } from "react";
import { getLocaleYearMonthDay } from "../../utils/date";
import styles from "./ExpenseItem.module.scss";
import { ExpenseData, ExpenseItemProps } from "./types";

const ExpenseItem: FC<ExpenseItemProps> = ({
  id,
  amount,
  date,
  isPrivate,
  title,
  onDelete,
}) => {
  const { year, month, day } = getLocaleYearMonthDay(date, "pl-PL");

  const deleteHandler = () => {
    onDelete({ id, date, title, amount, isPrivate } as ExpenseData);
  };

  const tooltip = title.concat(
    isPrivate ? " (własny)" : " (wspólny)"
  );
  return (
    <li className={styles.expenseItem} title={tooltip}>
      <div className={styles.expenseItem__date}>
        <div className={styles.expenseItem__month}>{month}</div>
        <div className={styles.expenseItem__day}>{day}</div>
        <div className={styles.expenseItem__year}>{year}</div>
      </div>
      <div className={styles.expenseItem__description}>
        <h2 className={styles.expenseItem__title}>{title}</h2>
        <div
          className={classnames(styles.expenseItem__price, {
            [styles.expenseItem__isPrivate]: isPrivate,
          })}
        >
          {amount}
        </div>
        <button
          title={`Usuń "${title}"`}
          className={styles.expenseItem__delete}
          onClick={deleteHandler}
        ></button>
      </div>
    </li>
  );
};

export default ExpenseItem;
