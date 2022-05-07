import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { selectAuth } from "features/auth/authSlice";
import * as expensesApi from "./expensesAPI";
import { NewExpenseData, ExpenseUpdate } from "./expensesTypes";
import {
  selectExpensesChartDate,
  selectExpensesDate,
} from "./expensesSelectors";
import {
  FETCH_EXPENSES_CHART,
  FETCH_EXPENSES,
  CREATE_EXPENSE,
  UPDATE_EXPENSE,
  REMOVE_EXPENSE,
} from "./expensesActions";

export const fetchExpensesAsync = createAsyncThunk(
  FETCH_EXPENSES,
  expensesApi.getExpenses
);

export const fetchExpensesChartAsync = createAsyncThunk(
  FETCH_EXPENSES_CHART,
  expensesApi.getExpensesChart
);

export const addExpenseAsync = createAsyncThunk(
  CREATE_EXPENSE,
  expensesApi.postExpense
);

export const updateExpenseAsync = createAsyncThunk(
  UPDATE_EXPENSE,
  expensesApi.patchExpense
);

export const removeExpenseAsync = createAsyncThunk(
  REMOVE_EXPENSE,
  expensesApi.deleteExpense
);

export const fetchExpenses = (): AppThunk => (dispatch, getState) => {
  const { token } = selectAuth(getState());
  const date = selectExpensesDate(getState());
  if (token) {
    dispatch(fetchExpensesAsync({ date, token }));
  }
};

export const fetchExpensesChart = (): AppThunk => (dispatch, getState) => {
  const { token } = selectAuth(getState());
  const date = selectExpensesChartDate(getState());
  if (token) {
    dispatch(fetchExpensesChartAsync({ date, token }));
  }
};

export const addExpense =
  (data: NewExpenseData): AppThunk =>
  (dispatch, getState) => {
    const { token } = selectAuth(getState());
    if (token) {
      dispatch(addExpenseAsync({ data, token }));
    }
  };

export const updateExpense =
  ({ id, data }: { id: string; data: ExpenseUpdate }): AppThunk =>
  (dispatch, getState) => {
    const { token } = selectAuth(getState());
    if (token) {
      dispatch(updateExpenseAsync({ id, data, token }));
    }
  };

export const removeExpense =
  ({ id }: { id: string }): AppThunk =>
  (dispatch, getState) => {
    const { token } = selectAuth(getState());
    if (token) {
      dispatch(removeExpenseAsync({ id, token }));
    }
  };
