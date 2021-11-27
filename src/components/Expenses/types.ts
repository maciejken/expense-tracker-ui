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
  isPrivate: boolean;
}

export interface ExpenseItemProps extends ExpenseData {
  onDelete: (expense: ExpenseData) => void;
};

export interface ExpensesProps {
  items: ExpenseData[];
  onDeleteExpense: (expense: ExpenseData) => void;
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
  onDeleteExpense: (expense: ExpenseData) => void;
}