import { createSlice } from '@reduxjs/toolkit';
import { reducers, extraReducers } from 'features/expenses/expensesReducers';
import { ExpensesState } from 'features/expenses/expensesTypes';
import { Status } from 'common/types';
import { Interval } from 'utils/date';

const currentDate = new Date();

export const initialState: ExpensesState = {
  expenses: [],
  year: '' + currentDate.getFullYear(),
  month: '' + currentDate.getMonth(),
  day: '' + currentDate.getDate(),
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

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers,
  extraReducers,
});

export const { setExpensesYear, setExpensesMonth, setExpensesDay } = expensesSlice.actions;

export default expensesSlice.reducer;
