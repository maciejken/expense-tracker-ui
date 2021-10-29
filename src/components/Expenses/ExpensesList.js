import styles from './ExpensesList.module.scss';
import ExpenseItem from './ExpenseItem';

const ExpensesList = ({ items, year }) => {
  if (items.length === 0) {
    return (
      <h2 className={styles.expensesList__fallback}>
        {year} - brak wydatków
      </h2>
    );
  }

  return (
    <ul className={styles.expensesList}>
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
