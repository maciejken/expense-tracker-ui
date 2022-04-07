import { createAction } from "@reduxjs/toolkit";
import { Status } from "common/types";
import { DatePrecision } from "utils/date";
import { ExpensesMode } from "./expensesTypes";

export const FETCH_EXPENSES = "expenses/fetchExpenses";
export const FETCH_EXPENSES_CHART = "expenses/fetchChart";
export const CREATE_EXPENSE = "expenses/createExpense";
export const UPDATE_EXPENSE = "expenses/updateExpense";
export const REMOVE_EXPENSE = "expenses/removeExpense";

export const SET_EXPENSES_YEAR = "expenses/setYear";
export const SET_EXPENSES_MONTH = "expenses/setMonth";
export const SET_EXPENSES_DAY = "expenses/setDay";
export const SET_EXPENSES_DATE_PRECISION = "expenses/setDatePrecision";
export const SET_EXPENSES_STATUS = "expenses/setStatus";
export const SET_EXPENSES_CHART_STATUS = "expenses/setChartStatus";
export const SET_EXPENSES_MODE = "expenses/setMode";

export const INCREMENT_EXPENSES_YEAR = "expenses/incrementYear";
export const DECREMENT_EXPENSES_YEAR = "expenses/decrementYear";

export const setExpensesYear = createAction<string | undefined>(SET_EXPENSES_YEAR);
export const incrementExpensesYear = createAction(INCREMENT_EXPENSES_YEAR);
export const decrementExpensesYear = createAction(DECREMENT_EXPENSES_YEAR);
export const setExpensesMonth = createAction<string | undefined>(SET_EXPENSES_MONTH);
export const setExpensesDay = createAction<string | undefined>(SET_EXPENSES_DAY);
export const setExpensesDatePrecision = createAction<DatePrecision>(SET_EXPENSES_DATE_PRECISION);
export const setExpensesStatus = createAction<Status>(SET_EXPENSES_STATUS);
export const setExpensesChartStatus = createAction<Status>(SET_EXPENSES_CHART_STATUS);
export const setExpensesMode = createAction<ExpensesMode>(SET_EXPENSES_MODE);
