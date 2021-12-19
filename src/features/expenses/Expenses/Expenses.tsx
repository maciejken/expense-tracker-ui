import React, { ChangeEventHandler, FC } from "react";
import styles from "./Expenses.module.css";
import ExpensesList from "../ExpensesList/ExpensesList";
import { ExpenseData } from "../expensesTypes";
import NewExpense from "../NewExpense/NewExpense";
import Chart, { DataPoint } from "common/components/Chart/Chart";

interface ExpensesProps {
  chartData: DataPoint[];
  chartInterval: string;
  chartValue: string;
  expenses: ExpenseData[];
  onChartChange: ChangeEventHandler<HTMLInputElement>;
}

const Expenses: FC<ExpensesProps> = ({
  chartData,
  chartInterval,
  chartValue,
  expenses,
  onChartChange,
}) => {
  return (
    <div className={styles.expenses}>
      <Chart
        data={chartData}
        interval={chartInterval}
        onChange={onChartChange}
        value={chartValue}
      />
      <NewExpense />
      <ExpensesList items={expenses} />
    </div>
  );
};

export default Expenses;
