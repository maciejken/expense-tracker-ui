import { createAction } from "@reduxjs/toolkit";
import { Interval } from "utils/date";

export const FETCH_EXPENSES = "expenses/fetchExpenses";
export const FETCH_EXPENSES_CHART = "expenses/fetchChart";
export const CREATE_EXPENSE = "expenses/createExpense";
export const UPDATE_EXPENSE = "expenses/updateExpense";
export const REMOVE_EXPENSE = "expenses/removeExpense";

export const SET_EXPENSES_YEAR = "expenses/setYear";
export const SET_EXPENSES_MONTH = "expenses/setMonth";
export const SET_EXPENSES_DAY = "expenses/setDay";
export const SET_EXPENSES_CHART_INTERVAL = "expenses/setInterval";

export const INCREMENT_EXPENSES_YEAR = "expenses/incrementYear";
export const DECREMENT_EXPENSES_YEAR = "expenses/decrementYear";

export const setExpensesYear = createAction<string>(SET_EXPENSES_YEAR);
export const incrementExpensesYear = createAction(INCREMENT_EXPENSES_YEAR);
export const decrementExpensesYear = createAction(DECREMENT_EXPENSES_YEAR);
export const setExpensesMonth = createAction<string>(SET_EXPENSES_MONTH);
export const setExpensesDay = createAction<string>(SET_EXPENSES_DAY);
export const setExpensesChartInterval = createAction<Interval>(
  SET_EXPENSES_CHART_INTERVAL
);
