import { useState } from 'react';
import styles from './Expenses.module.css';
import ExpensesChart from './ExpensesChart';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';

function Expenses({ items }) {
  const currentYear = '' + new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const filteredItems = items.filter(item => item.date.getFullYear() === parseInt(selectedYear));
  const selectYearHandler = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className={styles.expenses}>
      <ExpensesFilter
        onSelectYear={selectYearHandler}
        selectedYear={selectedYear}
      />
      <ExpensesChart expenses={filteredItems} />
      <ExpensesList items={filteredItems} year={selectedYear} />
    </div>
  );
}

export default Expenses;
