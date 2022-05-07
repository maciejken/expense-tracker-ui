import { createAction } from "@reduxjs/toolkit";
import { Status } from "common/types";
import { ExpensesMode } from "./expensesTypes";

export const FETCH_EXPENSES = "expenses/fetchExpenses";
export const FETCH_EXPENSES_CHART = "expenses/fetchChart";
export const CREATE_EXPENSE = "expenses/createExpense";
export const UPDATE_EXPENSE = "expenses/updateExpense";
export const REMOVE_EXPENSE = "expenses/removeExpense";

export const SET_EXPENSES_DATE = "expenses/setDate";
export const SET_EXPENSES_STATUS = "expenses/setStatus";
export const SET_EXPENSES_CHART_STATUS = "expenses/setChartStatus";
export const SET_EXPENSES_CHART_DATE = "expenses/setChartDate";
export const SET_EXPENSES_MODE = "expenses/setMode";

export const setExpensesDate = createAction<string>(SET_EXPENSES_DATE);
export const setExpensesStatus = createAction<Status>(SET_EXPENSES_STATUS);
export const setExpensesChartStatus = createAction<Status>(
  SET_EXPENSES_CHART_STATUS
);
export const setExpensesChartDate = createAction<string>(
  SET_EXPENSES_CHART_DATE
);
export const setExpensesMode = createAction<ExpensesMode>(SET_EXPENSES_MODE);
