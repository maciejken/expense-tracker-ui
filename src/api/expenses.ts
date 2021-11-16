import { ExpenseData, ExpenseRequest } from "../components/Expenses/types";
import http from "./http";

export const fetchExpenses: ({
  token,
}: ExpenseRequest) => Promise<ExpenseData[]> = async ({ token }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  return http(`http://localhost:3001/api/expenses`, { headers });
};

export const createExpense: ({
  token,
  data,
}: ExpenseRequest) => Promise<ExpenseData> = async ({ token, data }) => {
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
