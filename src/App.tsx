import React, { FC, useEffect, useState } from "react";
import Expenses from "components/Expenses/Expenses";
import {
  ExpenseChartYear,
  ExpenseData,
  ExpenseUpdate,
} from "components/Expenses/types";
import {
  deleteExpense,
  fetchChartData,
  fetchExpenses,
  updateExpense,
} from "api/expenses";
import NewExpense from "features/expenses/NewExpense/NewExpense";
import LoginForm from "features/auth/LoginForm";
import { getCurrentDate } from "utils/date";
import {
  clearToken,
  selectAuthClaims,
  selectAuthToken,
} from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

const App: FC = () => {
  const token = useAppSelector(selectAuthToken);
  const claims = useAppSelector(selectAuthClaims);
  const dispatch = useAppDispatch();
  const [expenses, setExpenses] = useState([] as ExpenseData[]);
  const [expensesLoading, setExpensesLoading] = useState(false);
  const [shouldLoadExpenses, setShouldLoadExpenses] = useState(true);
  const [chartData, setChartData] = useState([] as ExpenseChartYear[]);
  const [shouldLoadChart, setShouldLoadChart] = useState(true);
  const [currentYear, currentMonth] = getCurrentDate();
  const [selectedMonth, setSelectedMonth] = useState<string>("" + currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>("" + currentYear);

  useEffect(() => {
    if (claims) {
      const { iat, exp } = claims;
      setTimeout(() => {
        dispatch(clearToken());
      }, (exp - iat) * 1000);
    }
  }, [claims, dispatch]);

  useEffect(() => {
    const getChartData = async () => {
      setChartData(await fetchChartData({ token }));
      setShouldLoadChart(false);
    };
    if (token) {
      getChartData();
    }
  }, [shouldLoadChart, token]);

  useEffect(() => {
    const getExpenses = async () => {
      setExpensesLoading(true);
      setExpenses(
        await fetchExpenses({
          token,
          year: selectedYear,
          month: "" + (1 + parseInt(selectedMonth)),
        })
      );
      setExpensesLoading(false);
      setShouldLoadExpenses(false);
    };
    if (token && shouldLoadExpenses) {
      getExpenses();
    }
  }, [selectedMonth, selectedYear, shouldLoadExpenses, token]);

  const updateExpenseHandler = async (
    expenseId: string,
    data: ExpenseUpdate
  ) => {
    if (token) {
      await updateExpense(expenseId, { token, data });
      setShouldLoadChart(true);
      setShouldLoadExpenses(true);
    }
  };

  const deleteExpenseHandler = async (expense: ExpenseData) => {
    const isConfirmed = window.confirm(
      `Usunąć ${expense.title} (${expense.amount} zł)?`
    );
    if (isConfirmed) {
      await deleteExpense(expense.id as string, { token });
      setShouldLoadChart(!expense.isPrivate);
      setShouldLoadExpenses(true);
    }
  };

  const yearChangeHandler = async (year: string) => {
    setSelectedYear(year);
    setShouldLoadExpenses(true);
  };

  const monthChangeHandler = async (month: string) => {
    setSelectedMonth(month);
    setShouldLoadExpenses(true);
  };

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div>
      <NewExpense />
      <Expenses
        chartData={chartData}
        items={expenses}
        loading={expensesLoading}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onYearChange={yearChangeHandler}
        onMonthChange={monthChangeHandler}
        onDeleteExpense={deleteExpenseHandler}
        onUpdateExpense={updateExpenseHandler}
      />
    </div>
  );
};

export default App;
