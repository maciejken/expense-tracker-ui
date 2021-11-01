import { ExpenseData } from "../Expenses/types";

export type ExpenseFormData = Omit<ExpenseData, 'id'>;

export interface ExpenseFormProps {
  onSaveExpenseData: (data: ExpenseFormData) => void;
}

export interface NewExpenseProps {
  onAddExpense: (data: ExpenseFormData) => void;
}