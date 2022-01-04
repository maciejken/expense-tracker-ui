import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import ExpensesChart from "./ExpensesChart";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectExpensesChartData,
  selectExpensesChartInfo,
  selectExpensesChartInterval,
  selectExpensesChartValue,
  selectExpensesDate
} from "../expensesSelectors";
import { getStartDate, Interval } from "utils/date";
import { setExpensesDay, setExpensesMonth } from "../expensesActions";
import {
  fetchExpenses,
  getNextChart,
  getPreviousChart,
  jumpToExpensesChartInterval,
  updateExpense,
} from "../expensesThunks";

const ExpensesChartWrapper: FC = () => {
  const expensesChartData = useAppSelector(selectExpensesChartData);
  const expensesChartInterval = useAppSelector(selectExpensesChartInterval);
  const expensesChartValue = useAppSelector(selectExpensesChartValue);
  const expensesChartInfo = useAppSelector(selectExpensesChartInfo);
  const { year, month } = useAppSelector(selectExpensesDate);
  const dispatch = useAppDispatch();
  const chartChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (expensesChartInterval === Interval.Month) {
      dispatch(setExpensesMonth(value));
      dispatch(fetchExpenses());
      // TODO: dispatch(fetchExpensesChart());
    } else {
      dispatch(setExpensesDay(value));
      dispatch(fetchExpenses());
    }
  };

  const chartUpHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(jumpToExpensesChartInterval(1));
  };

  const chartDownHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(jumpToExpensesChartInterval(-1));
  };

  const chartNextHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(getNextChart());
  };

  const chartPrevHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(getPreviousChart());
  };

  const dropHandler = (id: string, value: string) => {
    const date = getStartDate(new Date(+year, +month, +value), {
      interval: Interval.Day,
    });
    const data = { date };
    dispatch(updateExpense({ id, data }));
  };

  return (
    <ExpensesChart
      chartData={expensesChartData}
      chartInfo={expensesChartInfo}
      chartInterval={expensesChartInterval}
      chartValue={expensesChartValue}
      onChange={chartChangeHandler}
      onChartUp={chartUpHandler}
      onChartDown={chartDownHandler}
      onChartNext={chartNextHandler}
      onChartPrev={chartPrevHandler}
      onDrop={dropHandler}
    />
  );
};

export default ExpensesChartWrapper;
