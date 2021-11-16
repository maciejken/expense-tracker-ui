import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useState
} from 'react';
import { getYearMonthDay } from '../../utils/date';
import { ExpenseData } from '../Expenses/types';
import styles from './ExpenseForm.module.scss';
import { ExpenseFormProps } from './types';

const ExpenseForm: FC<ExpenseFormProps> = ({ onSaveExpenseData }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const titleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };
  const amountChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value);
  };
  const dateChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setDate(evt.target.value);
  };
  const categoryChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setCategory(evt.target.value);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { year, month, day } = getYearMonthDay(date);
    const expenseData: ExpenseData = {
      title,
      amount: +amount,
      date: `${year}-${month}-${day}`,
      category,
    };
    onSaveExpenseData(expenseData);
    setTitle('');
    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
    <form className={styles.newExpense__form} onSubmit={submitHandler}>
      <div>
        <label className={styles.newExpense__label}>Nazwa</label>
        <input
          type="text"
          value={title}
          onChange={titleChangeHandler}
          className={styles.newExpense__input}
        />
      </div>
      <div className={styles.newExpense__amount}>
        <label className={styles.newExpense__label}>Kwota</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={amountChangeHandler}
          className={styles.newExpense__input}
        />
      </div>
      <div className={styles.newExpense__date}>
        <label className={styles.newExpense__label}>Data</label>
        <input
          type="date"
          min="2020-01-01"
          max="2022-12-31"
          value={date}
          onChange={dateChangeHandler}
          className={styles.newExpense__input}
        />
      </div>
      <div className="new-expense__control">
        <label className={styles.newExpense__label}>Kategoria</label>
        <input
          type="text"
          value={category}
          onChange={categoryChangeHandler}
          className={styles.newExpense__input}
        />
      </div>
      <button type="submit" className={styles.newExpense__add}>+</button>
    </form>
  );
};

export default ExpenseForm;
