import React, { FC } from "react";
import styles from "./ExpensesList.module.scss";
import ExpenseItem from "./ExpenseItem";
import { ExpensesListProps } from "./types";
import { getMonths } from "utils/date";

const ExpensesList: FC<ExpensesListProps> = ({
  items,
  year,
  month,
  onDeleteExpense,
  onUpdateExpense,
}) => {
  const months = getMonths();
  const monthLabel = months.find(m => m.id === month)?.label;
  if (items.length === 0) {
    return (
      <h2 className={styles.expensesList__fallback}>{monthLabel} {year} - brak wydatków</h2>
    );
  }

  return (
    <ul className={styles.expensesList}>
      {items.map((item) => (
        <ExpenseItem
          key={item.id}
          id={item.id}
          amount={item.amount}
          date={item.date}
          title={item.title}
          isPrivate={item.isPrivate}
          onUpdate={onUpdateExpense}
          onDelete={onDeleteExpense}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
