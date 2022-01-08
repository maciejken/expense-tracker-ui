import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { selectAuth } from "features/auth/authSlice";
import {
  deleteExpense,
  getExpenses,
  getExpensesChart,
  patchExpense,
  postExpense,
} from "./expensesAPI";
import {
  FetchExpensesPayload,
  AddExpensePayload,
  UpdateExpensePayload,
  DeleteExpensePayload,
  NewExpenseData,
  ExpenseUpdate,
} from "./expensesTypes";
import {
  selectExpensesDateString,
  selectExpensesChartInterval,
  selectExpensesDate,
} from "./expensesSelectors";
import { getRelativeInterval, Interval } from "utils/date";
import {
  FETCH_EXPENSES_CHART,
  FETCH_EXPENSES,
  setExpensesChartInterval,
  CREATE_EXPENSE,
  UPDATE_EXPENSE,
  REMOVE_EXPENSE,
  incrementExpensesYear,
  setExpensesMonth,
  decrementExpensesYear,
} from "./expensesActions";

export const fetchExpensesAsync = createAsyncThunk(
  FETCH_EXPENSES,
  async (data: FetchExpensesPayload) => {
    return await getExpenses(data);
  }
);

export const fetchExpensesChartAsync = createAsyncThunk(
  FETCH_EXPENSES_CHART,
  async (data: FetchExpensesPayload) => {
    const chartData = await getExpensesChart(data);
    return chartData;
  }
);

export const addExpenseAsync = createAsyncThunk(
  CREATE_EXPENSE,
  async (data: AddExpensePayload) => {
    await postExpense(data);
  }
);

export const updateExpenseAsync = createAsyncThunk(
  UPDATE_EXPENSE,
  async (payload: UpdateExpensePayload) => {
    await patchExpense(payload);
  }
);

export const removeExpenseAsync = createAsyncThunk(
  REMOVE_EXPENSE,
  async (payload: DeleteExpensePayload) => {
    await deleteExpense(payload);
  }
);

export const fetchExpenses = (): AppThunk => (dispatch, getState) => {
  const { token } = selectAuth(getState());
  const date = selectExpensesDateString(getState());
  const interval = selectExpensesChartInterval(getState());
  if (token) {
    dispatch(fetchExpensesAsync({ token, date, interval }));
  }
};

export const fetchExpensesChart = (): AppThunk => (dispatch, getState) => {
  const { token } = selectAuth(getState());
  const date = selectExpensesDateString(getState());
  const interval = selectExpensesChartInterval(getState());
  if (token) {
    dispatch(fetchExpensesChartAsync({ token, date, interval }));
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

export const jumpToExpensesChartInterval =
  (step: number): AppThunk =>
  (dispatch, getState) => {
    const interval = selectExpensesChartInterval(getState());
    const relativeInterval = getRelativeInterval(interval, step);
    if (relativeInterval) {
      dispatch(setExpensesChartInterval(relativeInterval));
    }
  };

export const incrementExpensesMonth = (): AppThunk => (dispatch, getState) => {
  const { month } = selectExpensesDate(getState());
  let nextMonth;
  if (month === "11") {
    nextMonth = "0";
    dispatch(incrementExpensesYear());
  } else {
    nextMonth = "" + (parseInt(month) + 1);
  }
  dispatch(setExpensesMonth(nextMonth));
};

export const decrementExpensesMonth = (): AppThunk => (dispatch, getState) => {
  const { month } = selectExpensesDate(getState());
  let previousMonth;
  if (month === "0") {
    previousMonth = "11";
    dispatch(decrementExpensesYear());
  } else {
    previousMonth = "" + (parseInt(month) - 1);
  }
  dispatch(setExpensesMonth(previousMonth));
};

export const getNextChart = (): AppThunk => (dispatch, getState) => {
  const interval = selectExpensesChartInterval(getState());
  const parentInterval = getRelativeInterval(interval, 1);
  if (parentInterval === Interval.Month) {
    dispatch(incrementExpensesMonth());
  } else if (parentInterval === Interval.Year) {
    dispatch(incrementExpensesYear());
  }
  dispatch(fetchExpensesChart());
};

export const getPreviousChart = (): AppThunk => (dispatch, getState) => {
  const interval = selectExpensesChartInterval(getState());
  const parentInterval = getRelativeInterval(interval, 1);
  if (parentInterval === Interval.Month) {
    dispatch(decrementExpensesMonth());
  } else if (parentInterval === Interval.Year) {
    dispatch(decrementExpensesYear());
  }
  dispatch(fetchExpensesChart());
};
