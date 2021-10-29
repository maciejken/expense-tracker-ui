import styles from './ExpensesFilter.module.scss';

const ExpensesFilter = ({ onSelectYear, selectedYear }) => {
  const yearChangeHandler = (evt) => {
    onSelectYear(evt.target.value);
  };
  return (
    <div>
      <div className={styles.expensesFilter__control}>
        <select
          onChange={yearChangeHandler}
          value={selectedYear}
          className={styles.expensesFilter__select}
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
