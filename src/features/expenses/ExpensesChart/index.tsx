import React, { FC, MouseEventHandler } from "react";
import ExpensesChart from "./ExpensesChart";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectExpensesChartData,
  selectExpensesChartInfo,
  selectExpensesChartInterval,
  selectExpensesChartValue,
  selectExpensesDate,
  selectExpensesStatus,
} from "../expensesSelectors";
import { getStartDate, Interval } from "utils/date";
import { setExpensesChartValue } from "../expensesThunks";
import {
  fetchExpenses,
  getNextChart,
  getPreviousChart,
  jumpToExpensesChartInterval,
  updateExpense,
} from "../expensesThunks";
import { Status } from "common/types";

const ExpensesChartWrapper: FC = () => {
  const expensesChartData = useAppSelector(selectExpensesChartData);
  const expensesChartInterval = useAppSelector(selectExpensesChartInterval);
  const expensesChartValue = useAppSelector(selectExpensesChartValue);
  const expensesChartInfo = useAppSelector(selectExpensesChartInfo);
  const { year, month } = useAppSelector(selectExpensesDate);
  const { chartStatus, readStatus } = useAppSelector(selectExpensesStatus);
  const dispatch = useAppDispatch();
  const chartChangeHandler: MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    dispatch(setExpensesChartValue(target.value));
    if (expensesChartInterval === Interval.Day) {
      dispatch(fetchExpenses());
    } else {
      dispatch(jumpToExpensesChartInterval(-1));
    }
  };

  const chartUpHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(jumpToExpensesChartInterval(1));
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

  const isLoading = chartStatus === Status.Loading || readStatus === Status.Loading;

  return (
    <ExpensesChart
      chartData={expensesChartData}
      chartInfo={expensesChartInfo}
      chartInterval={expensesChartInterval}
      chartValue={expensesChartValue}
      onBarClick={chartChangeHandler}
      onChartUp={chartUpHandler}
      onChartNext={chartNextHandler}
      onChartPrev={chartPrevHandler}
      onDrop={dropHandler}
      isLoading={isLoading}
    />
  );
};

export default ExpensesChartWrapper;
