import React, { FC, useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { ExpenseData, ExpenseRequest } from "./components/Expenses/types";
import { createExpense, fetchExpenses } from './api/expenses';
import { BasicAuth, TokenData } from "./components/LoginForm/types";
import { fetchToken } from "./api/auth";
import LoginForm from "./components/LoginForm/LoginForm";
import { ExpenseFormData } from "./components/NewExpense/types";

const App: FC = () => {
  const [token, setToken] = useState("");
  const [expenses, setExpenses] = useState([] as ExpenseData[]);

  const authHandler = async (auth: BasicAuth) => {
    const { token }: TokenData = await fetchToken(auth);
    setToken(token);
  };

  const getExpenses = async (requestData: ExpenseRequest) => {
    const expenses = await fetchExpenses({ token: requestData.token });
    setExpenses(expenses);
  };

  const addExpenseHandler = async (expense: ExpenseFormData) => {
    await createExpense({ token, expense });
    await getExpenses({ token });
  };

  if (!token) {
    return <LoginForm onAuth={authHandler} />
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
