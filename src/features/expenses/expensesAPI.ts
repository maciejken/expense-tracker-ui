import http from "services/http";
import {
  ExpenseChartData,
  ExpenseData,
  FetchExpensesPayload,
  AddExpensePayload,
  UpdateExpensePayload,
  DeleteExpensePayload,
} from "features/expenses/expensesTypes";
import { expensesUrl } from "app/config";

export const getExpenses: (
  payload: FetchExpensesPayload
) => Promise<ExpenseData[]> = async ({ token, year, month, day }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  const url = day
    ? `${expensesUrl}/${year}/${month}/${day}`
    : `${expensesUrl}/${year}/${month}`;
  return http(url, { headers });
};

export const getChartData: (payload: {
  token: string;
}) => Promise<ExpenseChartData[]> = async ({ token }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  return http(`${expensesUrl}/chart`, { headers });
};

export const postExpense: ({
  token,
  data,
}: AddExpensePayload) => Promise<ExpenseData> = async ({ token, data }) => {
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

export const deleteExpense: ({
  id,
  token,
}: DeleteExpensePayload) => Promise<{ removed: string }> = async ({
  id,
  token,
}) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  return http(`${expensesUrl}/${id}`, {
    headers,
    method: "DELETE",
  });
};

export const patchExpense: ({
  id,
  token,
  data,
}: UpdateExpensePayload) => Promise<{ removed: string }> = async ({
  id,
  token,
  data,
}) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(data);
  return http(`${expensesUrl}/${id}`, {
    headers,
    method: "PATCH",
    body,
  });
};
