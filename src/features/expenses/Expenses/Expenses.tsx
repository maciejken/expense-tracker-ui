import React, { FC } from "react";
import styles from "./Expenses.module.css";
import ExpensesList from "../ExpensesList/ExpensesList";
import { ExpenseData } from "../expensesTypes";
import NewExpense from "../NewExpense/NewExpense";
import ExpensesChart from "../ExpensesChart";

interface ExpensesProps {
  expenses: ExpenseData[];
}

const Expenses: FC<ExpensesProps> = ({
  expenses,
}) => {
  return (
    <div className={styles.expenses}>
      <ExpensesChart />
      <NewExpense />
      <ExpensesList items={expenses} />
    </div>
  );
};

export default Expenses;
