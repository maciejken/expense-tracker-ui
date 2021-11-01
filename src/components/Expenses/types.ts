import { ChangeEventHandler } from "react";

export interface ExpenseData {
  id: string;
  title: string;
  amount: number;
  date: string;
  category?: string;
}

export type ExpenseItemProps = Omit<ExpenseData, 'id'>;

export interface ExpensesProps {
  items: ExpenseData[];
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
}