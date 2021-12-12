import { createSlice } from '@reduxjs/toolkit';
import { reducers, extraReducers } from 'features/expenses/expensesReducers';
import { ExpensesState } from "features/expenses";
import { Status } from 'common/types';

const currentDate = new Date();

export const initialState: ExpensesState = {
  expenses: [],
  year: "" + currentDate.getFullYear(),
  month: "" + (currentDate.getMonth() + 1),
  day: "",
  status: {
    creationStatus: Status.Idle,
    readStatus: Status.Idle,
    updateStatus: Status.Idle,
    removalStatus: Status.Idle,
  }
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers,
  extraReducers,
});

export * from "features/expenses/expensesActions";
export * from "features/expenses/expensesSelectors";
export * from "features/expenses/expensesTypes";

export default expensesSlice.reducer;
