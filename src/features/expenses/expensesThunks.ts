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
  selectExpensesDate,
  selectExpensesDatePrecision,
  selectExpensesChartDate,
} from "./expensesSelectors";
import {
  FETCH_EXPENSES_CHART,
  FETCH_EXPENSES,
  CREATE_EXPENSE,
  UPDATE_EXPENSE,
  REMOVE_EXPENSE,
  incrementExpensesYear,
  setExpensesMonth,
  decrementExpensesYear,
  setExpensesDay,
  setExpensesYear,
  setExpensesDatePrecision,
} from "./expensesActions";
import { DatePrecision } from "utils/date";

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

export const incrementExpensesMonth = (): AppThunk => (dispatch, getState) => {
  const { month } = selectExpensesDate(getState());
  let nextMonth;
  if (!month) {
    return;
  } else if (month === "11") {
    nextMonth = "0";
    dispatch(incrementExpensesYear());
  } else {
    nextMonth = "" + (parseInt(month) + 1);
  }
  dispatch(setExpensesMonth(nextMonth));
  dispatch(setExpensesDay());
};

export const decrementExpensesMonth = (): AppThunk => (dispatch, getState) => {
  const { month } = selectExpensesDate(getState());
  let previousMonth;
  if (!month) {
    return;
  } else if (month === "0") {
    previousMonth = "11";
    dispatch(decrementExpensesYear());
  } else {
    previousMonth = "" + (parseInt(month) - 1);
  }
  dispatch(setExpensesMonth(previousMonth));
  dispatch(setExpensesDay());
};

const precisionToIncrementFnMap = {
  [DatePrecision.None]: null,
  [DatePrecision.Year]: incrementExpensesYear,
  [DatePrecision.Month]: incrementExpensesMonth,
  [DatePrecision.Day]: incrementExpensesMonth,
};

const precisionToDecrementFnMap = {
  [DatePrecision.None]: null,
  [DatePrecision.Year]: decrementExpensesYear,
  [DatePrecision.Month]: decrementExpensesMonth,
  [DatePrecision.Day]: decrementExpensesMonth,
};

export const getNextChart = (): AppThunk => (dispatch, getState) => {
  const precision = selectExpensesDatePrecision(getState());
  if (precision) {
    const incrementFn = precisionToIncrementFnMap[precision];
    incrementFn && dispatch(incrementFn());
  }
  dispatch(fetchExpensesChart());
};

export const getPreviousChart = (): AppThunk => (dispatch, getState) => {
  const precision = selectExpensesDatePrecision(getState());
  if (precision) {
    const decrementFn = precisionToDecrementFnMap[precision];
    decrementFn && dispatch(decrementFn());
  }
  dispatch(fetchExpensesChart());
};

const DatePrecisionToActionMap = {
  [DatePrecision.None]: null,
  [DatePrecision.Year]: setExpensesYear,
  [DatePrecision.Month]: setExpensesMonth,
  [DatePrecision.Day]: setExpensesDay,
};

const increaseExpensesDatePrecision = (): AppThunk => (dispatch, getState) => {
  const precision = selectExpensesDatePrecision(getState());
  const increasedPrecision =
    precision === DatePrecision.Day
      ? precision
      : (String(+precision + 1) as DatePrecision);
  precision !== DatePrecision.Day &&
    dispatch(setExpensesDatePrecision(increasedPrecision));
};

export const setExpensesChartValue =
  (value: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(increaseExpensesDatePrecision());
    const precision = selectExpensesDatePrecision(getState());
    const actionToDispatch = DatePrecisionToActionMap[precision];
    actionToDispatch && dispatch(actionToDispatch(value));
  };

interface AppDate {
  year?: string;
  month?: string;
  day?: string;
}

const DatePrecisionToDateUpdateMap = {
  [DatePrecision.None]: () => [] as string[],
  [DatePrecision.Year]: (date: AppDate) => [
    date.year || "" + new Date().getFullYear(),
  ],
  [DatePrecision.Month]: (date: AppDate) => [
    date.year || "" + new Date().getFullYear(),
    date.month || "" + new Date().getMonth(),
  ],
  [DatePrecision.Day]: null,
};

export const updateExpensesChartView = (): AppThunk => (dispatch, getState) => {
  const { year, month } = selectExpensesDate(getState());
  const precision = selectExpensesDatePrecision(getState());
  const mapperFn = DatePrecisionToDateUpdateMap[precision];
  if (mapperFn) {
    const [yearValue, monthValue] = mapperFn({ year, month });
    dispatch(setExpensesYear(yearValue));
    dispatch(setExpensesMonth(monthValue));
    dispatch(setExpensesDay());
  }
};
