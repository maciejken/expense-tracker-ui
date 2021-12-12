import React, { FC } from "react";
import styles from "./ExpensesList.module.css";
import ExpenseItem from "../ExpenseItem";
import { ExpenseData } from "../expensesTypes";

interface ExpensesListProps {
  items: ExpenseData[];
}

const ExpensesList: FC<ExpensesListProps> = ({ items }) => {
  return (
    <ul className={styles.expensesList}>
      {items?.map(({ id, date, title, amount, isPrivate }) => (
        <ExpenseItem
          key={`expense-item-${id}`}
          id={id}
          amount={amount}
          date={date}
          title={title}
          isPrivate={isPrivate}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
