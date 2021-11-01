import React, { FC } from 'react';
import Chart from '../Chart/Chart';
import { ExpensesChartProps } from './types';

const ExpensesChart: FC<ExpensesChartProps> = ({ expenses }) => {
  const chartData = [
    { label: 'I', value: 0 },
    { label: 'II', value: 0 },
    { label: 'III', value: 0 },
    { label: 'IV', value: 0 },
    { label: 'V', value: 0 },
    { label: 'VI', value: 0 },
    { label: 'VII', value: 0 },
    { label: 'VIII', value: 0 },
    { label: 'IX', value: 0 },
    { label: 'X', value: 0 },
    { label: 'XI', value: 0 },
    { label: 'XII', value: 0 },
  ];

  if (!expenses.length) {
    return null;
  }

  for (const expense of expenses) {
    const expenseMonth = new Date(expense.date).getMonth();
    chartData[expenseMonth].value += expense.amount;
  }

  return <Chart data={chartData} />;
};

export default ExpensesChart;
