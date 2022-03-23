import { FC, MouseEventHandler } from "react";
import ExpensesChart from "./ExpensesChart";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectExpensesChartData,
  selectExpensesChartInfo,
  selectExpensesChartValue,
  selectExpensesDatePrecision,
  selectExpensesDateString,
  selectExpensesStatus,
} from "../expensesSelectors";
import { DatePrecision } from "utils/date";
import { setExpensesChartValue, updateExpensesChartView } from "../expensesThunks";
import {
  getNextChart,
  getPreviousChart,
  updateExpense,
} from "../expensesThunks";
import { Status } from "common/types";
import { setExpensesDatePrecision } from "../expensesActions";

const ExpensesChartWrapper: FC = () => {
  const expensesChartData = useAppSelector(selectExpensesChartData);
  const expensesChartValue = useAppSelector(selectExpensesChartValue);
  const expensesChartInfo = useAppSelector(selectExpensesChartInfo);
  const { chartStatus, readStatus } = useAppSelector(selectExpensesStatus);
  const dateString = useAppSelector(selectExpensesDateString);
  const datePrecision = useAppSelector(selectExpensesDatePrecision);
  const dispatch = useAppDispatch();

  const chartChangeHandler: MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    dispatch(setExpensesChartValue(target.value));
  };

  const viewChangeHandler: MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLSelectElement;
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

  const isLoading = chartStatus === Status.Loading || readStatus === Status.Loading;

  return (
    <ExpensesChart
      chartData={expensesChartData}
      chartInfo={expensesChartInfo}
      chartValue={expensesChartValue}
      datePrecision={datePrecision}
      onBarClick={chartChangeHandler}
      onClickView={viewChangeHandler}
      onChartNext={chartNextHandler}
      onChartPrev={chartPrevHandler}
      onDrop={dropHandler}
      isLoading={isLoading}
    />
  );
};

export default ExpensesChartWrapper;
