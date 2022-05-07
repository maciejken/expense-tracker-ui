import http from "services/http";
import {
  ExpenseData,
  FetchExpensesPayload,
  AddExpensePayload,
  UpdateExpensePayload,
  DeleteExpensePayload,
} from "features/expenses/expensesTypes";
import { expensesUrl } from "app/config";
import { ChartData } from "common/components/Chart/Chart";

export const getExpenses: (
  payload: FetchExpensesPayload
) => Promise<ExpenseData[]> = async ({ token, date }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  const url = `${expensesUrl}?date=${date}`;
  return http(url, { headers });
};

export const getExpensesChart: (
  payload: FetchExpensesPayload
) => Promise<ChartData> = async ({ token, date }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  const url = `${expensesUrl}/chart?date=${date}`;
  return http(url, { headers });
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
