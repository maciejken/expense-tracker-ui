import { ChartData } from "common/components/Chart/Chart";
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

export type ExpenseUpdate = Partial<NewExpenseData>;

export enum ExpensesMode {
  Default = "default",
  Create = "create",
  Update = "update",
  Delete = "delete",
}

interface ExpensesChartData extends ChartData {
  info?: string;
  status: Status;
}

export interface ExpensesState {
  chart: ExpensesChartData;
  date: string;
  expenses: ExpenseData[];
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
