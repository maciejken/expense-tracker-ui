import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { DataPoint } from "common/components/Chart/Chart";
import { Status } from "common/types";
import { DatePrecision } from "utils/date";
import {
  DECREMENT_EXPENSES_YEAR,
  INCREMENT_EXPENSES_YEAR,
  SET_EXPENSES_CHART_STATUS,
  SET_EXPENSES_DATE_PRECISION,
  SET_EXPENSES_DAY,
  SET_EXPENSES_MODE,
  SET_EXPENSES_MONTH,
  SET_EXPENSES_STATUS,
  SET_EXPENSES_YEAR,
} from "./expensesActions";
import {
  addExpenseAsync,
  fetchExpensesAsync,
  fetchExpensesChartAsync,
  removeExpenseAsync,
  updateExpenseAsync,
} from "./expensesThunks";
import { ExpenseData, ExpensesMode, ExpensesState } from "./expensesTypes";

const currentDate = new Date();

export const initialState: ExpensesState = {
  expenses: [],
  datePrecision: DatePrecision.Day,
  year: "" + currentDate.getFullYear(),
  month: "" + currentDate.getMonth(),
  day: "" + currentDate.getDate(),
  status: Status.Loading,
  chart: {
    data: null,
    status: Status.Loading,
  },
  mode: ExpensesMode.Default,
};

const expensesReducer = createReducer(initialState, {
  [SET_EXPENSES_YEAR]: (
    state: ExpensesState,
    action: PayloadAction<string>
  ) => {
    state.year = action.payload;
  },
  [INCREMENT_EXPENSES_YEAR]: (state: ExpensesState) => {
    if (state.year) {
      state.year = "" + (parseInt(state.year) + 1);
    }
  },
  [DECREMENT_EXPENSES_YEAR]: (state: ExpensesState) => {
    if (state.year) {
      state.year = "" + (parseInt(state.year) - 1);
    }
  },
  [SET_EXPENSES_MONTH]: (
    state: ExpensesState,
    action: PayloadAction<string>
  ) => {
    state.month = action.payload;
  },
  [SET_EXPENSES_DAY]: (state: ExpensesState, action: PayloadAction<string>) => {
    state.day = action.payload;
    if (action.payload) {
      state.datePrecision = DatePrecision.Day;
    }
  },
  [SET_EXPENSES_DATE_PRECISION]: (
    state: ExpensesState,
    action: PayloadAction<DatePrecision>
  ) => {
    state.datePrecision = action.payload;
  },
  [SET_EXPENSES_STATUS]: (state: ExpensesState, action: PayloadAction<Status>) => {
    state.status = action.payload;
  },
  [SET_EXPENSES_CHART_STATUS]: (state: ExpensesState, action: PayloadAction<Status>) => {
    state.chart.status = action.payload;
  },
  [SET_EXPENSES_MODE]: (state: ExpensesState, action: PayloadAction<ExpensesMode>) => {
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
    action: PayloadAction<DataPoint[]>
  ) => {
    state.chart.status = Status.Idle;
    state.chart.data = action.payload;
  },
  [fetchExpensesChartAsync.pending.type]: (state: ExpensesState) => {
    state.chart.status = Status.Loading;
  },
  [fetchExpensesChartAsync.rejected.type]: (state: ExpensesState) => {
    state.chart.status = Status.Failed;
  },
  [addExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status = Status.Pending;
  },
  [addExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status = Status.Loading;
    state.chart.status = Status.Loading;
  },
  [addExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status = Status.Failed;
  },
  [updateExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status = Status.Pending;
  },
  [updateExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status = Status.Loading;
    state.chart.status = Status.Loading;
  },
  [updateExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status = Status.Failed;
  },
  [removeExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status = Status.Pending;
  },
  [removeExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status = Status.Loading;
    state.chart.status = Status.Loading;
  },
  [removeExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status = Status.Failed;
  },
});

export default expensesReducer;
