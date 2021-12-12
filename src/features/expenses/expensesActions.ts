import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { selectAuth } from "features/auth/authSlice";
import { deleteExpense, getExpenses, patchExpense, postExpense } from "./expensesAPI";
import {
  FetchExpensesPayload,
  AddExpensePayload,
  UpdateExpensePayload,
  DeleteExpensePayload,
  NewExpenseData
} from "./expensesTypes";
import { selectExpensesDate } from "./expensesSelectors";
import { ExpenseUpdate } from ".";

export const fetchExpensesAsync = createAsyncThunk(
  "expenses/fetchExpenses",
  async (data: FetchExpensesPayload) => {
    const expenses = await getExpenses(data);
    // The value we return becomes the `fulfilled` action payload
    return expenses;
  }
);

export const addExpenseAsync = createAsyncThunk(
  "expenses/createExpense",
  async (data: AddExpensePayload) => {
    await postExpense(data);
  }
);

export const updateExpenseAsync = createAsyncThunk(
  "expenses/updateExpense",
  async (payload: UpdateExpensePayload) => {
    await patchExpense(payload);
  }
);

export const removeExpenseAsync = createAsyncThunk(
  "expenses/removeExpense",
  async (payload: DeleteExpensePayload) => {
    await deleteExpense(payload);
  }
);

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchExpenses = (): AppThunk => (dispatch, getState) => {
  const { token } = selectAuth(getState());
  const date = selectExpensesDate(getState());
  if (token) {
    dispatch(fetchExpensesAsync({ token, ...date }));
  }
};

export const addExpense =
  (data: NewExpenseData): AppThunk =>
  (dispatch, getState) => {
    const { token } = selectAuth(getState());
    if (token) {
      dispatch(addExpenseAsync({ token, data }));
    }
  };

  export const updateExpense =
  ({ id, data }: { id: string; data: ExpenseUpdate }): AppThunk =>
  (dispatch, getState) => {
    const { token } = selectAuth(getState());
    if (token) {
      dispatch(updateExpenseAsync({ token, data, id }));
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
