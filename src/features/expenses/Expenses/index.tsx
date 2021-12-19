import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { ChangeEventHandler, FC } from "react";
import { Interval } from "utils/date";
import { setExpensesDay, setExpensesMonth } from "..";
import {
  selectExpenses,
  selectExpensesChartData,
  selectExpensesChartValue,
  selectExpensesChartInterval,
} from "../expensesSelectors";
import { fetchExpenses } from "../expensesThunks";
import Expenses from "./Expenses";

const ExpensesWrapper: FC = () => {
  const expensesChartData = useAppSelector(selectExpensesChartData);
  const expensesInterval = useAppSelector(selectExpensesChartInterval);
  const expensesChartValue = useAppSelector(selectExpensesChartValue);
  const dispatch = useAppDispatch();
  const chartChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    if (expensesInterval === Interval.Month) {
      dispatch(setExpensesMonth(target.value));
      dispatch(fetchExpenses());
      // TODO: dispatch(fetchExpensesChart());
    } else {
      dispatch(setExpensesDay(target.value));
      dispatch(fetchExpenses());
    }
  };

  const expenses = useAppSelector(selectExpenses);
  return (
    <Expenses
      chartData={expensesChartData}
      chartInterval={expensesInterval}
      chartValue={expensesChartValue}
      expenses={expenses}
      onChartChange={chartChangeHandler}
    />
  );
};

export default ExpensesWrapper;
