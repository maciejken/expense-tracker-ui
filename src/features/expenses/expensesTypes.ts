import { Status } from "common/types";

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
  status: {
    creationStatus: Status;
    readStatus: Status;
    updateStatus: Status;
    removalStatus: Status;    
  }
}

export interface FetchExpensesPayload {
  year: string;
  month: string;
  day: string;
  token: string;
}

export interface AddExpensePayload {
  data: NewExpenseData;
  token: string;
}

export interface UpdateExpensePayload {
  id: string;
  data: ExpenseUpdate;
  token: string;
}

export interface DeleteExpensePayload {
  id: string;
  token: string;
}
