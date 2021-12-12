import React, { FC } from 'react';
import styles from 'features/expenses/NewExpense/NewExpense.module.css';
import ExpenseForm from 'features/expenses/NewExpense/ExpenseForm';
import { useAppDispatch } from 'app/hooks';
import { addExpense, NewExpenseData } from 'features/expenses';

const NewExpense: FC = () => {
  const dispatch = useAppDispatch();
  const addExpenseHandler = (data: NewExpenseData) => {
    dispatch(addExpense(data));
  };
  return (
    <div className={styles.newExpense}>
      <ExpenseForm onAddExpense={addExpenseHandler} />
    </div>
  );
};

export default NewExpense;
