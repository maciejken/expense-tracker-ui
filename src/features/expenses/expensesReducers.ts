import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "common/types";
import {
  addExpenseAsync,
  fetchExpensesAsync,
  removeExpenseAsync,
  updateExpenseAsync,
} from "features/expenses/expensesActions";
import { ExpenseData, ExpensesState } from "features/expenses/expensesTypes";

export const reducers = {
  setExpensesMonth: (state: ExpensesState, action: PayloadAction<string>) => {
    state.month = action.payload;
  },
  setExpensesYear: (state: ExpensesState, action: PayloadAction<string>) => {
    state.year = action.payload;
  },
  setExpensesDay: (state: ExpensesState, action: PayloadAction<string>) => {
    state.day = action.payload;
  },
};

export const extraReducers = (
  builder: ActionReducerMapBuilder<ExpensesState>
) => {
  builder
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
};
