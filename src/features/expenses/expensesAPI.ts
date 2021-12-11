import http from "services/http";
import {
  ExpenseChartData,
  ExpenseData,
  ExpenseUpdate,
  NewExpenseData,
} from "features/expenses/expensesSlice";
import { expensesUrl } from "app/config";

export interface ExpenseRequest {
  token: string;
}

export interface ExpenseGetRequest {
  year: string;
  month: string;
  day: string;
  token: string;
}

export interface ExpensePostRequest {
  data: NewExpenseData;
  token: string;
}

export interface ExpenseUpdateRequest {
  data: ExpenseUpdate;
  token: string;
}

export const getExpenses: ({
  token,
  year,
  month,
}: ExpenseGetRequest) => Promise<ExpenseData[]> = async ({
  token,
  year,
  month,
  day,
}) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  const url = day
    ? `${expensesUrl}/${year}/${month}/${day}`
    : `${expensesUrl}/${year}/${month}`;
  return http(url, { headers });
};

export const getChartData: ({
  token,
}: ExpenseRequest) => Promise<ExpenseChartData[]> = async ({ token }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  return http(`${expensesUrl}/chart`, { headers });
};

export const postExpense: ({
  token,
  data,
}: ExpensePostRequest) => Promise<ExpenseData> = async ({ token, data }) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(data);
  return http(`${expensesUrl}`, {
    headers,
    method: "POST",
    body,
  });
};

export const deleteExpense: (
  expenseId: string,
  { token }: ExpenseRequest
) => Promise<{ removed: string }> = async (expenseId, { token }) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  return http(`${expensesUrl}/${expenseId}`, {
    headers,
    method: "DELETE",
  });
};

export const patchExpense: (
  expenseId: string,
  { token, data }: ExpenseUpdateRequest
) => Promise<{ removed: string }> = async (expenseId, { token, data }) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(data);
  return http(`${expensesUrl}/${expenseId}`, {
    headers,
    method: "PATCH",
    body,
  });
};
