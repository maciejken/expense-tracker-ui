import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { ChartData } from "common/components/Chart/Chart";
import { Status } from "common/types";
import { DatePrecision, getCurrentDateString } from "utils/date";
import {
  SET_EXPENSES_CHART_DATE,
  SET_EXPENSES_CHART_STATUS,
  SET_EXPENSES_DATE,
  SET_EXPENSES_MODE,
  SET_EXPENSES_STATUS,
} from "./expensesActions";
import {
  addExpenseAsync,
  fetchExpensesAsync,
  fetchExpensesChartAsync,
  removeExpenseAsync,
  updateExpenseAsync,
} from "./expensesThunks";
import { ExpenseData, ExpensesMode, ExpensesState } from "./expensesTypes";

const date = getCurrentDateString();
const chartDate = getCurrentDateString(DatePrecision.Month);

export const initialState: ExpensesState = {
  expenses: [],
  date,
  status: Status.Loading,
  chart: {
    date: chartDate,
    intervals: null,
    status: Status.Loading,
  },
  mode: ExpensesMode.Default,
};

const expensesReducer = createReducer(initialState, {
  [SET_EXPENSES_DATE]: (
    state: ExpensesState,
    action: PayloadAction<string>
  ) => {
    state.date = action.payload;
  },
  [SET_EXPENSES_STATUS]: (
    state: ExpensesState,
    action: PayloadAction<Status>
  ) => {
    state.status = action.payload;
  },
  [SET_EXPENSES_CHART_STATUS]: (
    state: ExpensesState,
    action: PayloadAction<Status>
  ) => {
    state.chart.status = action.payload;
  },
  [SET_EXPENSES_CHART_DATE]: (
    state: ExpensesState,
    action: PayloadAction<string>
  ) => {
    state.chart.date = action.payload;
  },
  [SET_EXPENSES_MODE]: (
    state: ExpensesState,
    action: PayloadAction<ExpensesMode>
  ) => {
    state.mode = action.payload;
  },
  [fetchExpensesAsync.fulfilled.type]: (
    state: ExpensesState,
    action: PayloadAction<ExpenseData[]>
  ) => {
    state.status = Status.Idle;
    state.expenses = action.payload;
  },
  [fetchExpensesAsync.rejected.type]: (state: ExpensesState) => {
    state.status = Status.Failed;
  },
  [fetchExpensesChartAsync.fulfilled.type]: (
    state: ExpensesState,
    action: PayloadAction<ChartData>
  ) => {
    state.chart = {
      ...action.payload,
      status: Status.Idle,
    };
  },
  [fetchExpensesChartAsync.pending.type]: (state: ExpensesState) => {
    state.chart.status = Status.Loading;
  },
  [fetchExpensesChartAsync.rejected.type]: (state: ExpensesState) => {
    state.chart.status = Status.Failed;
  },
  [addExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status = Status.Loading;
  },
  [addExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status = Status.ShouldUpdate;
  },
  [addExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status = Status.Failed;
  },
  [updateExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status = Status.Loading;
  },
  [updateExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status = Status.ShouldUpdate;
  },
  [updateExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status = Status.Failed;
  },
  [removeExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status = Status.Loading;
  },
  [removeExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status = Status.ShouldUpdate;
  },
  [removeExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status = Status.Failed;
  },
});

export default expensesReducer;
