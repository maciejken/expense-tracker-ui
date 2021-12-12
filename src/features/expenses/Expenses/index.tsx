import { useAppSelector } from "app/hooks";
import React, { FC } from "react";
import { selectExpenses } from "../expensesSelectors";
import Expenses from "./Expenses";

const ExpensesWrapper: FC = () => {
  const expenses = useAppSelector(selectExpenses);
  return <Expenses expenses={expenses} />
};

export default ExpensesWrapper;