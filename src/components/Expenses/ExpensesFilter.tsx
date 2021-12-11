import React, { ChangeEvent, FC } from "react";
import styles from "components/Expenses/ExpensesFilter.module.css";
import { ExpensesFilterProps } from "components/Expenses/types";
import { getMonths } from "utils/date";

const ExpensesFilter: FC<ExpensesFilterProps> = ({
  onSelectMonth,
  onSelectYear,
  selectedMonth,
  selectedYear,
  years,
}) => {
  const months = getMonths();
  const yearChangeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    onSelectYear(evt.target.value);
  }
  const monthChangeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    onSelectMonth(evt.target.value);
  }
  return (
    <div>
      <div className={styles.expensesFilter__control}>
        <select
          onChange={yearChangeHandler}
          value={selectedYear}
          className={styles.expensesFilter__select}
        >
          {years.map(year => (
            <option key={`year-${year}`} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className={styles.expensesFilter__control}>
        <select
          onChange={monthChangeHandler}
          value={selectedMonth}
          className={styles.expensesFilter__select}
        >
          {months.map((month) => (
            <option key={`month-${month.id}`} value={month.id}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
