import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'app/store';
import { ExpenseGetRequest, ExpensePostRequest, getExpenses, postExpense } from 'features/expenses/expensesAPI';
import { selectAuthToken } from 'features/auth/authSlice';

export interface NewExpenseData {
  title: string;
  amount: string;
  date: string;
  isPrivate: boolean;
}

export interface ExpenseData extends NewExpenseData {
  id: string;
}

export interface ExpenseUpdate {
  title?: string;
  amount?: string;
  date?: string;
  isPrivate?: boolean;
}
  
interface MonthlyTotal {
  id: string;
  total: number;
}
  
export interface ExpenseChartData {
  id: string;
  months: MonthlyTotal[];
}

export interface ExpensesState {
  expenses: ExpenseData[];
  year: string;
  month: string;
  day: string;
  status: 'idle' | 'loading' | 'failed';
}

const currentDate = new Date();

const initialState: ExpensesState = {
  expenses: [],
  year: "" + currentDate.getFullYear(),
  month: "" + currentDate.getMonth(),
  day: "" + currentDate.getDate(),
  status: 'idle',
};

export const fetchExpensesAsync = createAsyncThunk(
  'expenses/fetchExpenses',
  async (data: ExpenseGetRequest) => {
    const expenses = await getExpenses(data);
    // The value we return becomes the `fulfilled` action payload
    return expenses;
  }
);

export const addExpenseAsync = createAsyncThunk(
  'expenses/createExpense',
  async (data: ExpensePostRequest) => {
    await postExpense(data);
  }
);

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpensesMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
    setExpensesYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setExpensesDay: (state, action: PayloadAction<string>) => {
      state.day = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpensesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.expenses = action.payload;
      })
      .addCase(fetchExpensesAsync.rejected, (state) => {
        state.status = 'failed';
        state.expenses = [];
      })
      .addCase(addExpenseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addExpenseAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(addExpenseAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setExpensesYear, setExpensesMonth, setExpensesDay } = expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectExpensesDate = (state: RootState) => {
  const { year, month, day } = state.expenses;
  return { year, month, day };
};

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchExpenses = (): AppThunk => (
  dispatch,
  getState
) => {
  const token = selectAuthToken(getState());
  const date = selectExpensesDate(getState());
  if (token) {
    dispatch(fetchExpensesAsync({ token, ...date }));
  }
};

export const addExpense = (data: NewExpenseData): AppThunk => (
  dispatch,
  getState
) => {
  const token = selectAuthToken(getState());
  if (token) {
    dispatch(addExpenseAsync({ token, data }));
  }
};

export default expensesSlice.reducer;
