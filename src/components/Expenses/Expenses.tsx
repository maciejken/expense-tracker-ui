import React, { ChangeEvent, FC, useState } from 'react';
import styles from './Expenses.module.css';
import ExpensesChart from './ExpensesChart';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import { ExpensesProps } from './types';

const Expenses: FC<ExpensesProps> = ({ items, onDeleteExpense }) => {
  const currentYear = '' + new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const filteredItems = items.filter(item => new Date(item.date).getFullYear() === parseInt(selectedYear));
  const selectYearHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(evt.target.value);
  };

  return (
    <div className={styles.expenses}>
      <ExpensesFilter
        onSelectYear={selectYearHandler}
        selectedYear={selectedYear}
      />
      <ExpensesChart expenses={filteredItems} />
      <ExpensesList items={filteredItems} year={selectedYear} onDeleteExpense={onDeleteExpense} />
    </div>
  );
}

export default Expenses;
