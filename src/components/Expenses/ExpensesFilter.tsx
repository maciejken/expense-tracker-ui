import React, { FC } from 'react';
import styles from './ExpensesFilter.module.scss';
import { ExpensesFilterProps } from './types';

const ExpensesFilter: FC<ExpensesFilterProps> = ({ onSelectYear, selectedYear }) => {
  return (
    <div>
      <div className={styles.expensesFilter__control}>
        <select
          onChange={onSelectYear}
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
