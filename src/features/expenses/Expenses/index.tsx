import { FC } from "react";
import { selectExpensesDate } from "../expensesSelectors";
import Expenses from "./Expenses";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setExpensesMode } from "../expensesActions";
import { ExpensesMode } from "../expensesTypes";

const ExpensesWrapper: FC = () => {
  const { day } = useAppSelector(selectExpensesDate);
  const dispatch = useAppDispatch();
  const createHandler = () => {
    dispatch(setExpensesMode(ExpensesMode.Create));
  };
  return (
    <Expenses
      canCreate={!!day}
      onCreate={createHandler}
    />
  );
};

export default ExpensesWrapper;
