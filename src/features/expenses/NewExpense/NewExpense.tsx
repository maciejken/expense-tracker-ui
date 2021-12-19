import React, { FC } from 'react';
import styles from 'features/expenses/NewExpense/NewExpense.module.css';
import ExpenseForm from 'features/expenses/NewExpense/ExpenseForm';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addExpense }  from '../expensesThunks';
import { NewExpenseData } from 'features/expenses/expensesTypes';
import { selectExpensesDateString } from '../expensesSelectors';

const NewExpense: FC = () => {
  const date = useAppSelector(selectExpensesDateString);
  const dispatch = useAppDispatch();
  const addExpenseHandler = (data: NewExpenseData) => {
    dispatch(addExpense(data));
  };
  return (
    <div className={styles.newExpense}>
      <ExpenseForm date={date} onAddExpense={addExpenseHandler} />
    </div>
  );
};

export default NewExpense;
