import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { DataPoint } from "common/components/Chart/Chart";
import { Status } from "common/types";
import { Interval } from "utils/date";
import {
  DECREMENT_EXPENSES_YEAR,
  INCREMENT_EXPENSES_YEAR,
  SET_EXPENSES_DAY,
  SET_EXPENSES_CHART_INTERVAL,
  SET_EXPENSES_MONTH,
  SET_EXPENSES_YEAR,
} from "./expensesActions";
import {
  addExpenseAsync,
  fetchExpensesAsync,
  fetchExpensesChartAsync,
  removeExpenseAsync,
  updateExpenseAsync,
} from "./expensesThunks";
import { ExpenseData, ExpensesState } from "./expensesTypes";

const currentDate = new Date();

export const initialState: ExpensesState = {
  expenses: [],
  year: "" + currentDate.getFullYear(),
  month: "" + currentDate.getMonth(),
  day: "" + currentDate.getDate(),
  status: {
    chartStatus: Status.Idle,
    creationStatus: Status.Idle,
    readStatus: Status.Idle,
    updateStatus: Status.Idle,
    removalStatus: Status.Idle,
  },
  chartData: [],
  chartInterval: Interval.Day,
};

const expensesReducer = createReducer(initialState, {
  [SET_EXPENSES_YEAR]: (
    state: ExpensesState,
    action: PayloadAction<string>
  ) => {
    state.year = action.payload;
  },
  [INCREMENT_EXPENSES_YEAR]: (state: ExpensesState) => {
    state.year = "" + (parseInt(state.year) + 1);
    state.month = "0";
    state.day = "1";
  },
  [DECREMENT_EXPENSES_YEAR]: (state: ExpensesState) => {
    state.year = "" + (parseInt(state.year) - 1);
    state.month = "0";
    state.day = "1";
  },
  [SET_EXPENSES_MONTH]: (
    state: ExpensesState,
    action: PayloadAction<string>
  ) => {
    state.month = action.payload;
    state.day = "1";
  },
  [SET_EXPENSES_DAY]: (state: ExpensesState, action: PayloadAction<string>) => {
    state.day = action.payload;
  },
  [SET_EXPENSES_CHART_INTERVAL]: (
    state: ExpensesState,
    action: PayloadAction<Interval>
  ) => {
    state.chartInterval = action.payload;
  },
  [fetchExpensesAsync.pending.type]: (state: ExpensesState) => {
    state.status.readStatus = Status.Loading;
  },
  [fetchExpensesAsync.fulfilled.type]: (
    state: ExpensesState,
    action: PayloadAction<ExpenseData[]>
  ) => {
    state.status.readStatus = Status.Idle;
    state.expenses = action.payload;
  },
  [fetchExpensesAsync.rejected.type]: (state: ExpensesState) => {
    state.status.readStatus = Status.Failed;
    state.expenses = [];
  },
  [fetchExpensesChartAsync.pending.type]: (state: ExpensesState) => {
    state.status.chartStatus = Status.Loading;
  },
  [fetchExpensesChartAsync.fulfilled.type]: (
    state: ExpensesState,
    action: PayloadAction<DataPoint[]>
  ) => {
    state.status.chartStatus = Status.Idle;
    state.chartData = action.payload;
  },
  [fetchExpensesChartAsync.rejected.type]: (state: ExpensesState) => {
    state.status.chartStatus = Status.Failed;
  },
  [addExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status.creationStatus = Status.Loading;
  },
  [addExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status.creationStatus = Status.Idle;
  },
  [addExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status.creationStatus = Status.Failed;
  },
  [updateExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status.updateStatus = Status.Loading;
  },
  [updateExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status.updateStatus = Status.Idle;
  },
  [updateExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status.updateStatus = Status.Failed;
  },
  [removeExpenseAsync.pending.type]: (state: ExpensesState) => {
    state.status.removalStatus = Status.Loading;
  },
  [removeExpenseAsync.fulfilled.type]: (state: ExpensesState) => {
    state.status.removalStatus = Status.Idle;
  },
  [removeExpenseAsync.rejected.type]: (state: ExpensesState) => {
    state.status.removalStatus = Status.Failed;
  },
});

export default expensesReducer;
