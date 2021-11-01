import React, { FC, useEffect, useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { ExpenseData } from "./components/Expenses/types";
import { getExpenses } from './api/expenses';

const App: FC = () => {
  const [expenses, setExpenses] = useState([] as ExpenseData[]);

  const addExpenseHandler = async () => {
    const expenses = await getExpenses();
    setExpenses(expenses);
  };

  useEffect(() => {
    addExpenseHandler();
  }, []);

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
