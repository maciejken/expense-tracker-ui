import React, { FC, useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { ExpenseData, ExpenseRequest } from "./components/Expenses/types";
import { createExpense, deleteExpense, fetchExpenses } from "./api/expenses";
import { BasicAuth, TokenData } from "./components/LoginForm/types";
import { fetchToken } from "./api/auth";
import LoginForm from "./components/LoginForm/LoginForm";

const App: FC = () => {
  const [token, setToken] = useState("");
  const [expenses, setExpenses] = useState([] as ExpenseData[]);

  const authHandler = async (auth: BasicAuth) => {
    const { token, claims }: TokenData = await fetchToken(auth);
    if (token) {
      setToken(token);
      const { iat, exp } = claims;
      setTimeout(() => {
        setToken("");
      }, (exp - iat) * 1000);
      await getExpenses({ token });
    }
  };

  const getExpenses = async (requestData: ExpenseRequest) => {
    const expenses = await fetchExpenses({ token: requestData.token });
    setExpenses(expenses);
  };

  const addExpenseHandler = async (expense: ExpenseData) => {
    if (token) {
      await createExpense({ token, data: expense });
      await getExpenses({ token });
    }
  };

  const deleteExpenseHandler = async (expense: ExpenseData) => {
    const isConfirmed = window.confirm(
      `Usunąć ${expense.title} (${expense.amount} zł)?`
    );
    if (isConfirmed) {
      await deleteExpense(expense.id as string, { token });
      await getExpenses({ token });
    }
  };

  if (!token) {
    return <LoginForm onAuth={authHandler} />;
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} onDeleteExpense={deleteExpenseHandler} />
    </div>
  );
};

export default App;
