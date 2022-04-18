import { FC, MouseEventHandler, useEffect } from "react";
import ExpensesChart from "./ExpensesChart";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectExpensesChartData,
  selectExpensesChartInfo,
  selectExpensesChartStatus,
  selectExpensesChartValue,
  selectExpensesDate,
  selectExpensesDatePrecision,
  selectExpensesDateString,
} from "../expensesSelectors";
import { DatePrecision } from "utils/date";
import {
  fetchExpensesChart,
  updateExpensesChartValue,
  updateExpensesChartView,
} from "../expensesThunks";
import {
  getNextChart,
  getPreviousChart,
  updateExpense,
} from "../expensesThunks";
import { Status } from "common/types";
import {
  setExpensesDatePrecision,
  setExpensesDay,
  setExpensesStatus,
} from "../expensesActions";

const ExpensesChartWrapper: FC = () => {
  const expensesChartData = useAppSelector(selectExpensesChartData);
  const expensesChartValue = useAppSelector(selectExpensesChartValue);
  const expensesChartInfo = useAppSelector(selectExpensesChartInfo);
  const chartStatus = useAppSelector(selectExpensesChartStatus);
  const dateString = useAppSelector(selectExpensesDateString);
  const { month, day } = useAppSelector(selectExpensesDate);
  const datePrecision = useAppSelector(selectExpensesDatePrecision);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chartStatus === Status.Loading) {
      dispatch(fetchExpensesChart());
    }
  }, [dispatch, chartStatus]);

  if (!expensesChartData) {
    return null;
  }
  const chartChangeHandler: MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    dispatch(updateExpensesChartValue(target.value));
  };

  const dateChangeHandler = (value: string) => {
    dispatch(setExpensesDay(value));
    dispatch(setExpensesStatus(Status.Loading));
  };

  const viewChangeHandler: MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value as DatePrecision;
    dispatch(setExpensesDatePrecision(value));
    dispatch(updateExpensesChartView());
  };

  const chartNextHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(getNextChart());
  };

  const chartPrevHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(getPreviousChart());
  };

  const dropHandler = (id: string, value: string) => {
    const twoDigitDay = value.padStart(2, "0");
    const date = dateString.slice(0, 8).concat(twoDigitDay);
    const data = { date };
    dispatch(updateExpense({ id, data }));
  };

  const isLoading = chartStatus === Status.Loading;

  return (
    <ExpensesChart
      chartData={expensesChartData}
      chartInfo={expensesChartInfo}
      chartValue={expensesChartValue}
      selectedMonth={month}
      selectedDate={day}
      datePrecision={datePrecision}
      onBarClick={chartChangeHandler}
      onClickView={viewChangeHandler}
      onChartNext={chartNextHandler}
      onChartPrev={chartPrevHandler}
      onDateChange={dateChangeHandler}
      onDrop={dropHandler}
      isLoading={isLoading}
    />
  );
};

export default ExpensesChartWrapper;
