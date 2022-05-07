import { RootState } from "app/store";
import { DatePrecision } from "utils/date";
import { createSelector } from "reselect";

export const selectExpenses = (state: RootState) => state.expenses.expenses;

export const selectExpensesDate = (state: RootState) => state.expenses.date;

export const selectExpensesStatus = (state: RootState) => state.expenses.status;

export const selectExpensesMode = (state: RootState) => state.expenses.mode;

export const selectExpensesChartData = (state: RootState) =>
  state.expenses.chart;

export const selectExpensesChartDate = createSelector(
  selectExpensesChartData,
  (chartData) => chartData.date
);

export const selectExpensesChartDatePrecision = createSelector(
  selectExpensesChartDate,
  (date) => {
    if (!date) {
      return DatePrecision.None;
    }
    const precision = date.split("-").length;
    return ("" + precision) as DatePrecision;
  }
);

export const selectExpensesChartValue = createSelector(
  selectExpensesDate,
  selectExpensesChartDate,
  selectExpensesChartDatePrecision,
  (expensesDate, expensesChartDate, chartDatePrecision) => {
    const hasValue =
      chartDatePrecision === DatePrecision.Month &&
      expensesDate.startsWith(expensesChartDate);
    if (!hasValue) {
      return;
    }
    return expensesDate.replace(/^.{8}0?/, "");
  }
);

export const selectExpensesChartIntervals = createSelector(
  selectExpensesChartData,
  (chartData) => chartData.intervals
);

export const selectExpensesChartInfo = createSelector(
  selectExpensesChartData,
  selectExpensesChartValue,
  (chart, value) => {
    if (value) {
      return chart?.intervals?.[+value - 1]?.info;
    }
    return chart?.info;
  }
);

export const selectExpensesChartStatus = createSelector(
  selectExpensesChartData,
  (chartData) => chartData.status
);
