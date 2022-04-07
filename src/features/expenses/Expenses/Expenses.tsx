import React, { FC, MouseEventHandler } from "react";
import styles from "./Expenses.module.css";
import ExpensesList from "../ExpensesList";
import ExpenseDialog from "../ExpenseDialog";
import ExpensesChart from "../ExpensesChart";

interface ExpensesProps {
  canCreate: boolean;
  onCreate: () => void;
}

const Expenses: FC<ExpensesProps> = ({ canCreate, onCreate }) => {
  const addButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    onCreate();
  };
  return (
    <div className={styles.expenses}>
      <ExpensesChart />
      <ExpensesList />
      {canCreate && (
        <button className={styles.addButton} onClick={addButtonClickHandler}>
          +
        </button>
      )}
      <ExpenseDialog />
    </div>
  );
};

export default Expenses;
