import React, { FC } from 'react';
import styles from './NewExpense.module.css';
import ExpenseForm from './ExpenseForm';
import { NewExpenseProps } from './types';
import { NewExpenseData } from '../Expenses/types';

const NewExpense: FC<NewExpenseProps> = ({ onAddExpense }) => {
  const onSaveExpenseDataHandler = (data: NewExpenseData) => {
    onAddExpense(data);
  };
  return (
    <div className={styles.newExpense}>
      <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
