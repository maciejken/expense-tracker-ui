import { useState } from 'react';
import './ExpenseForm.css';

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
      amount,
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
    <form className="new-expense__form" onSubmit={submitHandler}>
      <div className="new-expense__control">
        <label>Nazwa</label>
        <input type="text" value={title} onChange={titleChangeHandler} />
      </div>
      <div className="new-expense__control amount">
        <label>Kwota</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={amountChangeHandler}
        />
      </div>
      <div className="new-expense__control date">
        <label>Data</label>
        <input
          type="date"
          min="2020-01-01"
          max="2022-12-31"
          value={date}
          onChange={dateChangeHandler}
        />
      </div>
      <div className="new-expense__control">
        <label>Kategoria</label>
        <input type="text" value={category} onChange={categoryChangeHandler} />
      </div>
      <button type="submit" className="new-expense__add">+</button>
    </form>
  );
};

export default ExpenseForm;
