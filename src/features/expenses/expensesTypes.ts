import { DataPoint } from "common/components/Chart/Chart";
import { Status } from "common/types";
import { Interval } from "utils/date";

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

export interface ExpensesState {
  chartData: DataPoint[];
  chartInterval: Interval;
  expenses: ExpenseData[];
  year: string;
  month: string;
  day: string;
  status: {
    chartStatus: Status;
    creationStatus: Status;
    readStatus: Status;
    updateStatus: Status;
    removalStatus: Status;    
  }
}

export interface FetchExpensesPayload {
  date: string;
  interval: Interval;
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
