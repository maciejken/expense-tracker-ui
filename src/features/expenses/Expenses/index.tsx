import React, { FC } from "react";
import { selectExpenses } from "../expensesSelectors";
import Expenses from "./Expenses";
import { useAppSelector } from "app/hooks";

const ExpensesWrapper: FC = () => {
  const expenses = useAppSelector(selectExpenses);
  return <Expenses expenses={expenses} />;
};

export default ExpensesWrapper;
