import { RootState } from "app/store";
import { Status } from "common/types";
import { getLocalDate, getStartDate } from "utils/date";

export const selectExpenses = (state: RootState) => state.expenses.expenses;

export const selectExpensesDate = (state: RootState) => {
  const { year, month, day } = state.expenses;
  return { year, month, day };
};

export const selectExpensesDateString = (state: RootState) => {
  const { year, month, day, chartInterval } = state.expenses;
  return getStartDate(new Date(+year, +month, +day), {
    interval: chartInterval,
  });
  // .concat("T00:00");
};

export const selectExpensesLocalDate = (state: RootState) => {
  const { year, month, day } = state.expenses;
  return getLocalDate(new Date(+year, +month, +day));
};

export const selectExpensesStatus = (state: RootState) => state.expenses.status;
export const selectIsUpdatingExpenses = (state: RootState) => {
  const { creationStatus, updateStatus, removalStatus } = state.expenses.status;
  return [creationStatus, updateStatus, removalStatus].some(
    (status) => status === Status.Loading
  );
};

export const selectExpensesChartInterval = (state: RootState) =>
  state.expenses.chartInterval;

export const selectExpensesChartData = (state: RootState) =>
  state.expenses.chartData;

export const selectExpensesChartValue = (state: RootState) => {
  const { chartInterval } = state.expenses;
  return state.expenses[chartInterval];
};

export const selectExpensesChartInfo = (state: RootState) => {
  const { chartData, chartInterval } = state.expenses;
  const selectedData = chartData.find(
    (item) => item.x === state.expenses[chartInterval]
  );
  if (selectedData) {
    return selectedData.info;
  }
};
