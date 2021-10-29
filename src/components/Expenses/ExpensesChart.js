import Chart from "../Chart/Chart";

const ExpensesChart = ({ expenses }) => {
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

  for (const expense of expenses) {
    const expenseMonth = expense.date.getMonth();
    chartData[expenseMonth].value += expense.amount;
  }

  return !!expenses.length && <Chart data={chartData} />;
};

export default ExpensesChart;
