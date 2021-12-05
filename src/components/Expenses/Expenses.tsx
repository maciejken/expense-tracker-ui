import React, { FC } from "react";
import styles from "components/Expenses/Expenses.module.css";
import ExpensesChart from "components/Expenses/ExpensesChart";
import ExpensesFilter from "components/Expenses/ExpensesFilter";
import ExpensesList from "components/Expenses/ExpensesList";
import { ExpenseChartYear, ExpensesProps, } from "components/Expenses/types";

const Expenses: FC<ExpensesProps> = ({
  chartData,
  items,
  loading,
  onYearChange,
  onMonthChange,
  onDeleteExpense,
  onUpdateExpense,
  selectedYear,
  selectedMonth,
}) => {

  const selectYearHandler = (year: string) => {
    onYearChange(year);
  };
  const selectMonthHandler = (month: string) => {
    onMonthChange(month);
  };
  const years = chartData.map(year => year.id);
  const selectedChartData = chartData.find(year => year.id === selectedYear) as ExpenseChartYear;

  return (
    <div className={styles.expenses}>
      {selectedChartData && <div className={styles.expensesChart}>
        <ExpensesChart data={selectedChartData.months} />
        <ExpensesFilter
          years={years}
          onSelectYear={selectYearHandler}
          selectedYear={selectedYear}
          onSelectMonth={selectMonthHandler}
          selectedMonth={selectedMonth}
        />
      </div>}
      {loading && <div className={styles.expenses__loading}>Ładuję dane...</div>}
      {!loading && (
        <ExpensesList
          items={items}
          loading={loading}
          year={selectedYear}
          month={selectedMonth}
          onDeleteExpense={onDeleteExpense}
          onUpdateExpense={onUpdateExpense}
        />)}
    </div>
  );
};

export default Expenses;
