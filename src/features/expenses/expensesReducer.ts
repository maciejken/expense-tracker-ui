import {
  ActionReducerMapBuilder,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  setExpensesDay,
  setExpensesInterval,
  setExpensesMonth,
  setExpensesYear,
} from "./expensesActions";
import {
  addExpenseAsync,
  fetchExpensesAsync,
  fetchExpensesChartAsync,
  removeExpenseAsync,
  updateExpenseAsync,
} from "features/expenses/expensesThunks";
import { ExpenseData, ExpensesState } from "features/expenses/expensesTypes";
import { Status } from "common/types";
import { DataPoint } from "common/components/Chart/Chart";
import { Interval } from "utils/date";

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

const expensesReducer = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<ExpensesState>) => {
    builder
      .addCase(
        setExpensesYear,
        (state: ExpensesState, action: PayloadAction<string>) => {
          state.year = action.payload;
        }
      )
      .addCase(
        setExpensesMonth,
        (state: ExpensesState, action: PayloadAction<string>) => {
          state.month = action.payload;
        }
      )
      .addCase(
        setExpensesDay,
        (state: ExpensesState, action: PayloadAction<string>) => {
          state.day = action.payload;
        }
      )
      .addCase(
        setExpensesInterval,
        (state: ExpensesState, action: PayloadAction<Interval>) => {
          state.chartInterval = action.payload;
        }
      )
      .addCase(fetchExpensesAsync.pending, (state: ExpensesState) => {
        state.status.readStatus = Status.Loading;
      })
      .addCase(
        fetchExpensesAsync.fulfilled,
        (state: ExpensesState, action: PayloadAction<ExpenseData[]>) => {
          state.status.readStatus = Status.Idle;
          state.expenses = action.payload;
        }
      )
      .addCase(fetchExpensesAsync.rejected, (state: ExpensesState) => {
        state.status.readStatus = Status.Failed;
        state.expenses = [];
      })
      .addCase(fetchExpensesChartAsync.pending, (state: ExpensesState) => {
        state.status.chartStatus = Status.Loading;
      })
      .addCase(
        fetchExpensesChartAsync.fulfilled,
        (state: ExpensesState, action: PayloadAction<DataPoint[]>) => {
          state.status.chartStatus = Status.Idle;
          state.chartData = action.payload;
        }
      )
      .addCase(fetchExpensesChartAsync.rejected, (state: ExpensesState) => {
        state.status.chartStatus = Status.Failed;
      })
      .addCase(addExpenseAsync.pending, (state: ExpensesState) => {
        state.status.creationStatus = Status.Loading;
      })
      .addCase(addExpenseAsync.fulfilled, (state: ExpensesState) => {
        state.status.creationStatus = Status.Idle;
      })
      .addCase(addExpenseAsync.rejected, (state: ExpensesState) => {
        state.status.creationStatus = Status.Failed;
      })
      .addCase(updateExpenseAsync.pending, (state: ExpensesState) => {
        state.status.updateStatus = Status.Loading;
      })
      .addCase(updateExpenseAsync.fulfilled, (state: ExpensesState) => {
        state.status.updateStatus = Status.Idle;
      })
      .addCase(updateExpenseAsync.rejected, (state: ExpensesState) => {
        state.status.updateStatus = Status.Failed;
      })
      .addCase(removeExpenseAsync.pending, (state: ExpensesState) => {
        state.status.removalStatus = Status.Loading;
      })
      .addCase(removeExpenseAsync.fulfilled, (state: ExpensesState) => {
        state.status.removalStatus = Status.Idle;
      })
      .addCase(removeExpenseAsync.rejected, (state: ExpensesState) => {
        state.status.removalStatus = Status.Failed;
      });
  }
);

export default expensesReducer;
