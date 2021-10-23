import './ExpenseItem.css';

function ExpenseItem({ amount, date, title }) {
  const locale = 'pl-PL';
  const month = date.toLocaleString(locale, { month: 'long' });
  const day = date.toLocaleString(locale, { day: '2-digit' });
  const year = date.getFullYear();
  return (
    <div className="expense-item">
      <div className="expense-item__date">
        <div className="expense-item__month">{month}</div>
        <div className="expense-item__day">{day}</div>
        <div className="expense-item__year">{year}</div>
      </div>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
