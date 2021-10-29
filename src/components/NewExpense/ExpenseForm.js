import { useState } from 'react';
import styles from './ExpenseForm.module.scss';

const ExpenseForm = ({ onSaveExpenseData }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const titleChangeHandler = (evt) => {
    setTitle(evt.target.value);
  };
  const amountChangeHandler = (evt) => {
    setAmount(evt.target.value);
  };
  const dateChangeHandler = (evt) => {
    setDate(evt.target.value);
  };
  const categoryChangeHandler = (evt) => {
    setCategory(evt.target.value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    const expenseData = {
      title,
      amount: +amount,
      date: new Date(date),
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
