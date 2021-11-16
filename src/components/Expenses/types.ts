import { ChangeEventHandler, MouseEventHandler } from "react";

export interface ExpenseRequest {
  token: string;
  query?: any;
  data?: ExpenseData;
}

export interface ExpenseData {
  id?: string;
  title: string;
  amount: number;
  date: string;
  category?: string;
}

export interface ExpenseItemProps extends ExpenseData {
  onDelete: (expenseId: string) => void;
};

export interface ExpensesProps {
  items: ExpenseData[];
  onDeleteExpense: (expenseId: string) => void;
}

export interface ExpensesChartProps {
  expenses: ExpenseData[];
}

export interface ExpensesFilterProps {
  onSelectYear?: ChangeEventHandler<HTMLSelectElement>;
  selectedYear: string;
}

export interface ExpensesListProps {
  items: ExpenseData[];
  year: string;
  onDeleteExpense: (expenseId: string) => void;
}