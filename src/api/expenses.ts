import {
  ExpenseChartYear,
  ExpenseData,
  ExpenseGetRequest,
  ExpensePostRequest,
  ExpenseRequest,
  ExpenseUpdateRequest,
} from "../components/Expenses/types";
import http from "./http";

export const fetchExpenses: ({
  token,
  year,
  month,
}: ExpenseGetRequest) => Promise<ExpenseData[]> = async ({
  token,
  year,
  month,
}) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  return http(`http://localhost:3001/api/expenses/${year}/${month}`, {
    headers,
  });
};

export const fetchChartData: ({
  token,
}: ExpenseRequest) => Promise<ExpenseChartYear[]> = async ({ token }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  return http(`http://localhost:3001/api/expenses/chart`, { headers });
};

export const createExpense: ({
  token,
  data,
}: ExpensePostRequest) => Promise<ExpenseData> = async ({ token, data }) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(data);
  return http(`http://localhost:3001/api/expenses`, {
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
  return http(`http://localhost:3001/api/expenses/${expenseId}`, {
    headers,
    method: "DELETE",
  });
};

export const updateExpense: (
  expenseId: string,
  { token, data }: ExpenseUpdateRequest
) => Promise<{ removed: string }> = async (expenseId, { token, data }) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(data);
  return http(`http://localhost:3001/api/expenses/${expenseId}`, {
    headers,
    method: "PATCH",
    body,
  });
};
