import { FC, useEffect } from "react";
import ExpensesList from "./ExpensesList";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectExpenses,
  selectExpensesDate,
  selectExpensesStatus,
} from "../expensesSelectors";
import { fetchExpenses } from "../expensesThunks";
import { Status } from "common/types";

const ExpensesListWrapper: FC = () => {
  const expenses = useAppSelector(selectExpenses);
  const expensesDate = useAppSelector(selectExpensesDate);
  const expensesStatus = useAppSelector(selectExpensesStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch, expensesDate]);

  useEffect(() => {
    if (expensesStatus === Status.ShouldUpdate) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, expensesStatus]);

  return <ExpensesList items={expenses} />;
};

export default ExpensesListWrapper;
