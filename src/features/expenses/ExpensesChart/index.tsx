import { FC, MouseEventHandler, useEffect } from "react";
import ExpensesChart from "./ExpensesChart";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectExpensesChartData,
  selectExpensesChartDate,
  selectExpensesChartDatePrecision,
  selectExpensesChartStatus,
  selectExpensesChartValue,
  selectExpensesChartInfo,
  selectExpensesStatus,
} from "../expensesSelectors";
import { DatePrecision, getCurrentDateString, getNewDate } from "utils/date";
import { fetchExpensesChart } from "../expensesThunks";
import { updateExpense } from "../expensesThunks";
import { Status } from "common/types";
import { setExpensesChartDate, setExpensesDate } from "../expensesActions";

const ExpensesChartWrapper: FC = () => {
  const chartData = useAppSelector(selectExpensesChartData);
  const chartDate = useAppSelector(selectExpensesChartDate);
  const chartInfo = useAppSelector(selectExpensesChartInfo);
  const chartStatus = useAppSelector(selectExpensesChartStatus);
  const selectedDate = useAppSelector(selectExpensesChartValue);
  const datePrecision = useAppSelector(selectExpensesChartDatePrecision);
  const expensesStatus = useAppSelector(selectExpensesStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExpensesChart());
  }, [dispatch, chartDate]);

  useEffect(() => {
    if (expensesStatus === Status.ShouldUpdate) {
      dispatch(fetchExpensesChart());
    }
  }, [dispatch, expensesStatus]);

  if (!chartData) {
    return null;
  }

  const handleDateChange = (value: string) => {
    const dateToDispatch = getNewDate(value, {
      date: chartDate,
      precision: datePrecision,
    });
    if (datePrecision === DatePrecision.Month) {
      dispatch(setExpensesDate(dateToDispatch));
    } else {
      dispatch(setExpensesChartDate(dateToDispatch));
    }
  };

  const handleChartValueChange: MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    handleDateChange(target.value);
  };

  const viewChangeHandler: MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value as DatePrecision;
    const date = getCurrentDateString(value);
    dispatch(setExpensesChartDate(date));
  };

  const chartNextHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { nextDate } = chartData;
    nextDate && dispatch(setExpensesChartDate(nextDate));
  };

  const chartPrevHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { prevDate } = chartData;
    prevDate && dispatch(setExpensesChartDate(prevDate));
  };

  const dropHandler = (id: string, value: string) => {
    const twoDigitDay = value.padStart(2, "0");
    const date = `${chartDate}-${twoDigitDay}`;
    const data = { date };
    dispatch(updateExpense({ id, data }));
  };

  const isLoading = chartStatus === Status.Loading;

  return (
    <ExpensesChart
      chartData={chartData}
      chartInfo={chartInfo}
      selectedDate={selectedDate}
      datePrecision={datePrecision}
      onBarClick={handleChartValueChange}
      onClickView={viewChangeHandler}
      onChartNext={chartNextHandler}
      onChartPrev={chartPrevHandler}
      onDateChange={handleDateChange}
      onDrop={dropHandler}
      isLoading={isLoading}
    />
  );
};

export default ExpensesChartWrapper;
