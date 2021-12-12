import React, { FC } from "react";
import styles from "./Expenses.module.css";
import ExpensesList from "../ExpensesList/ExpensesList";
import { ExpenseData } from "../expensesTypes";

interface ExpensesProps {
  expenses: ExpenseData[];
}

const Expenses: FC<ExpensesProps> = ({ expenses }) => {
  return (
    <div className={styles.expenses}>
      <ExpensesList items={expenses} />
    </div>
  );
};

export default Expenses;
