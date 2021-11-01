import React, { FC } from 'react';
import { getYearMonthDay } from '../../utils/date';
import styles from './ExpenseItem.module.scss';
import { ExpenseItemProps } from './types';

const ExpenseItem: FC<ExpenseItemProps> = ({ amount, date, title }) => {
  const { year, month, day } = getYearMonthDay(date);
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
