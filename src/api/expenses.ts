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
  token, expense
}: ExpenseRequest) => Promise<ExpenseData> = async ({ token, expense }) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(expense);
  return http(`http://localhost:3001/api/expenses`, { headers, method: 'POST', body });
};
