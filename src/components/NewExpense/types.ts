import { ExpenseData } from "../Expenses/types";

export interface ExpenseFormProps {
  onSaveExpenseData: (data: ExpenseData) => void;
}

export interface NewExpenseProps {
  onAddExpense: (data: ExpenseData) => void;
}