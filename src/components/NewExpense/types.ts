import { NewExpenseData } from "../Expenses/types";

export interface ExpenseFormProps {
  onSaveExpenseData: (data: NewExpenseData) => void;
}

export interface NewExpenseProps {
  onAddExpense: (data: NewExpenseData) => void;
}