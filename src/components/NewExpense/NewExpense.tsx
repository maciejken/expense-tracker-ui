import React, { FC } from 'react';
import styles from './NewExpense.module.css';
import ExpenseForm from './ExpenseForm';
import { ExpenseFormData, NewExpenseProps } from './types';

const NewExpense: FC<NewExpenseProps> = ({ onAddExpense }) => {
  const onSaveExpenseDataHandler = (expenseData: ExpenseFormData) => {
    onAddExpense(expenseData);
  };
  return (
    <div className={styles.newExpense}>
      <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
