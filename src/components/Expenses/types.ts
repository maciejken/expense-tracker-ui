export interface ExpenseRequest {
  token: string;
}

export interface ExpenseGetRequest {
  year: string;
  month: string;
  token: string;
}

export interface ExpensePostRequest {
  data: NewExpenseData;
  token: string;
}

export interface ExpenseUpdateRequest {
  data: ExpenseUpdate;
  token: string;
}

export interface NewExpenseData {
  title: string;
  amount: string;
  date: string;
  category?: string;
  isPrivate: boolean;
}

export interface ExpenseData extends NewExpenseData {
  id: string;
}

export interface ExpenseUpdate {
  title?: string;
  amount?: string;
  date?: string;
  isPrivate?: boolean;
}

export interface ExpenseItemProps extends ExpenseData {
  onDelete: (expense: ExpenseData) => void;
  onUpdate: (expenseId: string, data: ExpenseUpdate) => void;
};

export interface ExpensesProps {
  items: ExpenseData[];
  chartData: ExpenseChartYear[];
  loading: boolean;
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onDeleteExpense: (expense: ExpenseData) => void;
  onUpdateExpense: (expenseId: string, data: ExpenseUpdate) => void;
}

export interface ExpensesChartProps {
  data: MonthlyTotal[];
}

export interface ExpensesFilterProps {
  onSelectMonth: (month: string) => void;
  onSelectYear: (year: string) => void;
  selectedYear: string;
  selectedMonth: string;
  years: string[];
}

export interface ExpensesListProps {
  items: ExpenseData[];
  loading: boolean;
  year: string;
  month: string;
  onDeleteExpense: (expense: ExpenseData) => void;
  onUpdateExpense: (expenseId: string, data: ExpenseUpdate) => void;
}

interface MonthlyTotal {
  id: string;
  total: number;
}

export interface ExpenseChartYear {
  id: string;
  months: MonthlyTotal[];
}