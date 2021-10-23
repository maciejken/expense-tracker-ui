import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';

const ExpensesList = ({ items, year }) => {
  if (items.length === 0) {
    return <h2 className="expenses-list__fallback">{year} - brak wydatków</h2>;
  }

  return (
    <ul className="expenses-list">
      {items.map((item, index) => (
        <ExpenseItem
          key={`expense-item-${index}`}
          amount={item.amount}
          date={item.date}
          title={item.title}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
