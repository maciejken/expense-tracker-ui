import { FC, useEffect } from "react";
import ExpensesList from "./ExpensesList";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectExpenses, selectExpensesStatus } from "../expensesSelectors";
import { fetchExpenses } from "../expensesThunks";
import { Status } from "common/types";

const ExpensesListWrapper: FC = () => {
  const expenses = useAppSelector(selectExpenses);
  const expensesStatus = useAppSelector(selectExpensesStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (expensesStatus === Status.Loading) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, expensesStatus]);

  return <ExpensesList items={expenses} />;
};

export default ExpensesListWrapper;
