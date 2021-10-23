import { useState } from 'react';
import './Expenses.css';
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from './ExpensesFilter';

function Expenses({ items }) {
  const currentYear = '' + new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const filteredItems = items.filter(item => item.date.getFullYear() === parseInt(year));
  const selectYearHandler = (year) => {
    setYear(year);
  };
  let expensesContent = <p className="expenses-nodata">{year} - brak wydatków</p>;
  if (filteredItems.length) {
    expensesContent = filteredItems.map((item, index) => (
      <ExpenseItem
        key={`expense-item-${index}`}
        amount={item.amount}
        date={item.date}
        title={item.title}
      />
    ));
  }
  return (
    <div className="expenses">
      <ExpensesFilter
        onSelectYear={selectYearHandler}
        selectedYear={year}
      />
      {expensesContent}
    </div>
  );
}

export default Expenses;
