import { DataPoint } from "common/components/Chart/Chart";
import { Status } from "common/types";
import { DatePrecision } from "utils/date";

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

export enum ExpensesMode {
  Default = "default",
  Create = "create",
}

export interface ExpensesState {
  chart: {
    data: DataPoint[] | null;
    status: Status;
  };
  datePrecision: DatePrecision;
  expenses: ExpenseData[];
  year?: string;
  month?: string;
  day?: string;
  status: Status;
  mode: ExpensesMode;
}

export interface FetchExpensesPayload {
  date: string;
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
