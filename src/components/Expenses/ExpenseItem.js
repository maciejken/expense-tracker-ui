import styles from './ExpenseItem.module.scss';

function ExpenseItem({ amount, date, title }) {
  const locale = 'pl-PL';
  const month = date.toLocaleString(locale, { month: 'long' });
  const day = date.toLocaleString(locale, { day: '2-digit' });
  const year = date.getFullYear();
  return (
    <li className={styles.expenseItem}>
      <div className={styles.expenseItem__date}>
        <div className={styles.expenseItem__month}>{month}</div>
        <div className={styles.expenseItem__day}>{day}</div>
        <div className={styles.expenseItem__year}>{year}</div>
      </div>
      <div className={styles.expenseItem__description}>
        <h2 className={styles.expenseItem__title}>{title}</h2>
        <div className={styles.expenseItem__price}>{amount}</div>
      </div>
    </li>
  );
}

export default ExpenseItem;
