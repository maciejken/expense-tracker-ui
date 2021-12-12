import { RootState } from "app/store";

export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectExpensesDate = (state: RootState) => {
  const { year, month, day } = state.expenses;
  return { year, month, day };
};
export const selectExpensesStatus = (state: RootState) => state.expenses.status;
