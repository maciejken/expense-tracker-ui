import React, { FC } from 'react';
import { getMonths } from 'utils/date';
import Chart from 'components/Chart/Chart';
import { ExpensesChartProps } from 'components/Expenses/types';

const ExpensesChart: FC<ExpensesChartProps> = ({ data }) => {

  const months = getMonths();
  const chartData = months.map(m => {
    const monthly = data.find(d => d.id === m.id);
    return {
      value: monthly?.total || 0,
      label: m.label,      
    };
  });

  return <Chart data={chartData} />;
};

export default ExpensesChart;
