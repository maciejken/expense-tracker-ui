import React, { FC, useEffect, useState } from "react";
import NewExpense from "components/NewExpense/NewExpense";
import Expenses from "components/Expenses/Expenses";
import {
  ExpenseChartYear,
  ExpenseData,
  ExpenseUpdate,
  NewExpenseData,
} from "components/Expenses/types";
import {
  createExpense,
  deleteExpense,
  fetchChartData,
  fetchExpenses,
  updateExpense,
} from "api/expenses";
import { BasicAuth, TokenData } from "components/LoginForm/types";
import { fetchToken } from "api/auth";
import LoginForm from "components/LoginForm/LoginForm";
import { getCurrentDate } from "utils/date";

const App: FC = () => {
  const [token, setToken] = useState("");
  const [expenses, setExpenses] = useState([] as ExpenseData[]);
  const [expensesLoading, setExpensesLoading] = useState(false);
  const [shouldRefreshExpenses, setShouldRefreshExpenses] = useState(false);
  const [chartData, setChartData] = useState([] as ExpenseChartYear[]);
  const [currentYear, currentMonth] = getCurrentDate();
  const [selectedMonth, setSelectedMonth] = useState<string>("" + currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>("" + currentYear);

  useEffect(() => {
    const getChartData = async () => {
      setChartData(await fetchChartData({ token }));
    }
    if (token) {
      getChartData();
      setShouldRefreshExpenses(true);
    }
  }, [token]);

  useEffect(() => {
    const getExpenses = async () => {
      setExpensesLoading(true);
      setExpenses(await fetchExpenses({
        token,
        year: selectedYear,
        month: "" + (1 + parseInt(selectedMonth)),
      }));
      setExpensesLoading(false);
    };
    if (token && shouldRefreshExpenses) {
      getExpenses();
      setShouldRefreshExpenses(false);
    }
  }, [selectedMonth, selectedYear, shouldRefreshExpenses, token]);

  const authHandler = async (auth: BasicAuth) => {
    const { token, claims }: TokenData = await fetchToken(auth);
    if (token) {
      setToken(token);
      const { iat, exp } = claims;
      setTimeout(() => {
        setToken("");
      }, (exp - iat) * 1000);
    }
  };

  const addExpenseHandler = async (data: NewExpenseData) => {
    if (token) {
      await createExpense({ token, data });
      !data.isPrivate && setChartData(await fetchChartData({ token }));
      setShouldRefreshExpenses(true);
    }
  };

  const updateExpenseHandler = async (
    expenseId: string,
    data: ExpenseUpdate
  ) => {
    if (token) {
      await updateExpense(expenseId, { token, data });
      !data.isPrivate && setChartData(await fetchChartData({ token }));
      setShouldRefreshExpenses(true);
    }
  };

  const deleteExpenseHandler = async (expense: ExpenseData) => {
    const isConfirmed = window.confirm(
      `Usunąć ${expense.title} (${expense.amount} zł)?`
    );
    if (isConfirmed) {
      await deleteExpense(expense.id as string, { token });
      !expense.isPrivate && setChartData(await fetchChartData({ token }));
      setShouldRefreshExpenses(true);
    }
  };

  const yearChangeHandler = async (year: string) => {
    setSelectedYear(year);
    setShouldRefreshExpenses(true);
  };

  const monthChangeHandler = async (month: string) => {
    setSelectedMonth(month);
    setShouldRefreshExpenses(true);
  };

  if (!token) {
    return <LoginForm onAuth={authHandler} />;
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
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
