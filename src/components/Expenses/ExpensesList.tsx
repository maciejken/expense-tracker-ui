import React, { FC } from 'react';
import styles from './ExpensesList.module.scss';
import ExpenseItem from './ExpenseItem';
import { ExpensesListProps } from './types';

const ExpensesList: FC<ExpensesListProps> = ({ items, year }) => {
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
          key={item.id}
          amount={item.amount}
          date={item.date}
          title={item.title}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
