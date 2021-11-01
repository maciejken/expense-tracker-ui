import { ExpenseData } from "../components/Expenses/types";
import http from "./http";

export const getExpenses: () => Promise<ExpenseData[]> = async () => {
  return http(`http://localhost:3001/api/expenses`);
}
