import { RootState } from "app/store";
import { Status } from "common/types";
import { DatePrecision, dateValueMap } from "utils/date";

export const selectExpenses = (state: RootState) => state.expenses.expenses;

export const selectExpensesDate = (state: RootState) => {
  const { year, month, day } = state.expenses;
  return { year, month, day };
};

export const selectExpensesDatePrecision = (state: RootState) =>
  state.expenses.datePrecision;

export const selectExpensesDateString = (state: RootState) => {
  const { year, month, day, datePrecision } = state.expenses;
  return [year, month, day]
    .filter(Boolean)
    .slice(0, +datePrecision)
    .map(dateValueMap)
    .join("-");
};

export const selectExpensesChartDate = (state: RootState) => {
  const { year, month, datePrecision } = state.expenses;
  return [year, month]
    .filter(Boolean)
    .slice(0, +datePrecision)
    .map(dateValueMap)
    .join("-");
};

export const selectExpensesStatus = (state: RootState) => state.expenses.status;

export const selectIsUpdatingExpenses = (state: RootState) => {
  const { creationStatus, updateStatus, removalStatus } = state.expenses.status;
  return [creationStatus, updateStatus, removalStatus].some(
    (status) => status === Status.Loading
  );
};

export const selectExpensesChartData = (state: RootState) =>
  state.expenses.chartData;

export const selectExpensesChartValue = (state: RootState) => {
  const { day, datePrecision } = state.expenses;
  if (datePrecision === DatePrecision.Day) {
    return day;
  }
};

export const selectExpensesChartInfo = (state: RootState) => {
  const selectedId = selectExpensesChartValue(state);
  const chartData = selectExpensesChartData(state);
  const selectedData = chartData.find((item) => item.id === selectedId);
  if (selectedData) {
    return selectedData.info;
  }
};
