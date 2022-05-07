import { FC } from "react";
import { selectExpensesChartValue } from "../expensesSelectors";
import Expenses from "./Expenses";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setExpensesMode } from "../expensesActions";
import { ExpensesMode } from "../expensesTypes";

const ExpensesWrapper: FC = () => {
  const chartValue = useAppSelector(selectExpensesChartValue);
  const dispatch = useAppDispatch();
  const createHandler = () => {
    dispatch(setExpensesMode(ExpensesMode.Create));
  };
  return <Expenses canCreate={!!chartValue} onCreate={createHandler} />;
};

export default ExpensesWrapper;
